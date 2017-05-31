import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {AppService} from "../../app.service";
import { Router } from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  public form:FormGroup;
  public currentpassword:AbstractControl;
  public newpassword:AbstractControl;
  public confirmpassword:AbstractControl;
  public submitted:boolean = false;
  employeeId:Number;
  constructor(fb:FormBuilder,private ChangePasswordService:AppService,private router:Router  ) {
    this.form = fb.group({
      'currentpassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'newpassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'confirmpassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      
    });

    this.currentpassword = this.form.controls['currentpassword'];
    this.newpassword = this.form.controls['newpassword'];
    this.confirmpassword = this.form.controls['confirmpassword'];
  }
// if(!this.isCorrect){

// }
  public onSubmit(values:Object):void {
    values["employeeId"]=this.employeeId;
    //console.log(values);
    this.ChangePasswordService.url = "http://localhost:8080/users/changepassword";
    this.ChangePasswordService.data = values;
    this.ChangePasswordService.postService().subscribe(res =>{
      //console.log(res["code"]);
      switch(res["code"]){
          case 0:
          swal("Current Password isn't correct!");
          this.router.navigate(['changepassword']);
          break;
          case 1:
          swal("New Password's are mismateched!");
          this.router.navigate(['changepassword']);
          break;
          case 2:
          swal("Unable to Update Password.Try again!");
          this.router.navigate(['changepassword']);
          break;
          case 3:
          swal("Passwword Updated Successfully!");
          this.router.navigate(['']);
          break;
      }
    })
  }

  ngOnInit() {
    var user =JSON.parse(localStorage.getItem("user"));
    //console.log(user[0].employeeId);
    this.employeeId = user[0].employeeId;
  }

}
