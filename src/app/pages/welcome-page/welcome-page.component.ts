import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private userService:UserService,
    private router:Router
  ) { }

  isLoggedin:boolean=null
  user:any=null
  subIsLoggedin:Subscription
  subUser:Subscription

  async login(){
    if (this.isLoggedin) return this.router.navigateByUrl('/main/user')
    
    console.log('trying to login');
    this.subIsLoggedin=await this.authService.login({username:'Demo User',password:'123'})
    .subscribe(user=>{
    console.log('got user:',user,'type', typeof(user));
    this.isLoggedin=true
    this.router.navigateByUrl('/main/user')
    })    
  }
  
  ngOnInit(): void {
    console.log('welcome page starts with - authService.loggedinUser=',this.authService.loggedinUser,'userService.currUser$=',this.userService.currUser$);
    console.log(this.isLoggedin);
    
    this.subUser=this.userService.currUser$.subscribe((user)=>{
      this.isLoggedin=!!user
      console.log('welcomePage.isLoggedin=',this.isLoggedin);
      this.user=user
      console.log('welcomePage.user', this.user)
    })
  }

  ngOnDestroy(){
    if (this.subIsLoggedin) this.subIsLoggedin.unsubscribe()
    this.subUser.unsubscribe()
  }
}

