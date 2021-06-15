import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactListService } from 'src/app/services/contact-list.service';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model'

@Component({
  selector: 'mobile-contact-list',
  templateUrl: './mobile-contact-list.component.html',
  styleUrls: ['./mobile-contact-list.component.scss']
})
export class MobileContactListComponent implements OnInit {

  constructor(
    private contactListService:ContactListService
  ) { }

  contacts: Contact[]
  subscription: Subscription
  // faSearch=faSearch
  // faAddressBook=faAddressBook
  // isOpenContactList=false;
  // onOpenContactList(){
  //   this.isOpenContactList=!this.isOpenContactList
  // }
  // onOpenSearchMembers(){
  //   this.router.navigateByUrl('/users')
  // }



  ngOnInit(): void {
    // this.isOpenContactList=false
    this.contactListService.getContacts()
    this.contactListService.getFilteredContacts()
    this.subscription = this.contactListService.filteredContacts$//gets observable
      .subscribe(contacts => this.contacts = contacts)
  }

  ngOnDestroy() {
    // this.isOpenContactList=false
    this.subscription.unsubscribe()
  }
}
