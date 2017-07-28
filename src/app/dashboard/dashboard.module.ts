import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgaModule } from '../theme/nga.module';

import { DashboardComponent } from './dashboard.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

import { CalendarService } from './timesheet/calendar.service';
import { TimesheetdataComponent } from './timesheet/timesheetdata/timesheetdata.component';
import { PayrollComponent } from './payroll/payroll.component';
import { EditComponentComponent } from './enrollment/edit-employee/edit-component/edit-component.component';
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
    entryComponents: [
     TimesheetdataComponent,EditComponentComponent
  ],
  declarations: [DashboardComponent, TimesheetComponent,TimesheetdataComponent, PayrollComponent,EditComponentComponent, ProfileComponent],
  providers: [CalendarService,AuthGuard]
})
export class DashboardModule { }
