import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
  constructor(
    private socketService: SocketService,
    private userService: UserService
  ) { }
  loggedinUser: any = null;

  ngOnIninit(): void {
    this.socketService.terminate()
    this.userService.currUser$.subscribe((currUser) => {
      this.loggedinUser = currUser
      if (currUser) {
        this.socketService.setup()
      }else{
        this.socketService.terminate()
      }
    })
  }

}
