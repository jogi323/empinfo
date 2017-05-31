import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {AppService} from "../../app.service";
import { Router } from "@angular/router";
import swal from "sweetalert";

@Component({
  selector: 'app-fpassword',
  templateUrl: './fpassword.component.html',
  styleUrls: ['./fpassword.component.scss']
})
export class FpasswordComponent implements OnInit {

  public form:FormGroup;
  public newpassword:AbstractControl;
  public confirmpassword:AbstractControl;
  public submitted:boolean = false;
  employeeEmail:Number;
  constructor(fb:FormBuilder,private ResetPasswordService:AppService,private router:Router  ) {
    this.form = fb.group({
      'newpassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'confirmpassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      
    });

    this.newpassword = this.form.controls['newpassword'];
    this.confirmpassword = this.form.controls['confirmpassword'];
  }

  ngOnInit() {
    this.employeeEmail = this.ResetPasswordService.forgotPasswordEmail;
    }
 public onSubmit(values:Object):void {
  // console.log(values);
   if(values["newpassword"] != values["confirmpassword"]){
      swal("Passwords are mismatched!");
   }else{
     values["email"] = this.employeeEmail;
      this.ResetPasswordService.url = "http://localhost:8080/users/resetpassword";
      this.ResetPasswordService.data = values;
      this.ResetPasswordService.postService().subscribe(res =>{
       // console.log(res);
        if(res["code"] == 0){
          swal("Password Updated Succssfully!");
          this.router.navigate(['']);
        }else if(res["code"] == 1){
          swal("Unable to update password.Try again!");
           this.router.navigate(['forgotpassword']);
        }
      })
     
   }
 }
}
