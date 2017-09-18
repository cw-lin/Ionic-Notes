import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { BackgroundMode } from '@ionic-native/background-mode';

import { File } from '@ionic-native/file';

import { ShareService } from '../services/ShareService';
import { AboutPage } from '../about/about';

declare var cordova: any;
declare var window: any;

@Component({
  selector: 'class notes',
  templateUrl: 'notes.html'
})


export class NotesPage {

  public classes = [];
  private database: SQLiteObject;
  public currentClassTitle: string;
  public options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    //Not sure if I'm going to keep this (saveToPhotoAlbum)
    saveToPhotoAlbum: false
  };

  private webTesting: boolean = true;


  constructor(private file: File, private toastCtrl: ToastController, public navCtrl: NavController, public localNotifications: LocalNotifications, private camera: Camera, private sqlite: SQLite, private shareService: ShareService, private navParams: NavParams, private backgroundMode: BackgroundMode) {
    //testing general UI on Chrome/Firefox/IE
    this.classes = this.shareService.getClasses();

    if (this.webTesting) {
      this.initialize();
      //this.scheduleNotification();

    } else {

      //Check Cordova plugin ran correctly
      if (!this.checkCordova() || !this.checkAudioManager() || !this.checkService()) {
        this.toastCtrl.create({
          message: "Cordova Not Found/Android Plugin failed to load",
          duration: 3000,
          position: "bottom"
        }).present();
      } else {
        document.addEventListener('deviceready', async () => {

          await this.enableBackgroundMode();
          await this.initialize();
          await this.scheduleNotification();
          await this.getDatabase();

        });
      }
    }
  }
  //Navigation Control viewing class page
  public getClassDetail(course) {
    this.navCtrl.push(AboutPage, { course: course });
  }
  //Soon be removed after implementation of firebase/push notification
  private async enableBackgroundMode() {
    if (!this.backgroundMode.isEnabled()) {
      await this.backgroundMode.enable();
    }
    this.backgroundMode.configure({ silent: true });
    //Comment out next line for debugging use only//
    this.backgroundMode.excludeFromTaskList();
  }

  //Initialize SQLite and its database
  private async getDatabase() {
    await this.sqlite.create({
      name: "note",
      location: "default"
    }).then((db: SQLiteObject) => {
      this.database = db;
    }).catch((error) => {
      console.log(error);
    });
  }

  //General plugin initialization for the app
  protected async initialize() {
    if (this.shareService.queue.length == 0) {
      await this.shareService.notificationSetup();
    }
    await this.localNotifications.on("click", async (notification, state) => {
      if (state == "background") {
        await this.takePicture();
      }
    });
    await this.localNotifications.on("trigger", async (notification, state) => {
      //debugging
      //this.mute();
      this.currentClassTitle = await notification.title;
      //alert(notification.title);
      //alert(this.currentClassTitle);
    });

    await this.localNotifications.on("clear", (state) => {
      this.unmute();
    });

  }

  //Apache Cordova Camera plugin methods
  private async takePicture() {
    const base64Image = await this.camera.getPicture(this.options).then(
      async (image) => {
        return await "data:image/jpeg;base64," + image;
      }, async (err) => {
        //Camera Plugin need to remove error callback and let promise do the work
        //console.log(err);
        this.toastCtrl.create({
          message: "Camera is not available to take pictures",
          duration: 5000,
          position: "bottom"
        }).present();

        await navigator["MyApp"].exitApp();
        //Enforce String type for base64Image
        return "";
      });

    //Store images with date into the database
    await alert(this.currentClassTitle);
    const getDate = function () {
      return new Date().getMonth().toString() + "/" + new Date().getDate().toString() + "/" + new Date().getFullYear().toString()
    };
    let date = await getDate();
    await alert(date);
    await this.database.transaction((transaction) => {

      transaction.executeSql("CREATE TABLE IF NOT EXISTS " + this.currentClassTitle.replace(/ /g, "") + "(notes TEXT, date TEXT)", {}, (success) => {
        alert("table created successfully");
      }, (error) => {
        alert("table error on create");
      });
      transaction.executeSql("INSERT INTO " + this.currentClassTitle.replace(/ /g, "") + " VALUES (?, ?)", [base64Image, date], (success) => {
        alert("table inserted successfully");
        alert(date);
      }, (error) => {
        alert("table error on insert");
      });
      transaction.finish();
    });

  }

  //Local Notification initialization and scheduling
  private async scheduleNotification() {
    let count = await 0;
    await this.localNotifications.clearAll().then().catch();
    while (count != this.shareService.queue.length) {

      let notificationStartTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), parseInt(this.shareService.queue[count].start_time.split(":")[0]), parseInt(this.shareService.queue[count].start_time.split(":")[1]), 0, 0);
      let notificationEndTime = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), parseInt(this.shareService.queue[count].end_time.split(":")[0]), parseInt(this.shareService.queue[count].end_time.split(":")[1]), 0, 0);

      //Schedule notification if the time is in the future
      if (notificationStartTime.getTime() - new Date().getTime() > 0) {

        let id = await Math.floor(Math.random() * (1000 - 1) + 1);
        await this.localNotifications.schedule({
          title: this.shareService.queue[count].title,
          text: this.shareService.queue[count].start_time + " to " + this.shareService.queue[count].end_time,
          ongoing: true,
          at: notificationStartTime,
          every: "year",
          id: id
        });
        await this.scheduleEndNotification(new Date(), notificationEndTime, id);
      } else if (new Date().getTime() - notificationEndTime.getTime() > 0) {
        //If Notification date and time has already passed
        count = await count + 1;
        continue;
      } else if (notificationEndTime.getTime() - new Date().getTime() > 0 && new Date().getTime() - notificationStartTime.getTime() > 0) {
        //Fire notification now if current time is within class time interval
        let id = await Math.floor(Math.random() * (1000 - 1) + 1);
        await this.localNotifications.schedule({
          title: this.shareService.queue[count].title,
          text: this.shareService.queue[count].start_time + " to " + this.shareService.queue[count].end_time,
          ongoing: true,
          every: "year",
          id: id
        });

        await this.scheduleEndNotification(new Date(), notificationEndTime, id);
      }
      count = await count + 1;
      //end of while loop
    }


  }
  //Soon to be removed after implementation of firebase/push notification
  private scheduleEndNotification(current, endTime, id) {
    setTimeout(() => {
      this.localNotifications.clear(id);
      this.localNotifications.cancel(id);
    }, endTime.getTime() - current.getTime());

  }
  //Call audio control android plugin
  private mute() {
    let message;
    window.AndroidVolume.mute((successCallBack) => {
      message = "muted";
    }, (err) => {
      message = err;
    });
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
  //Call audio control android plugin
  private unmute() {
    let message;
    window.AndroidVolume.restore((successCallBack) => {
      message = "restored";
    }, (err) => {
      message = err;
    });
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  //Check Cordova plugin installed and run correctly
  public checkCordova() {
    if (typeof cordova != "object") {
      return false;
    }
    return true;
  }
  //Check android plugin installed and run correctly
  public checkAudioManager() {
    var plugins = navigator.plugins;
    var audioManager = plugins.namedItem("AndroidVolume");
    if (typeof audioManager != "object") {
      return false;
    }
    return true;
  }
  //Check background-mode plugin installed and run correctly
  public checkService() {
    var plugins = navigator.plugins;
    var service = plugins.namedItem("AndroidBackgroundService");
    if (typeof service != "object") {
      return false;
    }
    return true;
  }

}
