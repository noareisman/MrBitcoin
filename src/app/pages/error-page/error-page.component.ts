import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  errorMsg:string;

  ngOnInit(): void {
    this.errorMsg=this.route.snapshot.data['msg']

  }

}
