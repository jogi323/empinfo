import {Component, ViewChild, Input, Output, ElementRef, EventEmitter} from '@angular/core';
import 'fullcalendar/dist/fullcalendar.js';
import * as jQuery from 'jquery';

@Component({
  selector: 'ba-full-calendar',
  templateUrl: './baFullCalendar.html'
})
export class BaFullCalendar {

  @Input() baFullCalendarConfiguration:Object;
  @Input() baFullCalendarClass:string;
  @Output() onCalendarReady = new EventEmitter<any>();

  @ViewChild('baFullCalendar') public _selector:ElementRef;

  ngAfterViewInit() {
    let calendar = jQuery(this._selector.nativeElement).fullCalendar(this.baFullCalendarConfiguration,
        {
        events: [
        {
            title  : 'fayaz',
            start  : '2017-05-01'
        },
        {
            title  : 'fayaz shaik',
            start  : '2017-05-05',
            end    : '2017-05-07'
        }]
      });
    this.onCalendarReady.emit(calendar);
  }
}
