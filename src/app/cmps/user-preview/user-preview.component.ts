import { Component, OnInit,Input,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { ContactListService } from 'src/app/services/contact-list.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss']
})
export class UserPreviewComponent implements OnInit {
  @Input() user:User
  constructor(
    private contactListService:ContactListService,
    private userService:UserService
  ) { }

  currUser:User=null
  // loggedinUser:any
  userSubscription:Subscription
  isContact:boolean=false

  addToContactList(user){
    const contactToAdd={
      _id:user._id,
      name: user.fullname,
      email:user.email,
      phone:user.phone
    }
    console.log('adding contact:',contactToAdd);
    
    this.contactListService.addToContactList(contactToAdd)
  }

  ngOnInit(): void {
    this.userSubscription=this.userService.currUser$
    .subscribe(user=>{
      this.currUser=user
      if(user){
        const contactListIds=user.contactList.map(contact=>{return contact._id})
        this.isContact=contactListIds.includes(this.user._id) 
      }
      })     
  }

  ngOnDestroy(){
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
  }
}
