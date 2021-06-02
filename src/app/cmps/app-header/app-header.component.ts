import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(
    private userService:UserService
  ) { }
  user:User=null

  ngOnInit(): void {
    this.userService.currUser$
    .subscribe((user)=>this.user=user)
  }

}
