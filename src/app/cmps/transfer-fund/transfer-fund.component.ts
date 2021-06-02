import { Component, Input, OnInit, EventEmitter,Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent implements OnInit {

  constructor(private userService:UserService) { }

  @Input() contact
  @Output() transferEvent=new EventEmitter()

  amount:number
  user:User
  subscription:Subscription

  onTransfer() {
    if (this.user.coins < this.amount) return alert('You dont have coins')
    this.userService.updateUserBalance(this.contact, this.amount)
    this.transferEvent.emit()
  }

  ngOnInit(): void {
    this.subscription=this.userService.currUser$.subscribe(user=>{
      this.user=user
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
