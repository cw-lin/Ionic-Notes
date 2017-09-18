
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
            title: "Statistic I",
            location: "Hasb 137",
            start_time: "01:25",
            end_time: "03:55",
            start_date: "1-27-2017",
            end_date: "12-5-2017",
            mon: true,
            tue: true,
            wed: false,
            thu: true,
            fri: false,
            sat: false,
            sun: false
        });
        this.classes.push({
            title: "Theory of Computation",
            location: "Hasb 137",
            start_time: "00:00",
            end_time: "00:32",
            start_date: "1-27-2017",
            end_date: "12-5-2017",
            mon: false,
            tue: true,
            wed: false,
            thu: true,
            fri: false,
            sat: false,
            sun: false
        })
        this.classes.push({
            title: "Intro to Computation",
            location: "Eng Lab II 150",
            start_time: "00:00",
            end_time: "23:59",
            start_date: "1-27-2017",
            end_date: "12-5-2017",
            mon: true,
            tue: false,
            wed: true,
            thu: false,
            fri: true,
            sat: true,
            sun: true
        });
        this.classes.push({
            title: "Linear Algebra",
            location: "Goessmann 51",
            start_time: "00:35",
            end_time: "00:36",
            start_date: "1-27-2017",
            end_date: "12-5-2017",
            mon: false,
            tue: true,
            wed: false,
            thu: true,
            fri: false,
            sat: false,
            sun: false
        });
        this.classes.push({
            title: "Anthropology 103",
            location: "ILC 151L",
            start_time: "21:15",
            end_time: "22:05",
            start_date: "1-27-2017",
            end_date: "12-5-2017",
            mon: true,
            tue: false,
            wed: true,
            thu: false,
            fri: true,
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