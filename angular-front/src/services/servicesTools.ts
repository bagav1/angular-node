import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

export class servicesTools {

  public getHttpOptions(): httpOptions {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return httpOptions;
  }

  public handlerError(error: HttpErrorResponse): Observable<never> {
    console.log('Handler Error: ', error);
    let errorMessage = `{ "status": false, "data": { "status": ${error.status}, "message": "${error.message}", "status_text":"${error.statusText}" } }`;
    return throwError(errorMessage);
  }

}

export class httpOptions {
  headers: HttpHeaders | undefined;
}
