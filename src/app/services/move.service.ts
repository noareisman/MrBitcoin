import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Move } from '../models/move.model';
import { UserService } from './user.service';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  constructor(
    private http: HttpClient,
  ) { }

  BASE_URL = 'http://localhost:3030/api/move/'//development - back

  private _userMoves$ = new BehaviorSubject<Move[]>([])
  public userMoves$ = this._userMoves$.asObservable()

  private _filterBy$ = new BehaviorSubject({ term: '' })
  public filterBy$ = this._filterBy$.asObservable()

  public getMoves(): Observable<Move[]> {
    return this.http.get<Move[]>(this.BASE_URL)
      .pipe(
        tap(() => console.log('fetched moves')),
        catchError(this._handleError<Move[]>('getUsers', []))
        )
      }
      
      
  public getUserMoves(userId:string): Observable<Move[]> {
    const options = {params: new HttpParams().set('userId', userId) };
    return this.http.get<Move[]>(this.BASE_URL,options)
      .pipe(
        tap(() => console.log('fetched moves')),
        catchError(this._handleError<Move[]>('getUsers', []))
      )
  }

  public updateUserMoves(userId){
    this.getUserMoves(userId)
    .subscribe((moves)=>{
      this._userMoves$.next(this._sort(moves))
    })
  }

  private  _sort(moves: Move[]): Move[] {
    return moves.sort((a, b) => {
      if (a.at > b.at) {
      return -1;
    }
    if (a.at < b.at) {
        return 1;
      }
      return 0;
    })
  }

  public saveMove(move:Move) {
    return move._id ? this._updateMove(move) : this._addMove(move)
  }

  private _updateMove(move:Move): Observable<any> {
    const updatedMove = this.http.put<Move>(this.BASE_URL + move._id, move)
      .pipe(
        tap(() => console.log(`updated move id=${move._id}`)),
        catchError(this._handleError<any>('updateMove')),
      )
    return updatedMove
  }

  private _addMove(move:Move): Observable<any> {
    const newMove = this.http.post(this.BASE_URL, move)
      .pipe(
        tap(() => console.log(`new move added:`,move)),
        catchError(this._handleError<any>('addMove')),
      );
    return newMove
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