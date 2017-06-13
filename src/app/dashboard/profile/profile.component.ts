import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;
  _id;
  userDetails;
  image_path;
  constructor(private profileService: AppService) { }

  ngOnInit() {
        this.user = JSON.parse(localStorage.getItem("user")); 
      // console.log(this.user);
      this._id = (this.user)[0]._id; 
      // console.log(this._id); 
      this.profileService.url = "http://localhost:8080/users/empdetails/"+this._id;
      this.profileService.getService().subscribe(res =>  {
     // console.log(res); 
      this.userDetails = res["data"][0];
      console.log(this.userDetails);
      this.image_path = "http://localhost:8080/images/"+ this.userDetails.empImage;
      });
  }

}
