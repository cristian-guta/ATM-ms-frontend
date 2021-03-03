import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { EmptyStringPipe } from 'src/app/pipes/empty-string.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BankAccountModalComponent } from 'src/app/modals/bank-account-modal/bank-account-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AccountsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule
  ],
  entryComponents: [BankAccountModalComponent],
  exports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountsModule { }
