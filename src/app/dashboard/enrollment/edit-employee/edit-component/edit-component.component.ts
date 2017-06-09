import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AppService} from "../../../../app.service";
import swal from "sweetalert";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.scss']
})
export class EditComponentComponent implements OnInit {
  user;
  constructor(private router:Router,private register:AppService,private activeModal: NgbActiveModal) { 
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
  }

  ngOnInit() {
    console.log();
  }
   closeModal() {
    this.activeModal.close();
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