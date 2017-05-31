import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
const routes: Routes = [
  {
    path:'dashboard',component:DashboardComponent,
    children:[
      {path:'enrollment',loadChildren:'./enrollment/enrollment.module#EnrollmentModule'},
      {path:'timesheet',component:TimesheetComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
