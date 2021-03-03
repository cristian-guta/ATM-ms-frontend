import { Routes, RouterModule } from "@angular/router";
import { ClientsComponent } from './clients.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: ClientsComponent,
        data: {
            title: 'Clients'
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
export class ClientsRoutingModule{}