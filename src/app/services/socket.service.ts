import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    constructor() { }

    baseUrl = '//localhost:3030'//dev
    //  baseUrl=''//prod
    socket: any

    setup() {
        this.socket = io(this.baseUrl);
        return this.socket
    }

    on(eventName: string, cb: any) {
        this.socket.off(eventName,cb)
        this.socket.on(eventName, cb)
    }
    off(eventName: string, cb:any = null) {
        if (!cb) this.socket.removeAllListeners(eventName)
        else this.socket.off(eventName, cb)
    }
    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data)
    }
    join(channel: string) {
        console.log('joining:', channel);
        this.emit('join', channel);
    }
    terminate() {
        this.socket?.disconnect()
        this.socket = null

    }
}


