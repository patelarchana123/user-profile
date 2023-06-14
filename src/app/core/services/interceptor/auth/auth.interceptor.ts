import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { Messages, MessageTitles } from '../../../models/interceptor.model';
import { LoaderService } from '../../loader/loader.service';

/**
 * provides the global error handling using HttpInterceptor.
 * And interceptor that appends auth token to every outgoing requests.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /** the message for toaster. */
  private message!: string;
  /** the message Title for toaster. */
  private messageTitle!: string;
  toaster: any;
  constructor(
    // private toaster: ToastrService,
    private authService: AuthService,
    private _ls : LoaderService,
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<object>
    | HttpUserEvent<object>
    | HttpEvent<any>
  > {
    const token: string = this.authService.getAuthorizationHeaderValue();

    if (token !== '') {
      request = request.clone({
        setHeaders: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Authorization: `${token}`,
        },
      });
    }

    return next.handle(request).pipe(

      catchError((errorResponse: HttpErrorResponse) => {


        let message: string = '';
        message = Messages.MessageForCommonError;
        this.messageTitle = MessageTitles.Error;

        if (errorResponse && errorResponse.error instanceof ErrorEvent) {
          message = `Error: ${errorResponse && errorResponse.error}`;
        } else {
          message = `${
            errorResponse && errorResponse.error && errorResponse.error.message
          }`;
          switch (errorResponse.status) {
            case 400:
              message = errorResponse.error.error;
              break;
            case 401:
              message = Messages.MessageForUnauthorizedToken;
              this.authService.logout();
              break;
            case 403:
              message = Messages.MessageForUnauthorized;
              break;
            case 500:
              message = Messages.MessageForInternalServerError;
              break;
            default:
              message = errorResponse.error ? errorResponse.error.message : '';
              break;
          }
        }

        return throwError(message);
      }),
  
      finalize(() => {
  
      })
    );
  }
}
