import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, of } from 'rxjs';

export const errInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log(err);
      
      //işliyorsunuz

      return of();
    })
  );
};
