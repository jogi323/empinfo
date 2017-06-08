import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { PayrollComponent } from './payroll/payroll.component';

import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],
    children:[
      {path:'enrollment',loadChildren:'./enrollment/enrollment.module#EnrollmentModule'},
      {path:'timesheet',component:TimesheetComponent},
      {path:'payroll',component:PayrollComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
