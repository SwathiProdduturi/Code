import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from './user';
import { ActivatedRoute, Router} from '@angular/router';
import { UserService } from './user-profile.service';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers:[UserService]
})

export class UserProfileComponent implements OnInit {
 
  @Input() user: User;
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location,
    private http: HttpClient
  ) { }
  private usersUrl =  'http://localhost:49547/api/user';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  
  
  //On Page load
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
         this.getUser(id);
         
      } else {
          this.newDetail();
      }
    });
  }
  //Fetch userdetails based on ID
  getUser(id: number): void {
      this.userService.getUser(id)
      .subscribe(user => this.user = user);
    
  }
 
   //Call this method, on "goBack()" function calls
  goBack(): void {
    this.location.back();
  }
  //Call this method for new user
  newDetail(): void {
    this.user = new User();
  }
  //Call this method, on "save()" function calls
  save(): void {
    this.userService.updateUser(this.user)
        .subscribe(() => this.goBack());
    
 }
}
