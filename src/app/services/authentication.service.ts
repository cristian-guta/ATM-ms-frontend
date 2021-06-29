import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RestService } from './rest.service';
import { map } from 'rxjs/operators';
import { AuthEndpoints } from '../endpoints/auth-endpoints';
import { Client } from '../models/client';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private _authEnds = new AuthEndpoints();
    private currentUserSubject: BehaviorSubject<any>;
    currentUser: Observable<any>;

    constructor(
        private _jwtHelperService: JwtHelperService,
        private _rest: RestService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.currentUserSubject = new BehaviorSubject<any>(this.decodeToken());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    get currentUserRoles(): any {
        return this.currentUserSubject.value ? this.currentUserSubject.value.role : 'ANONYMOUS';
    }

    getToken(): any {
        let token;
        if(!sessionStorage.getItem('jwt')){
            token = localStorage.getItem('jwt');
        }
        else{
            token = sessionStorage.getItem('jwt');
        }

        if(!token){
            if(!sessionStorage.getItem('AuthToken')){
                token = localStorage.getItem('AuthToken');
                console.log(token)
            }
            else{
                token = sessionStorage.getItem('AuthToken');
            }
        }
        
        return token;
    }

    removeToken(): void {
        // sessionStorage.removeItem('jwt');
        sessionStorage.clear();
        // localStorage.removeItem('jwt');
        localStorage.clear();
    }

    decodeToken(): any {
        let decodedToken = null;
        const token = this.getToken();
        try {
            decodedToken = this._jwtHelperService.decodeToken(token);
        } catch (e) {
            decodedToken = null;
        }
        return decodedToken;
    }

    getUsername(): string {
        const decodedToken = this.decodeToken();
        if (decodedToken) {
            return decodedToken.sub;
        }
        return null;
    }

    getRole(): string {
        const decodedToken = this.decodeToken();
        
        if (decodedToken && decodedToken.userRole) {
            return decodedToken.userRole;
        } else {
            return 'ANONYMOUS';
        }
    }

    successfulLogin(token, redirectTo = null, rememberMe = false): void {
        if (rememberMe) {
            localStorage.setItem('jwt', token);
        } else {
            sessionStorage.setItem('jwt', token);
        }

        const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
        let navigateTo = '/';
        if (redirectTo) {
            navigateTo = redirectTo;
        } else if (returnUrl) {
            navigateTo = returnUrl;
        }
        this.currentUserSubject.next(this.decodeToken());
        this._router.navigate([navigateTo]);
    }

    login(username: string, password: string, rememberMe: boolean): Observable<any> {
        const loginInfo: Client = {
            username,
            password
        };
        return this._rest.post(this._authEnds.login, loginInfo)
            .pipe(map(result => {
                if (result.token) {
                    this.successfulLogin(result.token, undefined, rememberMe);
                }
                return result.token;
            }));
    }

    logout(): void {
        this.removeToken();
        this.currentUserSubject.next(null);
        this._router.navigate(['/register']);
    }
}