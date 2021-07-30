import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(
    private userService:UserService,
    private router: Router,
    private authService:AuthService,
  ) { }
  user:User=null
  
  faEllipsisV=faEllipsisV
  faSearch=faSearch
  faAddressBook=faAddressBook
  isOpenDropdown=false;
  
  onOpenContactList(){
    this.router.navigateByUrl('/main/mobileContactList')
  }
  onOpenSearchMembers(){
    this.router.navigateByUrl('/users')
  }
  onOpenDropdown(){
    this.isOpenDropdown=!this.isOpenDropdown
  }

  async logout() {
    this.onOpenDropdown()
    await this.authService.logout()
    console.log('loginCmp.user',this.user)
    this.user = null
  }

  ngOnInit(): void {
    this.userService.currUser$
    .subscribe((user)=>this.user=user)
  }

}
