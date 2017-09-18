import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ViewController } from 'ionic-angular';
import { ShareService } from '../services/ShareService';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
/**
 * Generated class for the EditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  public classes = [];
  constructor(private modal: ModalController, public navCtrl: NavController, public navParams: NavParams, private view: ViewController, private shareService: ShareService, private sqlite: SQLite) {
    this.classes = this.shareService.getClasses();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPage');
  }
  //Return to setting page
  private close() {
    this.view.dismiss();
  }
  //Pull class information and display onto ModalPage
  private viewClass(course) {
    //TODO Data doesn't show completely, but editing functionality still works
    const editClassModal = this.modal.create("ModalPage", { data: course, pageTitle: "Edit Class" });
    editClassModal.present();
    editClassModal.onDidDismiss(async (data) => {
      if (typeof data !== "undefined") {
        this.shareService.editClass(data.oldData);
        this.sqlite.create({
          name: "note",
          location: "default"
        }).then((db: SQLiteObject) => {
          db.transaction((transaction) => {
            transaction.executeSql("ALTER TABLE " + data.oldData.title.replace(/ /g, "") + " IF EXISTS RENAME TO " + data.newData.title.replace(/ /g, ""), {}, (success) => {
              alert("table alter succesfully");
            }, (error) => {
              alert("table error on dropping alter");
            });
          });
        });

      }

    });
  }

}
