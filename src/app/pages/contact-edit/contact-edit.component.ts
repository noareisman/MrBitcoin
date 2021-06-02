import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { ContactListService } from 'src/app/services/contact-list.service';


@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contact: Contact;
  subscription: Subscription;
  faUserPlus = faUserPlus;

  constructor(
    private contactListService: ContactListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async onSaveContact(editForm: NgForm) {
    const savedContact= await this.contactListService.saveContact(this.contact)
        this.router.navigateByUrl(`/main/contact/${savedContact._id}`)
      
  }

  ngOnInit(): void {

    //TODO: check why "{}" appears in the data - suppose to present alternative to the merge map used below - might be because I was trying to access the ActivatedRoute from a Component which is outside the <router-outlet>. 
    // this.route.data.subscribe(data => {
    //   if (!Object.keys(data).length) {
    //     this.contact = new Contact()
    //   } else {
    //     this.contact = data.contact
    //   }
    // })
    // This is an ugly syntax of rxjs: operator(operatorFunction)(sourceObservable)
  // mergeMap((params: Params) =>
  //     params.id ? this.contactListService.getContactById(params.id) : of(new Contact()))(this.route.params)
  //     .subscribe(contact => this.contact = contact)
  // }
  
  this.route.params.subscribe(params=>{
     this.contact=params.id ? this.contactListService.getContactById(params.id) : new Contact()
    console.log(this.contact)
  })
}

}
