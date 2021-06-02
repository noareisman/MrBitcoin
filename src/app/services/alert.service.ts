import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  private subject = new Subject<Object>();
  public onAlert(): Observable<Object> {
    return this.subject.asObservable();
  }

  public success(txt:string) {
    this.alert({ type: 'success', txt });
  }

  public failed(txt:string) {
    this.alert({ type: 'error', txt });
  }

  alert(alert) {
    this.subject.next(alert);
  }
}