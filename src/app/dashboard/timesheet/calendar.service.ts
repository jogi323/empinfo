import {Injectable} from '@angular/core';
import {BaThemeConfigProvider} from '../../theme';

@Injectable()
export class CalendarService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {

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
      events: [
        {
          title: 'All Day Event',
          start: '2017-03-01',
          color: dashboardColors.silverTree
        },
        {
          title: 'Long Event',
          start: '2017-03-07',
          end: '2016-03-10',
          color: dashboardColors.blueStone
        },
        {
          title: 'Dinner',
          start: '2017-03-14T20:00:00',
          color: dashboardColors.surfieGreen
        },
        {
          title: 'Birthday Party',
          start: '2017-04-01T07:00:00',
          color: dashboardColors.gossip
        }
      ]
    };
  }
}
