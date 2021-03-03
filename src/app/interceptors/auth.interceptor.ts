import { Injectable, Optional } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { OAuthEvent } from 'angular-oauth2-oidc';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _router: Router,
        private _auth: AuthenticationService,
        private tokenService: TokenService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        var token = this._auth.getToken();
        if(!token){
            token = this.tokenService.getToken();
        }
        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(request).pipe(tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    this._router.navigate(['/login'], { queryParams: { returnUrl: this._router.url } });
                }
            }));
    }

}
