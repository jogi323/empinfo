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
  finalDate:any;
  dataAvailable:Boolean = false;
constructor(private _calendarService:CalendarService, private _baConfig: BaThemeConfigProvider,
private modalService: NgbModal, private calendarService: AppService) {
  let dashboardColors = this._baConfig.get().colors.dashboard;
    this.user = JSON.parse(localStorage.getItem("user"));
    this._id = (this.user)[0].timesheets;
        this.calendarService.url = 'http://localhost:8080/timesheet/getdata/' + this._id;
    this.calendarService.getService().subscribe(res => {
        (res).forEach(element => {
          var sss ={"title":"","start":"", "color": dashboardColors.blueStone,editable:false};
          
          (element["data"]).forEach(element => {
            
             if(element["workingHours"] != undefined) {
                 sss['title'] = 'Workedhours :' + element['workingHours'];
             }
            else{
              sss['start'] = element['date'].toLocaleString().slice(0,10);
            }
          });
          this.data.push(sss);
          this.dataAvailable = true;
        });
    });

        this.calendarConfiguration = this.getData();
        this.calendarConfiguration.select = (start, end) => this._onSelect(start, end); 
        this.data = [];
  }

  public onCalendarReady(calendar): void {
    this._calendar = calendar;
     let eventData;
     eventData = this.data;
     jQuery(this._calendar).fullCalendar('addEventSource', eventData);

    }

  private _onSelect(start, end): void {
    if (this._calendar != null) {
      var day = start._d;
      const activeModal = this.modalService.open(TimesheetdataComponent, { size: 'lg', backdrop: 'static'});
      activeModal.componentInstance.modalHeader = 'Child modal';
      activeModal.componentInstance.modalContent = day;
      jQuery(this._calendar).fullCalendar('unselect');
    }
  }
  
ngOnInit(){
    let dashboardColors = this._baConfig.get().colors.dashboard;
    this.user = JSON.parse(localStorage.getItem("user"));
    this._id = (this.user)[0].timesheets;
  }
   private getData() {
     let dashboardColors = this._baConfig.get().colors.dashboard;
      var date = new Date(),
            month = '' + (date.getMonth() + 1),
            day = '' + date.getDate(),
            year = date.getFullYear();
            if (month.length < 2) {
              month = '0' + month;
            } 
            if (day.length < 2) {
               day = '0' + day;
            }
            this.finalDate = [year, month, day].join('-');
        
    return {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay',
      },
      defaultDate: this.finalDate,
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      // events:data
    };

    

   
  }

}
