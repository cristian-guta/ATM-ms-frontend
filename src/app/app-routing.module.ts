import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'subscriptions',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   data: {
  //       roles: ['ANONYMOUS', 'USER', 'ADMIN'],
  //   }
  // },
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    // redirectTo: '/login',
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS']
    }
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./components/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS', 'USER', 'ADMIN']
    },
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'operations',
    loadChildren: () => import('./components/operations/operations.module').then(m => m.OperationsModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS', 'USER', 'ADMIN']
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'benefits',
    loadChildren: () => import('./components/benefits/benefits.module').then(m => m.BenefitsModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS', 'USER', 'ADMIN']
    }
  },
  {
    path: 'accounts',
    loadChildren: () => import('./components/accounts/accounts.module').then(m => m.AccountsModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['USER', 'ADMIN']
    }
  },
  {
    path: 'clients',
    loadChildren: () => import('./components/clients/clients.module').then(m => m.ClientsModule),
    canActivate: [AuthGuard],
    data: {
        roles: ['ADMIN'],
        animationsState: 'ClientsAnimation'
    }
  },
  {
    path: 'updateUserData',
    loadChildren: () => import('./components/update-user-data/updateUserData.module').then(m => m.UpdateUserDataModule  ),
    canActivate: [AuthGuard],
    data: {
        roles: ['ANONYMOUS', 'USER']
    }
  },
  {
    path: 'benefitsAudit',
    loadChildren: () => import('./components/benefit-audit/benefit-audit-routing.module').then(m => m.BenefitAuditRoutingModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'subscriptionsAudit',
    loadChildren: () => import('./components/subscription-audit/subscription-audit-routing.module').then(m => m.SubscriptionAuditRoutingModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'reviews',
    loadChildren: () => import('./components/review/review-routing.module').then(m => m.ReviewRoutingModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['ANONYMOUS', 'USER', 'ADMIN']
    }
  },
  {
    path: 'clientRetention',
    loadChildren: () => import('./components/client-retention/client-retention-routing.module').then(m => m.ClientsRetentionRoutingModule),
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }