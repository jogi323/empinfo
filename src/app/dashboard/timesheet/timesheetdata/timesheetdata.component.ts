import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AppService } from "../../../app.service";

@Component({
  selector: 'app-timesheetdata',
  templateUrl: './timesheetdata.component.html',
  styleUrls: ['./timesheetdata.component.scss']
})
export class TimesheetdataComponent implements OnInit {
  public form:FormGroup;
   public day:AbstractControl;
  public time:AbstractControl;
  public desc:AbstractControl;
  public submitted:boolean = false;
  token;
  constructor(fb:FormBuilder,private activeModal: NgbActiveModal,private TimeSheetService:AppService) {
    this.form = fb.group({
      'day': ['',Validators.compose([Validators.required])],
      'time': ['', Validators.compose([Validators.required])],
      'desc': ['', Validators.compose([Validators.required])]
    });
    this.day = this.form.controls['day'];
    this.time = this.form.controls['time'];
    this.desc = this.form.controls['desc'];
  }

  public onSubmit(values:Object):void {
    this.activeModal.close();
   // console.log(values);
    this.TimeSheetService.url = "http://localhost:8080/timesheet"+ this.token;
    //console.log( this.TimeSheetService.url);
    this.TimeSheetService.data = values;
    this.TimeSheetService.postService().subscribe(res =>{
      console.log(res);
      console.log(res["status"]);
    });
  }
  ngOnInit() {
      //this.token =localStorage.getItem("id_token");
    
      this.token = localStorage.getItem('id_token')
            ? '?token=' + localStorage.getItem('id_token')
            : '';
              // console.log(this.token);
  }
 closeModal() {
    this.activeModal.close();
  }

}
