
export class ShareService {
    //ShareService.ts for immediate update for class information across the app
    public classes = [];
    public queue = [];
    /*[{
        
        title:string,
        location:string,
        start_time:string,
        end_time:string,
        start_date:string,
        end_date:string,
        mon:boolean,
        tue:boolean,
        wed:boolean,
        thu:boolean,
        fri:boolean,
        sat:boolean,
        sun:boolean
        
    }];
    */

    /*
    {
      title:"",
      location:"",
      start_time:"",
      end_time:"",
      start_date:"",
      end_date:"",
      mon:false,
      tues:false,
      wed:false,
      thur:false,
      fri:false,
      sat:false,
      sun:false
    };
    */
    constructor() {
        this.classes.push({
            title: "Algorithms",
            location: "Hasb 134",
            start_time: "13:25",
            end_time: "14:15",
            start_date: "9-7-2017",
            end_date: "12-25-2017",
            mon: false,
            tue: true,
            wed: false,
            thu: true,
            fri: false,
            sat: false,
            sun: false
        });
        this.classes.push({
            title: "Mobile Health Sensing and Analytic",
            location: "Engin Lab 306",
            start_time: "13:25",
            end_time: "14:15",
            start_date: "9-7-2017",
            end_date: "12-25-2017",
            mon: true,
            tue: false,
            wed: true,
            thu: false,
            fri: true,
            sat: false,
            sun: false
        })
        this.classes.push({
            title: "Intro to Comp Architecture",
            location: "CS Room 140",
            start_time: "16:00",
            end_time: "17:15",
            start_date: "9-7-2017",
            end_date: "12-25-2017",
            mon: true,
            tue: false,
            wed: false,
            thu: false,
            fri: true,
            sat: false,
            sun: false
        });
        this.classes.push({
            title: "Operating Systems",
            location: "Hasb 128",
            start_time: "16:00",
            end_time: "17:15",
            start_date: "9-7-2017",
            end_date: "12-25-2017",
            mon: false,
            tue: true,
            wed: false,
            thu: true,
            fri: false,
            sat: false,
            sun: false
        });
        this.classes.push({
            title: "Data Analysis and Visualization with R",
            location: "LGRC 202",
            start_time: "16:00",
            end_time: "17:15",
            start_date: "9-7-2017",
            end_date: "12-25-2017",
            mon: false,
            tue: false,
            wed: true,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        });
        this.classes.push({
            title: "Career Fair 1",
            location: "Campus Center 1",
            start_time: "10:00",
            end_time: "15:00",
            start_date: "9-26-2017",
            end_date: "9-26-2017",
            mon: false,
            tue: true,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        });
    }

    getClasses() {
        return this.classes;
    }

    //#Warning, may not change the class correctly
    editClass(class_edited) {
        for (let item of this.classes) {

            if (item.title === class_edited.title) {
                
                let index = this.classes.indexOf(item);
                this.classes.splice(index, 1);
                this.classes.push(class_edited);
                break;
            }
        }
    }

    addClasses(newClass) {
        this.classes.push(newClass);
    }

    delete(deleteClass) {
        for (let item of this.classes) {
            if (item.title === deleteClass.title) {
                let index = this.classes.indexOf(item);
                this.classes.splice(index, 1);
                break;
            }
        }


    }

    notificationSetup() {
        let day = new Date().getDay();
        for (let course of this.classes) {
            switch (day) {
                case 0:
                    if (course.sun) {
                        this.queue.push(course);
                    }
                    break;
                case 1:
                    if (course.mon) {
                        this.queue.push(course);
                    }
                    break;
                case 2:
                    if (course.tue) {
                        this.queue.push(course);
                    }
                    break;
                case 3:
                    if (course.wed) {
                        this.queue.push(course);
                    }
                    break;
                case 4:
                    if (course.thu) {
                        this.queue.push(course);
                    }
                    break;
                case 5:
                    if (course.fri) {
                        this.queue.push(course);
                    }
                    break;
                case 6:
                    if (course.sat) {
                        this.queue.push(course);
                    }
                    break;
                default:
                    break;
            }
        }

    }

}