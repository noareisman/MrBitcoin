import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { UtilService } from './util.service';

// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { AlertService } from './alert.service'
// import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactListService {

  constructor(
    private userService: UserService,
    private utileService:UtilService
  ) { }

  // BASE_URL = 'http://localhost:3030/api/user/'//development - back
  // BASE_URL = '../../assets/data-front.json'//development - front


  private _contacts$ = new BehaviorSubject<Contact[]>([])
  public contacts$ = this._contacts$.asObservable()

  private _filteredContacts$ = new BehaviorSubject<Contact[]>([])
  public filteredContacts$ = this._filteredContacts$.asObservable()

  private _filterBy$ = new BehaviorSubject({ term: '' })
  public filterBy$ = this._filterBy$.asObservable()

  public setFilter(filterBy) {
    this._filterBy$.next(filterBy)
    this.getFilteredContacts()
  }

  public getContacts() {
    const currUser=this.userService.user
        this._contacts$.next(currUser.contactList)
  }

  public getFilteredContacts() {
    const contacts = this._contacts$.getValue()
    const filterBy = this._filterBy$.getValue()
    const filteredContacts = this._filter(contacts, filterBy.term)//comment if doesnt work
    this._filteredContacts$.next(this._sort(filteredContacts))//comment if doesnt work
    // this._filteredContacts$.next(contacts)
  }

  private _filter(contacts, term ='') {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(term)
    })
  }

  public getContactById(id: string) {
    const contacts = this._contacts$.getValue()
    const contact = contacts.find((contact) => contact._id === id)
    return contact
  }

  public removeContact(id: string) {
    const contacts = this._contacts$.getValue()
    const contactIdx = contacts.findIndex(contact => contact._id === id)
    contacts.splice(contactIdx, 1)
    this.userService.updateUserContactList(contacts)
    // this.getContacts()
    this.getFilteredContacts()
  }

  public saveContact(contact: Contact) {
    return contact._id ? this._updateContact(contact) : this._addContact(contact)
  }

  public async addToContactList(contactToAdd){
    const contacts = this._contacts$.getValue()
    contacts.unshift(contactToAdd)
    await this.userService.updateUserContactList(contacts)
    this.getFilteredContacts()
    return contactToAdd
  }

  private async _updateContact(updatedContact: Contact) {
    const contacts = this._contacts$.getValue()
    const contactIdx = contacts.findIndex(contact => contact._id === updatedContact._id)
    contacts.splice(contactIdx, 1, updatedContact)
    await this.userService.updateUserContactList(contacts)
    this.getFilteredContacts()
    return updatedContact
  }
  
  private async _addContact(newContact: Contact) {
    const contacts = this._contacts$.getValue()
    newContact._id='localId'+this.utileService.makeId()
    contacts.unshift(newContact)
    await this.userService.updateUserContactList(contacts)
    this.getFilteredContacts()
    return newContact
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }
      return 0;
    })
  }
}

