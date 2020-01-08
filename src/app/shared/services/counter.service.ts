import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class CounterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private url = environment.api + '/api';

  constructor(private http: HttpClient) {}

  getCounters() {
    return this.http.get<any>(this.url + '/v1/counters').pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  addCounter(title: string) {
    return this.http
      .post<any>(this.url + '/v1/counter', title, this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  increaseCounter(id: string) {
    return this.http
      .post<any>(this.url + '/v1/counter/inc', { id: id }, this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  decreaseCounter(id: string) {
    return this.http
      .post(this.url + '/v1/counter/dec', { id: id }, this.httpOptions)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  deleteCounter(id: string) {
    const params = new HttpParams().set('id', id);
    return this.http.delete(this.url + '/v1/counter', { params }).pipe(
      map(res => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.name === 'TimeoutError') {
      const errorObject: any = {
        status: 'NOK',
        result: {
          resultMessage: error.message,
          result: error.name
        }
      };
      return Observable.throw(errorObject);
    }
    return Observable.throw(error.error);
  }
}
