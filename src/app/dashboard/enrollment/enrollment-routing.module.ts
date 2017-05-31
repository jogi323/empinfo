import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { EnrollmentComponent } from './enrollment.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';

const routes: Routes = [
  {
    path:'',component:EnrollmentComponent,children:[
      {
         path:'',component:EmployeeRegisterComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
