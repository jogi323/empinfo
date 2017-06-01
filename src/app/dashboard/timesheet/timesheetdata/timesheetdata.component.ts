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
   console.log(values);
    this.TimeSheetService.url = "http://localhost:8080/timesheet";
    this.TimeSheetService.data = values;
    this.TimeSheetService.postService().subscribe(res =>{
      console.log(res);
      console.log(res["code"]);
    });
  }
  ngOnInit() {
  }
 closeModal() {
    this.activeModal.close();
  }

}
