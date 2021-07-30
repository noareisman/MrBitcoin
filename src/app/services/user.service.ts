import { UtilService } from './util.service'
// import { asyncStorageService } from './async-storage.service'
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models/credentials.model';
import { catchError, filter, tap, toArray } from 'rxjs/operators';
import { MoveService } from './move.service';
import { Move } from '../models/move.model';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private utilService: UtilService,
    private http: HttpClient,
    private moveService: MoveService
  ) { }

  // BASE_URL = '/api/user/'//PRODUCTION
  BASE_URL = 'http://localhost:3030/api/user/'//development - back

  // private user: User = this._loadUser(this.USER_KEY, this.defaultUser)
  // private user: User = this._loadUser(this.USER_KEY)
  public user: User = this.getLoggedinUser()
  private _currUser$ = new BehaviorSubject<User>(this.user)//service workes with this
  public currUser$ = this._currUser$.asObservable()//component subscribes to this

  private _users$ = new BehaviorSubject<User[]>([])
  public users$ = this._users$.asObservable()

  private _filteredUsers$ = new BehaviorSubject<User[]>([])
  public filteredUsers$ = this._filteredUsers$.asObservable()

  private _filterBy$ = new BehaviorSubject({ term: '' })
  public filterBy$ = this._filterBy$.asObservable()

  private _userMoves$ = new BehaviorSubject<Move[]>([])
  public userMoves$ = this._userMoves$.asObservable()

  currContactToUpdate:User

  error = new Subject<string>()

  defaultUserCredentials: Credentials = {
    username: 'Demo User',
    password: '123',
  }

  setCurrUser(user) {
    this.user = user
    this._currUser$.next(user)
  }

  getLoggedinUser(){
    let user = JSON.parse(sessionStorage.getItem('loggedinUser'));
    return user
  }

  // _loadUser(key): User {
  // // _loadUser(key, defaultValue): User {
  //   let user = this.utilService.loadFromStorage(key)
  //   if (!user) {
  //     console.log('No user logged in - loading default user for demo');
  //     // user = defaultValue
  //     this.authService.login(this.defaultUserCredentials)
  //     user = this.authService.loggedinUser
  //     console.log(user);      
  //     this.utilService.saveToStorage(this.USER_KEY, user)
  //     this.user = user
  //   }
  //   return user
  // }

  updateUserContactList(contactList) {
    this.user.contactList = contactList
    this._updateUser(this.user).subscribe(updatedUser => {
      this.user = updatedUser
      this._currUser$.next(this.user)//NEEDED????????
    })
  }
  // isUsernameValid(username){
  //   return (!this.users.includes(username))
  // }

  isValidEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'isEmailForbidden': true })
        } else {
          resolve(null)
        }
      }, 1500)
    })
    return promise
  }

  // signUp(username,password,fullname):string {
  //   if (!this.isUsernameValid(username)) return "This username is already taken, try to register with another username"
  //   const newUser:User = {
  //     username,
  //     password,
  //     fullname,
  //     coins: 100,
  //     moves: [],
  //     _id: this.utilService.makeId()
  //   }
  //   this.users.unshift(newUser)
  //   localStorage.setItem('user', JSON.stringify(newUser))
  //   this.user=newUser
  //   this.updateUser()
  //   return `Wellcome ${newUser.username}!`
  // }


  updateUserBalance(amount) {
    this.user.coins -= amount
    console.log('updating user coins:',this.user,amount);
    this._updateUser(this.user).subscribe(updatedUser => {
      this.user = updatedUser
      this._currUser$.next(this.user)//NEEDED????????
    })
  }
  updateContactBalance(amount,user) {
    if (user){
      user.coins += amount
      console.log('updating contact coins:',user,amount);
      
      this._updateUser(user).subscribe()
    }
  }
  // updateContactBalance(amount,contact) {
  //    return// in case a new user was added to contact list with out a real user registered to the app by those details
  //   this.getUserById(contact._id).subscribe(user=>{
  //     user.coins += amount
  //     this.currContactToUpdate=user
  //   })
  //   this._updateUser(user).subscribe()})
  // }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE_URL)
      .pipe(
        tap(() => console.log('fetched users')),
        catchError(this._handleError<User[]>('getUsers', []))
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

  public setFilter(filterBy) {
    this._filterBy$.next(filterBy)
    console.log(this._filterBy$);
    
    this.getFilteredUsers()
  }

  // public getFilteredUsers() {
  //   this.getUsers()
  //   .subscribe((users) => {
  //     const filterBy = this._filterBy$.getValue()
  //     console.log(users);

  //     // const filteredUsers = this._filter(users, filterBy.term)
  //     // this._users$.next(this._sort(filteredUsers))
  //     this._users$.next(users)

  //   }, error => this.error.next(error.message))

  // }


  // public getFilteredUsers(): Observable<User[]> {
  //   const filterBy = this._filterBy$.getValue()
  //   if (!filterBy) {
  //     this.getUsers()
  //   } else {
  //     const filterBy = this._filterBy$.getValue()
  //     const options = { params: new HttpParams().set('fullname', filterBy.term) }
  //     return this.http.get<User[]>(this.BASE_URL, options)
  //       .pipe(
  //         tap((users) => console.log('fetched users:',users)),
  //         catchError(this._handleError<User[]>('getUsers', []))
  //       )
  //   }
  // }
  public getFilteredUsers(): any{
    const filterBy = this._filterBy$.getValue()
    console.log('filterBy value',filterBy);
    console.log('filterBy.term',filterBy.term);
    
    if (!filterBy) {
      this.getUsers()
      .subscribe(users=>this._filteredUsers$.next(users))
    } else {
      const options = { params: new HttpParams().set('fullname', filterBy.term) }
      this.http.get<User[]>(this.BASE_URL, options)
        .pipe(
          tap((users) => console.log('fetched users:',users)),
          catchError(this._handleError<User[]>('getUsers', []))
        )
        .subscribe(users=>this._filteredUsers$.next(this._sort(users)))
    }
  }

  
  private _filter(users, term = '') {
    term = term.toLocaleLowerCase()
    return users.filter(user => {
      return user.fullname.toLocaleLowerCase().includes(term)
    })
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.BASE_URL + id)
      .pipe(
        tap(() => console.log(`fetched user id=${id}`)),
        catchError(this._handleError<User>(`getUserById ${id}`))
      )
  }

  // public removeUser(id: string) {
  //   return this.http.delete<User>(this.BASE_URL + id)
  //     .pipe(
  //       tap(() => console.log(`deleted contact id=${id}`)),
  //       catchError(this._handleError<User>(`deleteHero`)),
  //     )
  // }

  public saveUser(user: User) {
    return user._id ? this._updateUser(user) : this._addUser(user)
  }

  private _updateUser(user: User): Observable<any> {
    const updatedUser = this.http.put<User>(this.BASE_URL + user._id, user)
      .pipe(
        tap(() => console.log(`updated user id=${user._id}`)),
        catchError(this._handleError<any>('updateUser')),
      )
    return updatedUser
  }

  private _addUser(user: User): Observable<any> {
    const newUser = this.http.post(this.BASE_URL, user)
      .pipe(
        tap(() => console.log(`new user added`)),
        catchError(this._handleError<any>('addUser')),
      );
    return newUser
  }

  private _sort(users: User[]): User[] {
    return users.sort((a, b) => {
      if (a.fullname.toLocaleLowerCase() < b.fullname.toLocaleLowerCase()) {
        return -1;
      }
      if (a.fullname.toLocaleLowerCase() > b.fullname.toLocaleLowerCase()) {
        return 1;
      }
      return 0;
    })
  }
}




