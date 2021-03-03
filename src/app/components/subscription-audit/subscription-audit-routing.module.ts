import { Routes, RouterModule } from "@angular/router";

import { NgModule } from '@angular/core';
import { SubscriptionAuditComponent } from "./subscription-audit.component";


const routes: Routes = [
    {
        path: '',
        component: SubscriptionAuditComponent,
        data: {
            title: 'Subscriptions'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionAuditRoutingModule{}