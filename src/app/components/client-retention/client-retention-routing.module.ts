import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { ClientRetentionComponent } from "./client-retention.component";

const routes: Routes = [
    {
        path: '',
        component: ClientRetentionComponent,
        data: {
            title: 'Clients retention'
        }
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ClientsRetentionRoutingModule{}