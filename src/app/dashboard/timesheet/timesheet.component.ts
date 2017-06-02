import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import {CalendarService} from './calendar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetdataComponent} from './timesheetdata/timesheetdata.component';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  
  public calendarConfiguration:any;
  private _calendar:Object;

  constructor(private _calendarService:CalendarService,private modalService: NgbModal) {
    this.calendarConfiguration = this._calendarService.getData();
    this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
  }

  public onCalendarReady(calendar):void {
    this._calendar = calendar;
    //console.log(calendar);
  }

  private _onSelect(start, end):void {
    
    if (this._calendar != null) {
      //console.log(start._d );
      var day = start._d;
      var date = day.toLocaleDateString();
      //console.log(date); 
      const activeModal = this.modalService.open(TimesheetdataComponent, {size: 'lg',backdrop: 'static'});
      activeModal.componentInstance.modalHeader = 'Child modal';
      activeModal.componentInstance.modalContent = day;

      // activeModal.componentInstance.modalMethod = this.timesheetSubmit();
        // let title = prompt('Event Title:');
      // let eventData;
      // if (title) {
      //   eventData = {
      //     title: title,
      //     start: start,
      //     end: end
      //   };
      //   jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
      // }
      jQuery(this._calendar).fullCalendar('unselect');
    }
  }
  timesheetSubmit(data){

  }
  ngOnInit(){
    
  }
}
