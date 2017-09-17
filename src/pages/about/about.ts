import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private course;
  private photos = [];
  private dates = {};

  private dateIfElse: string;
  private dualObject = [];

  constructor(public navCtrl: NavController, private navParams: NavParams, private sqlite: SQLite) {
    this.course = navParams.get("course");
    this.getPhotos();
  }
  protected async getPhotos() {

    await this.sqlite.create({
      name: "note",
      location: "default",

    }).then(async (db: SQLiteObject) => {
      //TODO: SEPARATION OF DATE
      await db.executeSql("SELECT * FROM " + this.course.title.replace(/ /g, "") + " ORDER BY DATE DESC", []).then(async (result) => {
        try {
          //await alert(result.rows.item(0).notes);
          //SQL object -> SQL rows -> SQL (index) -> SQL column name

          let tempDate:string;
          let tempPicArray=[];
          if (typeof tempDate === "undefined") {
            tempDate = await result.rows.item(0).date;
            await alert(typeof result.rows.item(0).date);
          }
          for (let index = await 0; await index < result.rows.length; await index++) {
            //await alert(result.rows.item(index).date);
            if (await result.rows.item(index).date === tempDate) {
              await tempPicArray.push(result.rows.item(index).notes);
            } else {
              let jsonObj = await { date: tempDate, pictures: tempPicArray };
              await this.photos.push(jsonObj);
              tempDate = await result.rows.item(index).date;
              tempPicArray = await [];
              await tempPicArray.push(result.rows.item(index).notes);
            }

          }
          let jsonObj2 = { date: tempDate, pictures: tempPicArray };
          this.photos.push(jsonObj2);
          //this.photos.push(result.rows.item(0));
        } catch (error) {
          alert(error);
        }
      });

    }).catch(error => {
      alert(error);

    });




  }

}
/*
<ion-content padding>
  <ion-list *ngFor="let item of photos">
    <ion-item>
      <ion-label>{{item.date}}</ion-label>
    </ion-item>
    <ion-grid>
      <ion-row>
        <ion-col col-6 *ngFor="let picture of item.pictures">
          <ion-card class="releative">
            <img [src]="picture" *ngIf="picture" />
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-list>

</ion-content>


<ion-grid>
    <ion-row>
      <ion-col col-6 *ngFor="let photo of photos">
        <ion-card class="releative">

          
          <img [src]="photo" *ngIf="photo" />
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
*/