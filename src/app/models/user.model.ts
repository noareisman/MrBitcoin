import {Move} from './move.model'
import {Contact} from './contact.model'

// export interface User {
//   _id: string
//   username: string
//   password?:string
//   fullname:string
//   coins: number
//   moves:Array<Move>

// }

export class User {

  constructor(
    public _id?: string,
    public phone:string='',
    public email:string='',
    public username: string='',
    public password:string='',
    public fullname:string='',
    public coins: number=0,
    public contactList:Array<Contact>=[]
    ) {
  }
}