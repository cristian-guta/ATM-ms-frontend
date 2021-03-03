import { Routes, RouterModule } from "@angular/router";

import { NgModule } from '@angular/core';
import { BenefitAuditComponent } from "./benefit-audit.component";


const routes: Routes = [
    {
        path: '',
        component: BenefitAuditComponent,
        data: {
            title: 'Benefits'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BenefitAuditRoutingModule{}