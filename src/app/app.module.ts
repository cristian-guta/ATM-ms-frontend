import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AccountInformationComponent } from './modals/account-information/account-information.component';
import { SubscriptionModalComponent } from './modals/subscription-modal/subscription-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { BankAccountModalComponent } from './modals/bank-account-modal/bank-account-modal.component';
import { AccountDepositModalComponent } from './modals/account-deposit-modal/account-deposit-modal.component';
import { AccountWithdrawModalComponent } from './modals/account-withdraw-modal/account-withdraw-modal.component';
import { TransferMoneyModalComponent } from './modals/transfer-money-modal/transfer-money-modal.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationModule } from './authentication/authentication.module';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { OAuthModule } from 'angular-oauth2-oidc';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { UpdateUserDataComponent } from './components/update-user-data/update-user-data.component';
import { BenefitAuditComponent } from './components/benefit-audit/benefit-audit.component';
import { SubscriptionAuditComponent } from './components/subscription-audit/subscription-audit.component';
import { ReviewComponent } from './components/review/review.component';
import { ClientRetentionComponent } from './components/client-retention/client-retention.component';
import { WebcamModule } from 'ngx-webcam';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientEmotionsComponent } from './components/client-emotions/client-emotions.component';



export function tokenGetter() {
  if (sessionStorage.getItem('jwt')) {
      return sessionStorage.getItem('jwt');
  } else {
      return localStorage.getItem('jwt');
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AccountInformationComponent, SubscriptionModalComponent, BankAccountModalComponent, AccountDepositModalComponent, AccountWithdrawModalComponent, TransferMoneyModalComponent, UpdateUserDataComponent, 
    BenefitAuditComponent, SubscriptionAuditComponent, ReviewComponent, ClientRetentionComponent, ClientEmotionsComponent,
    
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: [environment.frontendDomain, environment.serverDomain, environment.serverLink],
          }
      }),
      FlexLayoutModule,
      ToastrModule.forRoot(),
      ModalModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      UiSwitchModule,
      MatSelectModule,
      MatCardModule,
      MatPaginatorModule,
      MatSortModule,
      MatTableModule,
      AuthenticationModule,
      OAuthModule.forRoot(),
      SocialLoginModule,
      WebcamModule
  ],
  providers: [
    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '1035830881982-cbb7aagoc449t8s0u6h5gimknkf2fh7d.apps.googleusercontent.com'
          ),
        }
      ]
    }
  },
    {
      
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AccountInformationComponent,
    SubscriptionModalComponent 
],
exports: [
  MatButtonModule,
  MatButtonToggleModule,
  MatListModule,
  MatCardModule,
  MatIconModule,
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }