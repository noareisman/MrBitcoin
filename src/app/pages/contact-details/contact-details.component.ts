import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators'
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { Move } from 'src/app/models/move.model';
import { User } from 'src/app/models/user.model';
import { MoveService } from 'src/app/services/move.service';
import { ContactListService } from 'src/app/services/contact-list.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact$: Observable<Contact>
  contact: Contact
  contactMoves: Move[]
  contactSubscription: Subscription
  userSubscription: Subscription
  movesSubscription: Subscription
  user: User
  contactImg: any
  contactId: string
  error: string

  faEdit = faEdit
  faTimes = faTimes
  faTrashAlt = faTrashAlt
  faChevronRight=faChevronRight
  faChevronLeft=faChevronLeft


  constructor(
    // private contactService: ContactService,
    private contactListService: ContactListService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private moveService: MoveService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  async onRemoveContact() {
    await this.contactListService.removeContact(this.contact._id)
    await this.contactListService.getFilteredContacts()
    this.router.navigateByUrl('/main/user')
  }

  
  animateTransfer() {
    this.contactImg = "../../assets/imgs/bitcoinGif.gif"
    setTimeout(() => {
      this.contactImg = 'https://i.pravatar.cc/150?u=' + this.contact._id
    }, 3020);

  }

  switchContact(diff){
    const contactIdx=this.user.contactList.findIndex(contact=>this.contact._id===contact._id)
    var moveToIdx=contactIdx+diff
    console.log(moveToIdx);
    if (moveToIdx>this.user.contactList.length-1) moveToIdx=0
    console.log(moveToIdx);
    if (moveToIdx<0) moveToIdx=this.user.contactList.length-1
    console.log(moveToIdx);
    console.log(this.user.contactList);
    console.log(this.user.contactList[moveToIdx]);
    
    const contactId=this.user.contactList[moveToIdx]._id
    this.router.navigateByUrl(`/main/contact/${contactId}`)
  }

  ngOnInit(): void {

    //option 7:
    // this.contact$=this.route.paramMap.pipe(
    //   switchMap((params:ParamMap)=>
    //   this.contactService.getContactById(params.get('id')))
    // )
    // console.log('id params:',contactId);

    // this.getContact(contactId)
    //working part//
    const contactId = this.route.snapshot.paramMap.get('id') //Witout Observable on the params
    // const contactId = this.route.snapshot.params.id //Witout Observable on the params
    this.contactId = contactId

    this.contact=this.contactListService.getContactById(contactId)
    this.contactImg = 'https://i.pravatar.cc/150?u=' + this.contact._id

    //end of working part

    // this.contactSubscription = this.route.data.subscribe(data => {
    //     console.log('data',data.contact.source._value)
    //     this.contact = data.contact.source._value//as object
    //     // this.contact = data.contact
    //     console.log('contact - detail',this.contact);
    //   })

    //   this.contactSubscription=this.route.params.pipe(
    //     mergeMap(params=> this.contactService.getContactById(params.id))
    //     ).subscribe(contact=>{
    //       this.contact=contact
    //       this.contactImg = 'https://i.pravatar.cc/150?u=' + this.contact._id
    // })

    this.userSubscription = this.userService.currUser$.subscribe(user => this.user = user)
    
    this.moveService.updateUserMoves(this.user._id)
    this.movesSubscription= this.moveService.userMoves$
    .subscribe(moves=>{
      this.contactMoves = moves.filter((move) => {
        return (move.to._id === this.route.snapshot.params.id|| move.from._id === this.route.snapshot.params.id)})
      })
  }

  ngOnDestroy() {
    // this.contactSubscription.unsubscribe()
    this.movesSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

}
