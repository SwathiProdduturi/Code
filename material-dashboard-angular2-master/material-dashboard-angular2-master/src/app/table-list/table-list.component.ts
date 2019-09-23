import { Component, OnInit } from '@angular/core';
import { User } from 'app/user-profile/user'
import { UserService } from 'app/user-profile/user-profile.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [UserService]
})
export class TableListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService,
    private router: Router,
  ) { }
  
  //On PageLoad
  ngOnInit() {
    this.getUsers();
  }
  //Fetch all users details from database
  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }
  

}
