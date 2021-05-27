import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ClientEmotionsComponent } from "./client-emotions.component";

@NgModule({
    declarations: [
        ClientEmotionsComponent,
    ],
    imports: [
        CommonModule,
        ClientEmotionsModule,
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
export class ClientEmotionsModule{}