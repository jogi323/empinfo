import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalState} from '../../../global.state';
import {AppService} from '../../../app.service'; 
import { Typeahead } from 'ng2-typeahead';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop implements OnInit{
  empName;
  image_path ;
  empNames;
  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState,private navbarService:AppService,private router:Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this.empNames = [];
  }
ngOnInit(){
  // Image Path from Local Storage 
  var user = JSON.parse(localStorage.getItem('user'));
  // console.log(user);
  this.image_path = "http://localhost:8080/images/"+ user[0].empImage;
  // console.log(this.image_path);
// Employees Listt for Search Functionality
this.navbarService.url = "http://localhost:8080/users/usersdata";
  this.navbarService.getService().subscribe(res => {
  // console.log(res);
    this.empNames = res["data"];
  //   (res["data"]).forEach(element => {
  //     var id =(element.employeeId).toString().toLowerCase();
  //     console.log(typeof(id));
  //     element.id = id;
  //     // this.empNames.push({id:id});
  //   });
  //  console.log(this.empNames );
  })
}
 fruitName: string;
 employeeName :any;
    fruits: any[] = [
      {
        id: 1,
        name: "Apple",
        searchText: "apple"
      },
      {
        id: 2,
        name: "Orange",
        searchText: "orange"
      },
      {
        id: 3,
        name: "Banana",
        searchText: "banana"
      }
    ];
   
  selectedFruit: any = '';
  selectedId: any = '';
  public fruitSelected(fruit) {
    this.fruitName = fruit ? fruit.name : 'none';
  }
    public empSelected(selectedEmp) {
    this.employeeName = selectedEmp ? selectedEmp.employeeName : 'none';
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
  startSearch(){
    console.log('user');
  }
}
