import { AccountInformationComponent } from './modals/account-information/account-information.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router, NavigationEnd, ActivatedRoute, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { SocialAuthService } from 'angularx-social-login';
import { TokenService } from './services/token.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent{
    title = 'ATM - Project';
    currentUser: Observable<any>;
    loginOrRegister = false;
    loggedIn: boolean;


    constructor(
        private _auth: AuthenticationService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _title: Title,
        private _modal: BsModalService,
        private authService: SocialAuthService,
        private tokenService: TokenService
    ) {
        this.currentUser = this._auth.currentUser;

        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => {
                let child = this._route.firstChild;
                while (child.firstChild) {
                    child = child.firstChild;
                }
                if (child.snapshot.data.title) {
                    return child.snapshot.data.title + ' - ' + this.title;
                }
                return this.title;
            })
        ).subscribe((title: string) => {
            if (title.indexOf('Login') > -1 || title.indexOf('Register') > -1) {
                this.loginOrRegister = true;
            } else {
                this.loginOrRegister = false;
            }
            this._title.setTitle(title);
        });
        
    }

    isAdmin() {
        return this._auth.getRole().includes('ADMIN');
    }

    isUser(){
        return this._auth.getRole().includes('ROLE');
    }

    checkCurrentUser(){

        if(this.currentUser){
            return true;
        }
        else{
            this._auth.currentUser.subscribe(user => {
                this.currentUser = user;
            });
            return true;
        }
        return false;
    }

    openAccountInfoModal() {
        this._modal.show(AccountInformationComponent, { initialState: { isModal: true } });
    }

    // logout() {
    //     this._auth.logout();
    // }

    logout(): void {
        this._auth.logout();
        this.authService.signOut().then(
            data => {
              this.tokenService.logOut();
              this.loggedIn = false;
            }
        );
    }


    
}