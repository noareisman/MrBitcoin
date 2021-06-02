import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { AlertService } from './alert.service'
import { catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  BASE_URL = 'http://localhost:3030/api/contact/'//development - back
  // BASE_URL = '../../assets/data-front.json'//development - front

  private _contacts$ = new BehaviorSubject<Contact[]>([])
  public contacts$ = this._contacts$.asObservable()

  private _filterBy$ = new BehaviorSubject({ term: '' })
  public filterBy$ = this._filterBy$.asObservable()

  error=new Subject<string>()


  // Option 5:
  public getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.BASE_URL)
      .pipe(
        tap(() => console.log('fetched contacts')),
        catchError(this._handleError<Contact[]>('getContacts', []))
      )
  }

  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO: send error to log file
      // TODO: better job of transforming error for user consumption
      console.log(`error while trying to ${operation}:`, error.message);
      return of(result as T);// Let the app keep running by returning an empty result.
    };
  }
 
  public getFilteredContacts() {
    this.getContacts()
      .subscribe((contacts) => {
        const filterBy = this._filterBy$.getValue()
        contacts = this._filter(contacts, filterBy.term)
        // this._contacts$.next(contacts)
        this._contacts$.next(this._sort(contacts))
      }, error=>this.error.next(error.message))
  }

  public setFilter(filterBy) {
    this._filterBy$.next(filterBy)
    this.getFilteredContacts()
  }





  private _filter(contacts, term = '') {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
    })
  }

  //return contacts whose name contains search term
  searchContacts(term:string):Observable<Contact[]>{
    if (!term.trim()){
      //if not search term, return empty contact array
      return of([])
    }
  }

  public getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(this.BASE_URL + id)
      .pipe(
        tap(() => console.log(`fetched contact id=${id}`)),
        catchError(this._handleError<Contact>(`getContactById ${id}`))
      )
  }

  public removeContact(id: string) {
    return this.http.delete<Contact>(this.BASE_URL + id)
      .pipe(
        tap(() => console.log(`deleted contact id=${id}`)),
        catchError(this._handleError<Contact>(`deleteHero`)),
      )
  }

  public saveContact(contact: Contact) {
    return contact._id ? this._updateContact(contact) : this._addContact(contact)
  }

  private _updateContact(contact: Contact): Observable<any> {
    const updatedContact = this.http.put<Contact>(this.BASE_URL + contact._id, contact).pipe(
      tap(() => console.log(`updated contact id=${contact._id}`)),
      catchError(this._handleError<any>('updateContact')),
    )
    this.getFilteredContacts()
    return updatedContact
  }

  private _addContact(contact: Contact): Observable<any> {
    const newContact = this.http.post(this.BASE_URL, contact)
    .pipe(
      tap(() => console.log(`new contact added`)),
      catchError(this._handleError<any>('addContact')),
    );
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
