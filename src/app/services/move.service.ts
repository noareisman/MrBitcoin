import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Move } from '../models/move.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  constructor(
    private http: HttpClient,
  ) { }

  BASE_URL = 'http://localhost:3030/api/move/'//development - back


  private _moves$ = new BehaviorSubject<Move[]>([])
  public moves$ = this._moves$.asObservable()



  private _filterBy$ = new BehaviorSubject({ term: '' })
  public filterBy$ = this._filterBy$.asObservable()

  public getMoves(): Observable<Move[]> {
    return this.http.get<Move[]>(this.BASE_URL)
      .pipe(
        tap(() => console.log('fetched moves')),
        catchError(this._handleError<Move[]>('getUsers', []))
      )
  }


  private _handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO: send error to log file
      // TODO: better job of transforming error for user consumption
      console.log(`error while trying to ${operation}:`, error.message);
      return of(result as T);// Let the app keep running by returning an empty result.
    };
  }
}