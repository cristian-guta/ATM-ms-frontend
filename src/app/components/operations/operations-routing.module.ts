import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { OperationsComponent } from './operations.component';


const routes: Routes = [
    {
        path: '',
        component: OperationsComponent,
        data: {
            title: 'Operations'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OperationsRoutingModule{}