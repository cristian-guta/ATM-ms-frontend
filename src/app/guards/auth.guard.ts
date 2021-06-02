import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        const userRole = this.authenticationService.getRole();
        // check if route is restricted by role
        if (route.data.roles && !route.data.roles.some(role => userRole.includes(role))) {
            // role not authorised so redirect to home page
            if (!userRole.includes('ANONYMOUS')) {
                this.authenticationService.logout();
            } else{
                this.router.navigate(['/register'], { queryParams: { returnUrl: state.url } });
            }
            return false;
        }
    

        // authorised so return true
        return true;
    }
}
