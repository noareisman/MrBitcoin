import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  constructor( private userService: UserService) { }

  public filterBy
  private subscription: Subscription
  faSearch=faSearch

  onSetFilter(){
    this.userService.setFilter(this.filterBy)
    
  }

  ngOnInit(): void {
    this.subscription= this.userService.filterBy$.subscribe(filterBy=>{
      this.filterBy=filterBy
    })
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }
}