  // export interface Move {
  //   toId: string,
  //   to: string,
  //   at: number,
  //   amount: number
  // }
  export class Move {
    constructor(
        public from:{_id: string,
                  fullname: string},
        public to:{_id: string,
                  fullname: string},
        public at: number=Date.now(),
        public amount: number=0,
        public _id?:string
        ){}
  }