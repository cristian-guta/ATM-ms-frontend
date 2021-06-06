import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { BenefitAuditRoutingModule } from "./benefit-audit-routing.module";
import { BenefitAuditComponent } from "./benefit-audit.component";

@NgModule({
    declarations: [
        BenefitAuditComponent,
    ],
    imports: [
        CommonModule,
        BenefitAuditRoutingModule,
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatTableModule,
        MatButtonModule,
        MatButtonToggleModule,
      ]
})
export class BenefitsAuditModule{}