import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
//ModalPage for displaying class information
export class ModalPage {
  private pageTitle:string;
  protected data = {
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
  }
  public day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  constructor(private view: ViewController, private navParams: NavParams) {
    this.pageTitle = this.navParams.get("pageTitle");
    this.data = this.navParams.get('data');
  }
  updateDay(date) {
    if (date == "Mon") {
      if (this.data.mon) {
        this.data.mon = false;
      } else {
        this.data.mon = true;
      }
    } else if (date == "Tue") {
      if (this.data.tue) {
        this.data.tue = false;
      } else {
        this.data.tue = true;
      }
    } else if (date == "Wed") {
      if (this.data.wed) {
        this.data.wed = false;
      } else {
        this.data.wed = true;
      }
    } else if (date == "Thu") {
      if (this.data.thu) {
        this.data.thu = false;
      } else {
        this.data.thu = true;
      }
    } else if (date == "Fri") {
      if (this.data.fri) {
        this.data.fri = false;
      } else {
        this.data.fri = true;
      }
    } else if (date == "Sat") {
      if (this.data.sat) {
        this.data.sat = false;
      } else {
        this.data.sat = true;
      }
    } else if (date == "Sun") {
      if (this.data.sun) {
        this.data.sun = false;
      } else {
        this.data.sun = true;
      }
    }
  }
  updateStartTime(data: string) {
    this.data.start_time = data;
  }
  updateEndTime(data: string) {
    this.data.end_time = data;
  }
  updateStartDate(data: string) {
    this.data.start_date = data;
  }
  updateEndDate(data: string) {
    this.data.end_date = data;
  }
  updateTitle(data: string) {
    this.data.title = data;
  }
  updateLocation(data: string) {
    this.data.location = data;
  }
  closeModal() {
    this.view.dismiss();
  }
  ionViewDidLoad() {

  }
  closeAndAddClass() {
    this.view.dismiss(this.data);
    console.log({newData:this.data});
  }
  closeAndEditClass(oldData){
    this.view.dismiss({newData:this.data, oldData:oldData});

  }

  closePage(){
    if(this.pageTitle === "Add New Class"){
      this.closeAndAddClass();
    }else{
      this.closeAndEditClass(this.navParams.get("data"));
    }
  }
}
