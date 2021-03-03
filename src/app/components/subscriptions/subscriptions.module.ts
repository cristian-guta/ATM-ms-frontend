import { NgModule } from '@angular/core';
import { SubscriptionsComponent } from './subscriptions.component';
import { CommonModule } from '@angular/common';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';


import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SubscriptionModalComponent } from 'src/app/modals/subscription-modal/subscription-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        SubscriptionsComponent,    
    ],
    imports: [
        CommonModule,
        SubscriptionsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot(),
        MatTableModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule
    ],
    entryComponents: [SubscriptionModalComponent],
    exports: [
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatButtonToggleModule,
      ],
})
export class SubscriptionsModule { }