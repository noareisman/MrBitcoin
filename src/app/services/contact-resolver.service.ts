import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable,of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactResolverService implements Resolve<any> {

  constructor(private contactService: ContactService) { }

  async resolve(route:ActivatedRouteSnapshot) {
    const{id}=route.params

    console.log('id',id);
    const contact=await this.contactService.getContactById(id)
    console.log(contact);
    
    // const tempcontact=
    //   {
    //     "_id": "5a56640269f443a5d64b32ca",
    //     "name": "Ochoa Hyde",
    //     "email": "ochoahyde@renovize.com",
    //     "phone": "+1 (968) 593-3824"
    // }
    
    
    // const contact= of({...tempcontact})
    // console.log('resolver fetched contact:',contact);
    return contact
  }
}
