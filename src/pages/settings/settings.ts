import { Component } from '@angular/core';
import { ModalController, ToastController, NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

import { ShareService } from '../services/ShareService';
import { NotesPage } from '../class notes/notes';

declare var cordova: any;
declare var window: any;



@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  public classes = [];
  public class_key;
  constructor(private modal: ModalController, private toastCtrl: ToastController, private navCtrl: NavController, private navParams: NavParams, private shareService: ShareService, private sqlite: SQLite) {
    this.classes = this.shareService.getClasses();
  }
  private addClass() {
    var newClass =

      {
        title: "",
        location: "",
        start_time: "",
        end_time: "",
        start_date: "",
        end_date: "",
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false
      };

    const addClassModal = this.modal.create("ModalPage", { data: newClass, pageTitle:"Add New Class" });
    addClassModal.present();
    addClassModal.onDidDismiss(async (data) => {

      if (typeof data !== "undefined") {
        
        let start_year = await data.start_date.substring(0,4);
        let end_year = await data.end_date.substring(0,4);
        let start_month = await data.start_date.substring(5,7).replace(/^0+/,'');
        let end_month = await data.end_date.substring(5,7).replace(/^0+/,'');
        let start_day = await data.start_date.substring(8,10).replace(/^0+/,'');
        let end_day = await data.end_date.substring(8,10).replace(/^0+/,'');


        data.start_date = await start_month + "-" + start_day + "-" + start_year;
        data.end_date = await end_month + "-" + end_day + "-" + end_year;
      


        this.shareService.addClasses(data);
        this.classes = this.shareService.getClasses();
        await this.sqlite.create({
          name: "note",
          location: "default"
        }).then(async (db: SQLiteObject) => {
          await db.transaction((transaction) => {
            transaction.executeSql("CREATE TABLE IF NOT EXISTS " + data.title.replace(/ /g, "") + "(notes TEXT, date TEXT)", {}, (success) => {
              alert("table created successfully");
            }, (error) => {
              alert("table error on create");
            });
            transaction.finish();
          });
        }).catch((error) => {
          console.log(error);
        });
      }

    });
  }
  //Edit class information from app
  private editClass() {
    const editClassModal = this.modal.create("EditPage", { data: this.classes, pageTitle:"Edit Class" });
    editClassModal.present();
    editClassModal.onDidDismiss(async (data) => {

    });
  }
  //Delete class information from app and SQLite
  private deleteClass() {
    const deleteClassModal = this.modal.create("DeleteClassPage", {});
    deleteClassModal.present();
    deleteClassModal.onDidDismiss(async (data) => {
      if (typeof data !== "undefined") {

        this.shareService.addClasses(data);
        this.classes = this.shareService.getClasses();
        await this.sqlite.create({
          name: "note",
          location: "default"
        }).then(async (db: SQLiteObject) => {
          await db.transaction((transaction) => {
            transaction.executeSql("DROP TABLE IF EXISTS " + data.title.replace(/ /g, ""), {}, (success) => {
              alert("table dropped successfully");
            }, (error) => {
              alert("table error on drop");
            });
            transaction.finish();
          });
        }).catch((error) => {
          console.log(error);
        });
      }
    });
  }
  //Advance option to stop app completely(due to background-mode's exclude-from-task function is enabled)
  private advanceOptions() {
    const advanceOptions = this.modal.create("AdvanceOptionsPage", {});
    advanceOptions.present();
  }
}
