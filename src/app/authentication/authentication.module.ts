import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SubscriptionsModule } from '../components/subscriptions/subscriptions.module';



@NgModule({
    declarations: [
        AuthenticationComponent,
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        AuthenticationRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatListModule,
        SubscriptionsModule
    ],
    exports:[
        MatCardModule,
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationModule { }
