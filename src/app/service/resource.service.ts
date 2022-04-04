import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, flatMap, map, mapTo, Observable, tap, throwError} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T> {
  apiUrl = environment.apiUrl + '/' + this.getResourceUrl();

  constructor(private http: HttpClient) {
  }

  abstract getResourceUrl(): string;

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  findById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  add(resource: T): Observable<any> {
    return this.http.post(`${this.apiUrl}`, resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(resource: T) {
    return this.http.put(`${this.apiUrl}`, resource)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    //Handle the HTTP error here
    return throwError('something wrong happend');
  }

}
