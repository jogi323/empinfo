import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../../theme/validators';
import { Component, OnInit } from '@angular/core';
import { FileUploader,ParsedResponseHeaders } from 'ng2-file-upload';
import { Router } from '@angular/router';
import {AppService} from "../../../app.service";

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})

export class EmployeeRegisterComponent implements OnInit {
       user:UserDetails;
       options:object;
        managers:any;
 private uploader: FileUploader;
  constructor(private router:Router,
  private register:AppService,) {

  this.user = {
        ename: "" ,
        email: "" ,
        erole: "",
        etype:"",
        ctc: undefined,
        epayroll: "",
        designation:"",
        rmanager: "",
        mobile1: undefined,
        mobile2: undefined,
        dob: null,
        doj: null,
        address:"",
        image:"",
        jobstatus: false
  }
  this.managers = [];
 }
 data:any;
  ngOnInit() {
     this.options = { url:"http://localhost:8080/uploads" }
    this.uploader = new FileUploader(this.options);
this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
 this.uploader._onCompleteItem = (item: any, response: string, status: number,
      headers: ParsedResponseHeaders) => {
        console.log("oncomplete call")
      // this.uploaded.emit(item.file.size);
      console.log(item);
    };

    this.register.url = "http://localhost:8080/users/managers";
    this.register.getService().subscribe(res=>{
      // console.log(res);
      this.data = res;
      //console.log(this.data);
       (this.data).forEach(element => {
         //console.log(element);
         this.managers.push(element.employeeId);
         //console.log(this.managers);
      });
    })
  }


//  fileChange($event) : void {
//     this.readThis($event.target);
//   }
//   readThis(inputValue: any): void {
//   var totalLength = inputValue.files;
//   for(var i = 0; i < totalLength.length; i++) {
//   var file:File = inputValue.files[i];

//   var myReader:FileReader = new FileReader();
//   myReader.onloadend = (e) => {
//     this.user.image = myReader.result;
//   }
//   myReader.readAsDataURL(file);
//   }
// }

onRegisterSubmit(user){
console.log(this.uploader)
var upload = this.uploader["queue"][0];
 upload.upload();
 this.uploader._onCompleteItem = (item: any, response: string, status: number,
      headers: ParsedResponseHeaders) => {
        console.log("oncomplete call")
      // this.uploaded.emit(item.file.size);
      console.log(item);
    };

      this.register.url="http://localhost:8080/users/createEmployee";
        user.fileName =upload["file"]["name"];
        console.log(user);
      this.register.data = user;

      this.register.postService().subscribe(res=>{
        console.log(res)
        alert("Successfully registered")
    });
}

}

class UserDetails {

        ename: String;
        email: String;
        erole: String;
        etype:String;
        ctc: Number;
        epayroll: String;
        designation:String;
        rmanager:String;
        mobile1: Number;
        mobile2: Number;
        dob: Date;
        doj: Date;
        address:String;
        image:String;
        jobstatus:Boolean;
}