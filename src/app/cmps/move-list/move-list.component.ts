import { Component, OnInit, Input } from '@angular/core';
import { Move } from 'src/app/models/move.model';


@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {

  constructor() { }
  @Input() moves: Move[]

  trackByFn(idx,move:Move){
    return move
  }

  ngOnInit(): void {
    
  }

}
