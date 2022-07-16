import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
    constructor(
        private snackbar: MatSnackBar,
    ) {
    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const errorDetail = error.error.detail ? error.error.detail : error.error;

                this.snackbar.open(errorDetail, '', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                })
                return throwError(error);
            })
        );
    }
}