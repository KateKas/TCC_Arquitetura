import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from "@angular/common/http";
import { Observable, throwError, empty } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginService } from "../main/services/login.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErroSnackbarComponent } from "../util/erro-snackbar/erro-snackbar.component";
import { IfStmt } from "@angular/compiler";

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
    constructor(
        private loginService: LoginService,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                let message = err.error.message;
                if (err.status == 200) {
                    return empty();
                }

                if (!message)
                    message =
                        "Ocorreu alguma instabilidade no sistema. Tente mais tarde.";

                this._snackBar.open(message, "", {
                    duration: 2000,
                    panelClass: "snack-error"
                });

                if (err.status === 401 || err.status === 403) {
                    // auto logout if 401 response returned from api
                    this.redirectToLogin();
                }
                console.log(err);

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }

    redirectToLogin() {
        this.loginService.logout();
        this.router.navigateByUrl("/auth/login");
    }
}
