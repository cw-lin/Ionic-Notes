import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
/**
 * Generated class for the AdvanceOptionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-advance-options',
  templateUrl: 'advance-options.html',
})
export class AdvanceOptionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private localNotification: LocalNotifications, private toastCtrl: ToastController, private view:ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvanceOptionsPage');
  }

  private async removeNotification() {
    let message: string = "";
    await this.localNotification.clearAll().then(() => {
      message = "All notifications removed";
    }).catch((error) => {
      message = error;
    });
    this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: "bottom"
    }).present();
  }
  private close(){
    this.view.dismiss();
  }

}
