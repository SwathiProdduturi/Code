import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

import { of } from 'rxjs/observable/of';


@Injectable()
export class UserService {

  private usersUrl =  'http://localhost:49547/api/user';
  public userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { 
  }
  

  /** GET users from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }
 

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
   
  }
  
   /** PUT: update the user on the server */
   updateUser (user: User): Observable<any> {
    return this.http.post(this.usersUrl, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.Id}`), 
      ),
      catchError(this.handleError<any>('updateUser'))
    );
    
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    console.log(`UserService: ${message}`);
    
  }
}