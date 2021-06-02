import { Component, OnInit,Input } from '@angular/core';
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
    private contactListService:ContactListService
  ) { }

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
    
  }

}
