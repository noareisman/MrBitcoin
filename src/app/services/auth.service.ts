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

  // BASE_URL = '/api/auth/'//PRUDUCTION
  BASE_URL = 'http://localhost:3030/api/auth/'//development - back
  // BASE_URL = process.env.NODE_ENV === 'production'
  //   ? '/api/auth/'
  //   : 'http://localhost:3030/api/auth/'//development - back

  public loggedinUser:any=this.userService.getLoggedinUser()

  login(credentials:Credentials){
    return this.http.post<User>(this.BASE_URL+'login',credentials)
    .pipe(map(user => {
      // store user details and basic auth credentials in session storage to keep user logged in between page refreshes
      sessionStorage.setItem('loggedinUser', JSON.stringify(user));
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



