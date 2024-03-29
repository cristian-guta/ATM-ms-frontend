import { Component, OnInit, ViewChild } from '@angular/core';
import { Account } from 'src/app/models/account';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AccountService } from 'src/app/services/account.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BankAccountModalComponent } from 'src/app/modals/bank-account-modal/bank-account-modal.component';
import { ToastService } from 'src/app/services/toast.service';
import { AccountDepositModalComponent } from 'src/app/modals/account-deposit-modal/account-deposit-modal.component';
import { AccountWithdrawModalComponent } from 'src/app/modals/account-withdraw-modal/account-withdraw-modal.component';
import { Client } from 'src/app/models/client';
import { TransferMoneyModalComponent } from 'src/app/modals/transfer-money-modal/transfer-money-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  allAccounts: MatTableDataSource<Account>;
  displayColumnsAdmin: string[];

  clientAccount: Account[] = [];
  currentClient: Client;
  loading = true;
  modalRef: BsModalRef;
  clients: Client[] = [];
  IsWait: boolean = true;
  length: number;
  pageSize: number = 5;
  pageIndex: number = 0;

  constructor(
    private _auth: AuthenticationService,
    private _accountService: AccountService,
    private _modal: BsModalService,
    private _toast: ToastService,
    private _clientService: ClientService
  ) { }

  ngOnInit() {
    
    if (this.isAdmin()) {
      this.displayColumnsAdmin = ['id', 'name', 'amount', 'details', 'owner'];
    }
    else {
      this.displayColumnsAdmin = ['id', 'name', 'amount', 'details', 'operations'];
    }

    this._clientService.getCurrentClient().subscribe((client: Client) => {
      this.currentClient = client;
      if (!this.isAdmin()) {
        this._accountService.getAccountByCNP(this.currentClient.id)
          .subscribe((result: Account[]) => {
            this.clientAccount=result;
            console.log(this.clientAccount)
            this.loading = false;
            this.IsWait = false;
          });
          
      }
      else {
        this.getData(this.pageSize, this.pageIndex);
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.allAccounts.filter = filterValue;
  }

  getData(size, index) {
    this._accountService.getAllAccounts(index, size)
      .subscribe(result => {

        for (let acc of result.content) {
          this._clientService.getById(acc.clientId).subscribe(cl => {
            acc.client = cl;
          })
        }
        this.allAccounts = result.content;

        this.allAccounts.paginator = this.paginator;
        this.length = result.totalElements;
        this.IsWait = false;
      });

  }

  handleRequest(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getData(this.pageSize, this.pageIndex);
  }

  isAdmin() {
    return this._auth.getRole().includes('ADMIN');
  }

  removeAccount(account) {
    this.allAccounts.data = this.allAccounts.data.filter((acc: Account) => acc.id !== account.id);
  }

  openModal() {
    this.modalRef = this._modal.show(BankAccountModalComponent);
    this.modalRef.content.onClose.subscribe((account: Account) => {
      this.allAccounts.data.push(account);
    });
  }

  delete(account: Account) {
    this._accountService.deleteAccount(account)
      .subscribe(() => {
        this._toast.showSuccess('Account successfully deleted!');
      }, 
      err => {
        this._toast.showError('Error');
      });
    window.location.reload();
  }

  deposit(account: Account) {
    this._accountService.currAcct = account;
    this.modalRef = this._modal.show(AccountDepositModalComponent);
  }

  withdraw(account: Account) {
    this._accountService.currAcct = account;
    this.modalRef = this._modal.show(AccountWithdrawModalComponent);
  }

  transfer(account: Account) {
    this._accountService.currAcct = account;
    this.modalRef = this._modal.show(TransferMoneyModalComponent);
  }


}
