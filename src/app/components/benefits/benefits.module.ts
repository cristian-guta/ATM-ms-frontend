import { NgModule } from "@angular/core";
import { BenefitsComponent } from './benefits.component';
import { CommonModule } from '@angular/common';
import { BenefitsRoutingModule } from './benefits-routing.module';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
    declarations: [
        BenefitsComponent,
    ],
    imports: [
        CommonModule,
        BenefitsRoutingModule,
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatButtonToggleModule,
    ],
    exports: [
        MatTableModule,
        MatButtonModule,
        MatButtonToggleModule,
      ]
})
export class BenefitsModule{}