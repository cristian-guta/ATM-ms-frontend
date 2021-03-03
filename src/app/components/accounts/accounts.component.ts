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
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  allAccounts: MatTableDataSource<Account>;
  displayColumnsAdmin: string[];
  
  clientAccount: Account;
  loading = true;
  modalRef: BsModalRef;
  clients: Client[] = [];

  length: number;
  pageSize: number=5;
  pageIndex:number = 0;

  constructor(
    private _auth: AuthenticationService,
    private _accountService: AccountService,
    private _modal: BsModalService,
    private _toast: ToastService
  ) { }

  ngOnInit() {
    if(this.isAdmin()){
      // this.displayColumnsAdmin = ['id', 'name', 'amount', 'details', 'owner'];
      this.displayColumnsAdmin = ['id', 'name', 'amount', 'details'];
    }
    else{
      this.displayColumnsAdmin = ['id', 'name', 'amount', 'details', 'operations'];
    }
    
    if(!this.isAdmin()){
      this._accountService.getAccountByCNP()
                .subscribe((result: Account) => {
                    this.clientAccount = result;
                    this.loading = false;
                });
    }
    else{
      this.getData(this.pageSize, this.pageIndex);
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.allAccounts.filter = filterValue;
  }

  getData(size, index){
    this._accountService.getAllAccounts(index, size)
    .subscribe(result => {
      this.allAccounts = result.content;
      this.allAccounts.paginator = this.paginator;
      this.length = result.totalElements;      
    });
    
  }

  handleRequest(event: any){
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
    this._accountService.deleteAccount(account).subscribe(() => {
      this._toast.showSuccess('Account successfully deleted!');
    });
    window.location.reload();
  }

  deposit(account: Account){
    this._accountService.currAcct = account;
    this.modalRef = this._modal.show(AccountDepositModalComponent);
  }

  withdraw(account: Account){
    this._accountService.currAcct = account;
    this.modalRef = this._modal.show(AccountWithdrawModalComponent);
  }

  transfer(account: Account){
    this._accountService.currAcct = account;
    this.modalRef = this._modal.show(TransferMoneyModalComponent);
  }


}
