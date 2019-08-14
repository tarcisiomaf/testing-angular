import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {Person} from '../../models/Person';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = 'https://localhost:3000/people';

@Injectable({
  providedIn: 'root'
})

export class PeopleService {

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  find(): Observable<Person[]> {
    return this.http.get<Person[]>(apiUrl)
      .pipe(
        catchError(this.handleError('get', []))
      );
  }

  findById(id: number): Observable<Person> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Person>(url).pipe(
      catchError(this.handleError<Person>(`get id=${id}`))
    );
  }

  add(data: Person): Observable<Person> {
    return this.http.post<Person>(apiUrl, data, httpOptions).pipe(
      catchError(this.handleError<Person>('add'))
    );
  }

  update(id: any, data: Person): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions).pipe(
      catchError(this.handleError<any>(`update ${data.id} `))
    );
  }

  remove(id: any): Observable<Person> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Person>(url, httpOptions).pipe(
      catchError(this.handleError<Person>(`remove ${id}`))
    );
  }
}
