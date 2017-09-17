import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ShareService } from '../services/ShareService';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

/**
 * Generated class for the DeleteClassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delete-class',
  templateUrl: 'delete-class.html',
})
export class DeleteClassPage {

  private classes;

  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private shareService: ShareService, private sqlite: SQLite) {
    this.classes = this.shareService.getClasses();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteClassPage');
  }

  private close() {
    this.view.dismiss();
  }

  private delete(data) {
    //TODO SETUP TOGGLE yes/no
    this.alertCtrl.create({
      title: "Confirm delete",
      message: "You are about to delete this class!",
      buttons: [
        {
          text: "Delete Class",
          role: "delete",
          handler: () => {
            this.shareService.delete(data);
            this.sqlite.create({
              name: "note",
              location: "default"
            }).then((db: SQLiteObject) => {
              db.transaction((transaction) => {
                transaction.executeSql("DROP TABLE IF NOT EXISTS " + data.title.replace(/ /g, "") + "(notes TEXT, date TEXT)", {}, (success) => {
                  alert("table dropped succesfully");
                }, (error) => {
                  alert("table error on dropping table");
                });
              });
            });
          }

        },
        {
          text: "Cancel"
        }
      ]
    }).present();

  }

}
