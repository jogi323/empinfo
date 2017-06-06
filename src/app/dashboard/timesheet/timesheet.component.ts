import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { CalendarService } from './calendar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetdataComponent } from './timesheetdata/timesheetdata.component';
import { AppService } from "../../app.service";
import { BaThemeConfigProvider } from '../../theme';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  timesheetdata;
  public calendarConfiguration:any;
  private _calendar:Object;
  data;
  _id;
  user;
  dataAvailable:Boolean = false;
constructor(private _calendarService:CalendarService, private _baConfig: BaThemeConfigProvider,
private modalService: NgbModal, private calendarService: AppService) {
  let dashboardColors = this._baConfig.get().colors.dashboard;
  //     // this.timesheetdata = this._calendarService.data;
  //     this._calendarService.caseNumber$.subscribe(res => {
  //      this.data = res;
  //   //       // this. calendarConfiguration2 = this._calendarService.getData(this.timesheetdata);
  //   //       // this.calendarConfiguration = this._calendarService.getData(this.timesheetdata);
  //   //       // this.onCalendarReady(this._calendar);
  //    });
    this.user = JSON.parse(localStorage.getItem("user"));
   // console.log(this.user);
    this._id = (this.user)[0].timesheets;
    // console.log(this._id);
        this.calendarService.url = 'http://localhost:8080/timesheet/getdata/' + this._id;
    this.calendarService.getService().subscribe(res => {
       // console.log(res);
        (res).forEach(element => {
          // console.log(element);
          var sss ={"title":"","start":"", "color": dashboardColors.blueStone};
          
          (element["data"]).forEach(element => {
            
             if(element["workingHours"] != undefined) {
                 sss['title'] = element['workingHours'];
             }
            else{
              sss['start'] = element['date'].toLocaleString().slice(0,10);
              // console.log(sss["start"]);
            }
          });
          this.data.push(sss);
          this.dataAvailable = true;
         // console.log(this.data);
        });
          // this.publishData(this.data);
    })

        this.calendarConfiguration = this.getData();
        this.calendarConfiguration.select = (start, end) => this._onSelect(start, end); 
        this.data = [];
  }

  public onCalendarReady(calendar): void {
    // console.log("fvjafha");
    this._calendar = calendar;
     // console.log(calendar);
     let eventData;
     eventData = this.data;
     console.log('eventData' + this.data);  
     jQuery(this._calendar).fullCalendar('addEventSource', eventData);
  }

  private _onSelect(start, end): void {
    if (this._calendar != null) {
      //console.log(start._d );
      var day = start._d;
      //var date = day.toLocaleDateString();
      //console.log(date); 
      const activeModal = this.modalService.open(TimesheetdataComponent, { size: 'lg', backdrop: 'static'});
      activeModal.componentInstance.modalHeader = 'Child modal';
      activeModal.componentInstance.modalContent = day;

      // activeModal.componentInstance.modalMethod = this.timesheetSubmit();
//         let title = prompt('Event Title:');
//       let eventData;
//       var date = new Date();
//         var d = date.getDate();
//         var m = date.getMonth();
//         var y = date.getFullYear();
//       if (title) {
//         eventData = {
//           title: title,
//           start: new Date(y, m, d)
// ,
//           end: end
//         };
//         jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
//       }
      jQuery(this._calendar).fullCalendar('unselect');
    }
  }
// private caseNumber = new Subject<any>();
//   caseNumber$ = this.caseNumber.asObservable();
//     publishData(Data) {
//     console.log("%%%%%%%%%%%%%");
//     console.log(Data);
//     this.caseNumber.next(Data);
// }
  
ngOnInit(){
    let dashboardColors = this._baConfig.get().colors.dashboard;
    this.user = JSON.parse(localStorage.getItem("user"));
   // console.log(this.user);
    this._id = (this.user)[0].timesheets;
    // console.log(this._id);



  }
   private getData() {
     // console.log('getdata' + " " + data);
     let dashboardColors = this._baConfig.get().colors.dashboard;
      
    return {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2017-05-08',
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      // events:data
    };

    

   
  }

}
