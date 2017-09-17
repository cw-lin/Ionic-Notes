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
    /*
    this.nativeStorage.keys().then(
      (keys) => { this.class_key = keys; },
      (error) => { }
    );
    if (typeof (this.class_key) != 'undefined') {
      for (let key of this.class_key) {
        this.nativeStorage.getItem(key).then(
          (item) => this.classes.push(item),
          (error) => { }
        );
      };
    }
  */
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

  private editClass() {
    const editClassModal = this.modal.create("EditPage", { data: this.classes, pageTitle:"Edit Class" });
    editClassModal.present();
    editClassModal.onDidDismiss(async (data) => {

    });
  }

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

  private advanceOptions() {
    const advanceOptions = this.modal.create("AdvanceOptionsPage", {});
    advanceOptions.present();
  }
}
