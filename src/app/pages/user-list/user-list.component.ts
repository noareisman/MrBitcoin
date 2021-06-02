import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private userService:UserService
  ) { }

  users: User[]
  subscription:Subscription
  
  trackByFn(user: User){
    return user._id
  }

  ngOnInit(): void {
    this.userService.getFilteredUsers()
    this.subscription=this.userService.users$
    .subscribe(users=>this.users=users)
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }

}
