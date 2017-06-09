import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AppService } from '../../app.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
    public form:FormGroup;
    public email:AbstractControl;
    public otp:AbstractControl;

    isOtp:boolean = false;
    data;

  constructor(fb:FormBuilder,private FpService:AppService,private router:Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required])],
      'otp': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.email = this.form.controls['email'];
    this.otp = this.form.controls['otp'];
   }
  public onSubmit(values:Object):void {
   if(!this.isOtp){
    // console.log(values["email"]);
      this.FpService.url = "http://localhost:8080/users/otpgeneration";
      this.FpService.data = values;
      this.FpService.postService().subscribe(res=>{
      //  console.log(res);
        this.data=res;
      // console.log(this.data);
        if(this.data['status']==200){
          this.isOtp = true;
          swal("OTP has sent to your Email-ID!");
        }else if(this.data['status']==404){
          swal("Incalid Email-ID");
          this.router.navigate(['forgotpassword']);
        }
      });

   }else if(this.isOtp){
     // console.log(values);
      this.FpService.url="http://localhost:8080/users/checkotp";
      this.FpService.data=values;
      this.FpService.forgotPasswordEmail = values['email'];
      //console.log(this.FpService.forgotPasswordEmail);
      this.FpService.postService().subscribe(res=>{
        // console.log(res);
        if(res["status"] == 200){
          this.router.navigate(['resetpassword']);
        }else if(res["status"] == 404){
          swal("Please Enter Valid OTP!");
        }
      });
   }
  }
  ngOnInit() {
  }

}
