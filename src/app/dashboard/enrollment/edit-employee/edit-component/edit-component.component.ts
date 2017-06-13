import {Component, OnInit }from '@angular/core'; 
import {FormGroup, AbstractControl, FormBuilder, Validators}from '@angular/forms'; 
import {Router }from '@angular/router'; 
import {AppService}from "../../../../app.service"; 
import swal from "sweetalert"; 
import {NgbActiveModal }from '@ng-bootstrap/ng-bootstrap'; 

@Component( {
selector:'app-edit-component', 
templateUrl:'./edit-component.component.html', 
styleUrls:['./edit-component.component.scss']
})
export class EditComponentComponent implements OnInit {
user:UserDetails; 
_id; 
userDetails;
data;
managers;
constructor(private router:Router, private updateService:AppService, private activeModal:NgbActiveModal) {
  // this.user ={
  //   reportingManager:"14"
  // }
  this.managers = [];
}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user")); 
      // console.log(this.user);
      this._id = (this.user)[0]._id; 
      // console.log(this._id); 
      this.updateService.url = "http://localhost:8080/users/empdetails/"+this._id;
      this.updateService.getService().subscribe(res =>  {
     // console.log(res); 
      this.userDetails = res["data"][0];
      console.log(this.userDetails);

      this.updateService.url = "http://localhost:8080/users/managers";
      this.updateService.getService().subscribe(res=>{
        // console.log(res);
          this.data = res;
          //console.log(this.data);
           (this.data).forEach(element => {
             //console.log(element);
             this.managers.push(element.employeeId);
         //console.log(this.managers);
      });
    })
      this.user =  {
        id:this.userDetails.employeeId,
        ename:this.userDetails.employeeName, 
        email:this.userDetails.personalEmail, 
        erole:this.userDetails.role, 
        etype:this.userDetails.employeeType, 
        ctc:this.userDetails.cost, 
        epayroll:this.userDetails.payRollType, 
        designation:this.userDetails.designation, 
        reportingManager:this.userDetails.manager, 
        mobile1:this.userDetails.primaryMobile, 
        mobile2:this.userDetails.alternateMobile, 
        dob:this.userDetails.dob, 
        doj:this.userDetails.joinedOn, 
        address:this.userDetails.address, 
        
        jobstatus:this.userDetails.status,
      }
     // console.log(this.user);
    })
  }
  closeModal() {
    this.activeModal.close(); 
  }
  update(user){
    console.log(user);
    this.updateService.url = "http://localhost:8080/users/updateuserdetails";
    this.updateService.data = user;
    this.updateService.postService().subscribe(res => {
      console.log(res);
      if(res["status"] == 1){
        swal("Updated Successfully.");
        this.activeModal.close();
      }else{
        swal("Failed to Update.");
        this.activeModal.close();
      }
    })
  }
}

class UserDetails {
  ename:String; 
  email:String; 
  erole:String; 
  etype:String; 
  ctc:Number; 
  epayroll:String; 
  designation:String; 
  reportingManager:String; 
  mobile1:Number; 
  mobile2:Number; 
  dob:Date; 
  doj:Date; 
  address:String; 
 id:Number;
  jobstatus:Boolean; 
}