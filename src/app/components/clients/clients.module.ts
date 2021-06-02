import { NgModule } from '@angular/core';
import { ClientsComponent } from './clients.component';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { EmptyStringPipe } from 'src/app/pipes/empty-string.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
    declarations: [
        ClientsComponent,
    ],
    imports: [
        CommonModule,
        ClientsRoutingModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatButtonToggleModule,
    ],
    exports: [
        MatTableModule,
        MatButtonModule,
        MatButtonToggleModule
    ]
})
export class ClientsModule { }
