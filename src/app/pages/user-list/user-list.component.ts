import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-list',
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
    this.subscription=this.userService.filteredUsers$
    .subscribe(users=>{
      this.users=users
      console.log(users)}
      )
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }

}
