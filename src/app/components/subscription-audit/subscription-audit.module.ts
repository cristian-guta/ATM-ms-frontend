import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SubscriptionAuditComponent } from "./subscription-audit.component";
import { SubscriptionAuditRoutingModule } from "./subscription-audit-routing.module";

@NgModule({
    declarations: [
        SubscriptionAuditComponent,
    ],
    imports: [
        CommonModule,
        SubscriptionAuditRoutingModule,
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatTableModule,
        MatButtonModule,
        MatButtonToggleModule,
    ]
})
export class SubscriptionAuditModule{}