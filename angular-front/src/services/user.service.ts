import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { servicesTools } from './servicesTools';
import { User } from '../interface/user.model';
import { GenericResponse } from '../interface/generic';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends servicesTools {

  constructor(private http: HttpClient) {
    super();
  }
  getAll(): Observable<GenericResponse> {
    return this.http
      .get<GenericResponse>(`${environment.API_URL}/api/user`, this.getHttpOptions())
      .pipe(
        map((res: GenericResponse) => {
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  getById($id: string): Observable<GenericResponse> {
    return this.http
      .get<GenericResponse>(`${environment.API_URL}/api/user/${$id}`, this.getHttpOptions())
      .pipe(
        map((res: GenericResponse) => {
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  create($user: User): Observable<GenericResponse> {
    return this.http
      .post<GenericResponse>(`${environment.API_URL}/api/user`, $user, this.getHttpOptions())
      .pipe(
        map((res: GenericResponse) => { return res; }),
        catchError((err) => this.handlerError(err))
      );
  }

  update($user: any, $id: string): Observable<GenericResponse> {
    return this.http
      .put<GenericResponse>(`${environment.API_URL}/api/user/${$id}`, $user, this.getHttpOptions())
      .pipe(
        map((res: GenericResponse) => { return res; }),
        catchError((err) => this.handlerError(err))
      );
  }

  delete($id: string): Observable<GenericResponse> {
    return this.http
      .delete<GenericResponse>(`${environment.API_URL}/api/user/${$id}`, this.getHttpOptions())
      .pipe(
        map((res: GenericResponse) => { return res; }),
        catchError((err) => this.handlerError(err))
      );
  }
}
