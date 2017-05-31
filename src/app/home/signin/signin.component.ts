import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AppService } from '../../app.service';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  token;
  userDetails;
  constructor(fb:FormBuilder,private login:AppService,private router:Router) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
  // console.log(values);
   this.login.url = "http://localhost:8080/users/login";
   this.login.data = values;
   this.login.postService().subscribe(res => {
      //console.log(res);
      var status = res["code"];
      console.log(status);

      //console.log(status);
       if(status == 0){
        swal("Inavlaid Credentials!");
        this.router.navigate(['']);
       }else if(status == 1){
          this.userDetails = res["data"];
          //console.log(this.userDetails);
          var loginstatus = (this.userDetails)[0].firstLogin;
          this.token = res["token"];
         swal("Successfully LoggedIn!");
         this.login.storeUserdata(this.token,this.userDetails);
         if(loginstatus == true){
             this.router.navigate(['changepassword']);
         }else{
           this.router.navigate(['dashboard']);
         }
       }else{
          swal("Inavlaid Credentials!");
          this.router.navigate(['']);
       }
   })
  }
}
