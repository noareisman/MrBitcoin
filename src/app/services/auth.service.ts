import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials } from '../models/credentials.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private http:HttpClient,
    private userService:UserService
    ) { }

  BASE_URL = '/api/auth/'//פ\PRODUCTION
  // BASE_URL = 'http://localhost:3030/api/auth/'//development - back
  // BASE_URL = process.env.NODE_ENV === 'production'
  //   ? '/api/auth/'
  //   : 'http://localhost:3030/api/auth/'//development - back

  public loggedinUser:any=null
  // {
  //   _id: '123',
  //   username: 'Demo User',
  //   fullname: 'Demo User',
  //   coins: 100,
  //   password: '123',
  //   moves: [
  //     {
  //       toId: "d99e3u2ih329",
  //       to: "Moshiko",
  //       at: 2652712571,
  //       amount: 1
  //     },
  //     {
  //       toId: "5a566402abb3146207bc4ec5",
  //       to: "Floyd Rutledge",
  //       at: 2652702571,
  //       amount: 2
  //     },
  //     {
  //       toId: "5a566402ed1cf349f0b47b4d",
  //       to: "Rachel Lowe",
  //       at: 2652701571,
  //       amount: 3
  //     },
  //     {
  //       toId: "5a566402abb3146207bc4ec5",
  //       to: "Floyd Rutledge",
  //       at: 2652700571,
  //       amount: 1
  //     },
  //     {
  //       toId: "5a56640269f443a5d64b32ca",
  //       to: "Ochoa Hyde",
  //       at: 2652700471,
  //       amount: 2
  //     },
  //     {
  //       toId: "5a5664025f6ae9aa24a99fde",
  //       to: "Hallie Mclean",
  //       at: 2652700071,
  //       amount: 6
  //     },
  //     {
  //       toId: "5a56640252d6acddd183d319",
  //       to: "Parsons Norris",
  //       at: 2652612571,
  //       amount: 2
  //     },
  //     {
  //       toId: "5a566402a6499c1d4da9220a",
  //       to: "Shana Pope",
  //       at: 2652512571,
  //       amount: 2
  //     },
  //     {
  //       toId: "5a566402abce24c6bfe4699d",
  //       to: "Dominique Soto",
  //       at: 2652412571,
  //       amount: 3.5
  //     },
  //     {
  //       toId: "5a566402abce24c6bfe4699d",
  //       to: "Dominique Soto",
  //       at: 2652312571,
  //       amount: 2
  //     },
  //     {
  //       toId: "5a566402abb3146207bc4ec5",
  //       to: "Floyd Rutledge",
  //       at: 2652212571,
  //       amount: 3
  //     }
  //   ]
  // }

  
  login(credentials:Credentials){
    return this.http.post<User>(this.BASE_URL+'login',credentials)
    .pipe(map(user => {
      // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
      // localStorage.setItem('user', JSON.stringify(user));
      console.log('got User:',user);
      this.loggedinUser=user
      this.userService.setCurrUser(user);
      return user}),
      catchError(this._handleError))
    }
    
    logout(){
      this.http.post(this.BASE_URL+'logout',this.loggedinUser)
      .pipe(catchError(this._handleError))
      this.loggedinUser=null
      this.userService.setCurrUser(null);
  }

  signUp(credentials:Credentials):Observable<any>{
    return this.http.post<string>(this.BASE_URL+'signup',credentials)
    .pipe(catchError(this._handleError))
    // .subscribe((userId)=>userId)
  }

  private _handleError(errorRes:HttpErrorResponse){
    let errorMsg='Error!'
      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMsg)
      }else{
        errorMsg=errorRes.error.error.message
        return throwError(errorMsg)
      }
  }
}



