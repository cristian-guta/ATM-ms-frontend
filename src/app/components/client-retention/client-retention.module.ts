import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ClientRetentionComponent } from "./client-retention.component";
import { ClientsRetentionRoutingModule } from "./client-retention-routing.module";

@NgModule({
    declarations: [
        ClientRetentionComponent,
    ],
    imports: [
        CommonModule,
        ClientsRetentionRoutingModule,
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
export class ClientRetentionModule { }