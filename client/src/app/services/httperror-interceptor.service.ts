import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttperrorInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.setError(error);
        this.toastr.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  setError(error: HttpErrorResponse): string {

    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // client side error handling
      errorMessage = error.error.message;
    } else {
      // server side error handling
      if (error.status === 401) {
        return "Unauthorized";
      }
      if (error.error.errorMessage && error.status !== 0) {
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }
}
