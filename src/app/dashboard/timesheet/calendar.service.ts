import {Injectable,OnInit} from '@angular/core';
import {BaThemeConfigProvider} from '../../theme';
import { AppService } from "../../app.service";
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class CalendarService {
data;
_id;
user;
finalDate:any;
  constructor(private _baConfig:BaThemeConfigProvider,private calendarService:AppService) {
     let dashboardColors = this._baConfig.get().colors.dashboard;

    this.data=[{
          title: 'All Day Event',
          start: '2017-03-01',
          color: dashboardColors.silverTree
        },
        {
          title: 'Long Event',
          start: '2017-03-07',
          end: '2017-03-10',
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
        }];

  }
  // ngOnInit(){
  //   let dashboardColors = this._baConfig.get().colors.dashboard;

  //          this.user = JSON.parse(localStorage.getItem("user"));
  //     console.log(this.user);
  //     this._id = (this.user)[0].timesheets;
  //     console.log(this._id);
  //         this.calendarService.url = "http://localhost:8080/timesheet/getdata/"+this._id;
  //   this.calendarService.getService().subscribe(res=>{
  //       //console.log(res);
  //       (res).forEach(element => {
  //         //console.log(element);
  //         var sss ={"title":"WorkingHours:8","start":"2017-05-26", "color": dashboardColors.blueStone};
  //         (element["data"]).forEach(element => {
            
  //            if(element["workingHours"]!=undefined){
  //                sss["title"]=element["Workinghours"+":"+"workingHours"];
  //            }
  //           else{
  //             sss["start"]=element["date"].toLocaleString().slice(0,19);
  //             //console.log(sss["start"]);
  //           }
  //         });
  //         //console.log(sss);
  //         this.data.push(sss);
         
  //       });
  //        this.publishData(this.data);
  //   })
  // }
  private caseNumber = new Subject<any>();
  caseNumber$ = this.caseNumber.asObservable();
  //   publishData(Data) {
  //   console.log(Data);
  //    console.log("%%%%%%%%%%%%%");
  //   this.caseNumber.next(Data);
  // }
  getData(data) {
        console.log(data);
     let dashboardColors = this._baConfig.get().colors.dashboard;
      var date = new Date(),
          month = '' + (date.getMonth() + 1),
          day = '' + date.getDate(),
          year = date.getFullYear();
          this.finalDate = [year, month, day].join('-');
      console.log(this.finalDate);
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
      events:data
    };

    

   
  }
}