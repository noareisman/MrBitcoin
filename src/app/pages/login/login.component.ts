import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Credentials } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserPipe } from '../user.pipe';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  isLoggedin: boolean = null
  user: any = null
  subIsLoggedin: Subscription
  subUser: Subscription

  errorMsg: string = null
  isLoading: boolean = false

  signupCredentials: Credentials = {
    username: '',
    password: '',
    fullname: ''
  }
  loginCredentials: Credentials = {
    username: '',
    password: '',
  }

  @ViewChild('loginForm') loginForm: NgForm

  defaultUserCredentials: Credentials = {
    username: 'Demo User',
    password: '123',
  }

  async useDemoUser() {
    this.loginCredentials=this.defaultUserCredentials
    this.login()
  }

  async signUp() {
    this.isLoading = true
    await this.authService.signUp(this.signupCredentials)
      .subscribe(
        (userId) => {
          this.isLoading = false
          console.log(`user ${this.signupCredentials} signed up sucssesfully and got id: ${userId}`)
          this.loginCredentials.username = this.signupCredentials.username,
          this.loginCredentials.password = this.signupCredentials.password
          this.login()
          this.router.navigateByUrl('/main/user')
        },
        (errorMsg) => {
          this.isLoading = false
          console.log(`Error while trying to signup ${this.signupCredentials}: ${errorMsg}`)
          this.errorMsg = 'Error- could not signup!'
        })
  }

  async login() {
    this.subIsLoggedin = await this.authService.login(this.loginCredentials)
      .subscribe(() => {
        this.isLoggedin = true
        this.router.navigateByUrl('/main/user')
      })
  }

  async logout() {
    await this.authService.logout()
    console.log('loginCmp.user',this.user)
    this.isLoggedin = false
  }

  ngOnInit(): void {
    this.subUser = this.userService.currUser$.subscribe(user => {
      this.isLoggedin = !!user
      this.user = user
    })
  }

  ngOnDestroy(){
    if (this.subIsLoggedin) this.subIsLoggedin.unsubscribe()
    this.subUser.unsubscribe()
  }

}
