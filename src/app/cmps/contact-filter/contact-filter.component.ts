import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactListService } from 'src/app/services/contact-list.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
})
export class ContactFilterComponent implements OnInit {

  public filterBy
  private subscription: Subscription

  constructor( private contactListService: ContactListService) { }

  onSetFilter(){    
    this.contactListService.setFilter(this.filterBy)
  }

  ngOnInit(): void {
    this.subscription= this.contactListService.filterBy$.subscribe(filterBy=>{
      this.filterBy=filterBy
    })
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe()
  }

}
