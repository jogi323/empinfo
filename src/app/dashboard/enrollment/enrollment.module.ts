import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective } from 'ng2-file-upload';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { NgaModule } from '../../theme/nga.module';
//import {AppService} from "../../app.service";

import { EnrollmentComponent } from './enrollment.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EditEmployee } from './edit-employee/edit-employee.component';
//import { EditComponentComponent } from './edit-employee/edit-component/edit-component.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    EnrollmentRoutingModule,
  ], 
  declarations: [
    EnrollmentComponent,
    EmployeeRegisterComponent,
    FileSelectDirective,
    EditEmployee,
    //EditComponentComponent,
  ],
  entryComponents: [
    //EditComponentComponent,
  ],
  providers:[]
})
export class EnrollmentModule { }
