import { Routes, RouterModule } from "@angular/router";
import { BenefitsComponent } from './benefits.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    {
        path: '',
        component: BenefitsComponent,
        data: {
            title: 'Benefits'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BenefitsRoutingModule{}