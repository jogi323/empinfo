import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalState} from '../../../global.state';
import {AppService} from '../../../app.service'; 


@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop implements OnInit{
image_path ;
  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState,private navbarService:AppService,private router:Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }
ngOnInit(){
  var user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  this.image_path = "http://localhost:8080/images/"+ user[0].empImage;
  console.log(this.image_path);
}
  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
   signout(user){
    this.navbarService.logout();
    this.router.navigate(['']);
  }
}
