import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model'
import { ContactListService } from 'src/app/services/contact-list.service';

@Component({
  selector: 'bitcoin-app',
  templateUrl: './bitcoin-app.component.html',
  styleUrls: ['./bitcoin-app.component.scss']
})
export class BitcoinAppComponent implements OnInit {

  constructor(
    private contactListService: ContactListService
  ) { }

  contacts: Contact[]
  subscription: Subscription

  ngOnInit(): void {
    this.contactListService.getContacts()
    this.contactListService.getFilteredContacts()
    this.subscription = this.contactListService.filteredContacts$//gets observable
      .subscribe(contacts => this.contacts = contacts)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
