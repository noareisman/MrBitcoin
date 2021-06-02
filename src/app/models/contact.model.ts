export class Contact {

    constructor(public _id: string=null, public name: string = '', public email: string = '', public phone: string = '') {

    }

    setId?() {
        // Implement your own set Id
        // this._id = makeId()
    }
}