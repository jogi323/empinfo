import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../app.service";
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EditComponentComponent} from "./edit-component/edit-component.component";

@Component({
  selector: 'app-enrollment',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})

export class EditEmployee implements OnInit {
usersdata:any[];
userdetails:any[]
data;
  constructor(private usersService:AppService,private modalService: NgbModal,
  private router:Router) { }

userDetails(user){
  this.router.navigate(['dashboard/enrollment/editemployee']);
}
editEmployee(user){
  // console.log(user);
   const activeModal = this.modalService.open(EditComponentComponent, {size: 'lg',backdrop: 'static'});
      activeModal.componentInstance.modalHeader = 'Child modal';
      activeModal.componentInstance.modalContent = user;
}
  ngOnInit() {
    this.usersService.url="http://localhost:8080/users/usersdata";
    this.usersService.getService().subscribe(res=>{
    // console.log(res["data"]);
  this.data = res["data"];
   this.usersdata = this.data.sort(function (a, b) {
  var nameA = a.employeeId; // ignore upper and lowercase
  var nameB = b.employeeId; // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }


  return 0;
});
// console.log(this.usersdata);

    })
  }

  }



// $(document).ready(function(){
// $("#mytable #checkall").click(function () {
//         if ($("#mytable #checkall").is(':checked')) {
//             $("#mytable input[type=checkbox]").each(function () {
//                 $(this).prop("checked", true);
//             });

//         } else {
//             $("#mytable input[type=checkbox]").each(function () {
//                 $(this).prop("checked", false);
//             });
//         }
//     });

//     $("[data-toggle=tooltip]").tooltip();
// });
