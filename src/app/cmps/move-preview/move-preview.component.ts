import { Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/app/models/move.model';

@Component({
  selector: 'move-preview',
  templateUrl: './move-preview.component.html',
  styleUrls: ['./move-preview.component.scss']
})
export class MovePreviewComponent implements OnInit {

  constructor() { }

  @Input() move:Move
    
  ngOnInit(): void {
  }

}
