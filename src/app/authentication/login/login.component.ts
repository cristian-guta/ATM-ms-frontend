import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { ClientService } from 'src/app/services/client.service';
import { SocialUser, SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { AuthEndpoints } from 'src/app/endpoints/auth-endpoints';
import { Client } from 'src/app/models/client';
import { RestService } from 'src/app/services/rest.service';
import { AuthProvider } from 'src/app/models/authProvider';
import { BsModalService } from 'ngx-bootstrap/modal';
import { OauthService } from 'src/app/services/oauth.service';
import { TokenService } from 'src/app/services/token.service';
import { TokenDto } from 'src/app/models/token-dto';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    validLogin = true;
    loading = false;
    loginForm: FormGroup;
    socialUser: SocialUser;
    userLogged: SocialUser;
    loggedIn: boolean;
    _authEnds = new AuthEndpoints();
    GoogleLoginProvider = GoogleLoginProvider;
    registerInfo: Client;

    constructor(
        private _authService: AuthenticationService,
        private _fb: FormBuilder,
        private clientService: ClientService,
        private authService: SocialAuthService,
        private _rest: RestService,
        private _router: Router,
        private oauthService: OauthService,
        private tokenService: TokenService
    ) { }

    ngOnInit() {
        this.loginForm = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: false
        });

        // this.authService.authState.subscribe((user) => {
        //     this.userLogged = user;
        //     // this.loggedIn = (user != null); 
        //     this.loggedIn = (this.userLogged != null && this.tokenService.getToken() != null);
        //     // console.log(this.user);
        // });
    }

    get username(): AbstractControl {
        return this.loginForm.get('username');
    }

    get password(): AbstractControl {
        return this.loginForm.get('password');
    }

    get rememberMe(): AbstractControl {
        return this.loginForm.get('rememberMe');
    }

    isValid(field): boolean {
        const control = this.loginForm.get(field);
        return control.touched && control.valid;
    }

    isInvalid(field): boolean {
        const control = this.loginForm.get(field);
        return control.touched && control.invalid;
    }

    login() {
      this.loading = true;
      if (this.loginForm.valid) {
          this._authService.login(this.username.value, this.password.value, this.rememberMe.value)
              .subscribe(() => { },
                  () => {
                      this.validLogin = false;
                      this.loading = false;
                  });
      }
      
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
          data => {
            this.socialUser = data;
            const tokenGoogle = new TokenDto(this.socialUser.idToken);
            this.oauthService.google(tokenGoogle).subscribe(
              res => {
                this.tokenService.setToken(res.value);
                this.loggedIn = true;
                this._router.navigate(['/updateUserData']);
              },
              err => {
                console.log(err);
                this.logOut();
              }
            );
          }
        ).catch(
          err => {
            console.log(err);
          }
        );
      }

      logOut(): void {
        this.authService.signOut().then(
          data => {
            this.tokenService.logOut();
            this.loggedIn = false;
          }
        );
      }

}