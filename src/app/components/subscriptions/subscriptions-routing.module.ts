import { SubscriptionsComponent } from './subscriptions.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      component: SubscriptionsComponent,
      data: {
          title: 'Subscriptions'
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SubscriptionsRoutingModule { }