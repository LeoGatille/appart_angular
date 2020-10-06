import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError( err => {
        if (err.status === 401) {
          this.auth.logout();
          //this.router.navigate(['/auth']);
        }
        const error = err.error.message || err.statusText;
        const errorMessage = err.error;
        return throwError(err);
      }));
  }
}
