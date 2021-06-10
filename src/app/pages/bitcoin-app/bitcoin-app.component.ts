import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model'
import { ContactListService } from 'src/app/services/contact-list.service';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
// import { Router } from '@angular/router';

@Component({
  selector: 'bitcoin-app',
  templateUrl: './bitcoin-app.component.html',
  styleUrls: ['./bitcoin-app.component.scss']
})
export class BitcoinAppComponent implements OnInit {

  constructor(
    private contactListService: ContactListService,
    // private router: Router
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
