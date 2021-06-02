import { Component, Input, OnInit} from '@angular/core';
import {Contact} from 'src/app/models/contact.model';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  @Input() contacts: Contact[]
  
  constructor() { }

  faSearch=faSearch

  trackByFn(contact: Contact){
    return contact._id
  }

  ngOnInit(): void {
    
  }

}
