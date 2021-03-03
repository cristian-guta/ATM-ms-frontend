import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Register'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
