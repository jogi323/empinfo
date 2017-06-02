import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { EnrollmentComponent } from './enrollment.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EditEmployee } from './edit-employee/edit-employee.component';

const routes: Routes = [
  {
    path:'',component:EnrollmentComponent,children:[
      {
         path:'',component:EmployeeRegisterComponent,
      },
      {
         path:'editemployee',component:EditEmployee,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentRoutingModule { }
