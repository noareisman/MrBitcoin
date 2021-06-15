import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
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
  
  loggedinUserSubscription:Subscription
  // currUserContactList:any
  users: User[]
  subscription:Subscription
  loggedinUser:any=null
  
  
  trackByFn(user: User){
    return user._id
  }

  ngOnInit(): void {
    this.userService.getFilteredUsers()
    this.loggedinUserSubscription=this.userService.currUser$
    .subscribe(loggedinUser=>{
      // this.currUserContactList=currUser.contactList
      this.loggedinUser=loggedinUser
    })
    this.subscription=this.userService.filteredUsers$
    .subscribe(users=>{
      this.users=users
      console.log(users)}
      )
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe()
    this.loggedinUserSubscription.unsubscribe()
    
  }

}
