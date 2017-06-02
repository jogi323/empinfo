import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FpasswordComponent } from './fpassword/fpassword.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path : '' , component : HomeComponent , children : [
       {
        path : '' , component : SigninComponent
      },
      {
        path : 'changepassword', component : ChangepasswordComponent
      },
      {
        path : 'forgotpassword', component : ForgotpasswordComponent
      },
       {
        path : 'resetpassword', component : FpasswordComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
