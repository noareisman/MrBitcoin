
import {UserService} from 'src/app/services/user.service';
import {BitcoinService} from 'src/app/services/bitcoin.service'
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Credentials } from 'src/app/models/credentials.model';
import { MoveService } from 'src/app/services/move.service';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user:any
  ratePrm:any
  moves:Move[]
  userSubscription:Subscription
  userMovesSubscription:Subscription


  constructor(
    private userService: UserService,
    private bitcoinService: BitcoinService,
    private moveService:MoveService

  ) { }


  ngOnInit(): void {
    this.ratePrm= this.bitcoinService.getRate()
    this.bitcoinService.getMarketPrice()
    
    this.userSubscription=this.userService.currUser$.subscribe(user=>{
      console.log('currUser:',user)
      this.user=user
    })
    
    this.moveService.updateUserMoves(this.user._id)
    this.userMovesSubscription= this.moveService.userMoves$
    .subscribe(moves=>{
      this.moves = moves.filter((move) => {
        return (move.to._id === this.user._id|| move.from._id === this.user._id)})
      
    }
   )
    
  }
}