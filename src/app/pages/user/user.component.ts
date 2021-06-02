
import {UserService} from 'src/app/services/user.service';
import {BitcoinService} from 'src/app/services/bitcoin.service'
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Credentials } from 'src/app/models/credentials.model';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user:any
  ratePrm:any
  subscription:Subscription


  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService,
    private authService:AuthService
  ) { }


  ngOnInit(): void {
    // if(!this.authService.loggedinUser) this.useDemoUser()
    this.ratePrm= this.bitcoinService.getRate()
    this.bitcoinService.getMarketPrice()
    
    this.subscription=this.userService.currUser$.subscribe(user=>{
      console.log('currUser:',user)
      this.user=user      

    })
    
  }
}