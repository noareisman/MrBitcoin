import { Component, Input, OnInit, EventEmitter,Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Move } from 'src/app/models/move.model';
import { User } from 'src/app/models/user.model';
import { MoveService } from 'src/app/services/move.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent implements OnInit {

  constructor(
    private userService:UserService,
    private moveService:MoveService) { }

  @Input() contact
  @Output() transferEvent=new EventEmitter()

  amount:number
  user:User
  contactUserSubscription:Subscription
  contactUser:User=null
  // lastMove:Move

  async onTransfer() {
    if (this.amount <= 0) return
    if (this.user.coins < this.amount) return alert('You don\'t have coins')    
    const move = {
      to: {
        fullname: this.contact.name,
        _id: this.contact._id,
        },
      from: {
        fullname: this.user.fullname,
        _id: this.user._id
        },
      at: Date.now(),
      amount:this.amount
    }
    console.log(move);
    // let contactUser=(this.contact._id.includes("localId"))? this.userService.getUserById().subscri
    await this.moveService.saveMove(move).subscribe(move=>{
      console.log('returned move',move)
      this.userService.updateUserBalance(move.amount)
      this.userService.updateContactBalance(move.amount,this.contactUser)
      this.moveService.updateUserMoves(this.user._id)
    })
    
    this.transferEvent.emit()
    this.amount=null
  }
  
  ngOnInit(): void {
    this.user=this.userService.user
    if(!this.contact._id.includes("localId")){
      this.contactUserSubscription=this.userService.getUserById(this.contact._id)
      .subscribe(contactUser=>
        this.contactUser=contactUser
      )
    }
  }

  ngOnDestroy() {
    if(this.contactUserSubscription){
      this.contactUserSubscription.unsubscribe()
    }
  }

}
