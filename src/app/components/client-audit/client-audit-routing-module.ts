import { Routes, RouterModule } from "@angular/router";

import { NgModule } from '@angular/core';
import { ClientAuditComponent } from "./client-audit.component";


const routes: Routes = [
    {
        path: '',
        component: ClientAuditComponent,
        data: {
            title: 'Clients'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientAuditRoutingModule{}