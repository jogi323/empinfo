import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgaModule } from '../theme/nga.module';

import { DashboardComponent } from './dashboard.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

import { CalendarService } from './timesheet/calendar.service';
import { PayrollComponent } from './payroll/payroll.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  
  declarations: [DashboardComponent, TimesheetComponent, PayrollComponent, ProfileComponent],
  providers: [CalendarService, AuthGuard]
})
export class DashboardModule { }
