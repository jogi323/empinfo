import {Injectable } from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {AppService} from "../app.service";

@Injectable()

export class AuthGuard implements CanActivate{
    constructor(private authService:AppService,private router:Router){}
    canActivate(){
        if(this.authService.loggedIn()){
            return true;
        }else{
            this.router.navigate(['']);
            return false;
        }
    }
}