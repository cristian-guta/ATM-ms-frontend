import { Injectable } from '@angular/core';
import { AccountEndpoints } from '../endpoints/account-endpoints';
import { RestService } from './rest.service';
import { Account } from '../models/account';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private accountEnds = new AccountEndpoints();
    constructor(
        private rest: RestService,
        private httpClient: HttpClient
    ) { }

    currAcct: Account;

    getAccountByCNP(id: number) {
        let params = new HttpParams();
        params = params.append('id', id.toString());
        return this.httpClient.get('http://localhost:8765/' + this.accountEnds.getAccountByCNP(), { params: params });
    }

    getAccount(id: number) {
        let params = new HttpParams();
        params = params.append('id', id.toString());
        return this.httpClient.get('http://localhost:8765/' + this.accountEnds.getAccount(), { params: params });
    }

    getAllAccounts(page, size) {
        return this.rest.get(this.accountEnds.getAllAccounts(page, size));
    }

    createAccount(account: Account) {
        return this.rest.post(this.accountEnds.create, account);
    }

    deleteAccount(account: Account) {
        let params = new HttpParams();
        params = params.append('id', account.id.toString());
        return this.httpClient.delete('http://localhost:8765/' + this.accountEnds.getDelete(), { params: params });
    }

    updateAccount(account: Account) {
        return this.rest.put(this.accountEnds.getUpdate(account), account);
    }

    depositMoney(id: number, amount: number) {
        let params = new HttpParams();
        params = params.append('id', id.toString())
        params = params.append('amount', amount.toString());
        return this.httpClient.put('http://localhost:8765/' + this.accountEnds.getDeposit(), {}, { params: params });
    }

    withdrawMoney(id: number, amount: number) {
        let params = new HttpParams();
        params = params.append('id', id.toString())
        params = params.append('amount', amount.toString());
        return this.httpClient.put('http://localhost:8765/' + this.accountEnds.getWithdraw(), {}, { params: params });
    }

    transferMoney(senderAccountId: number, receiverAccountId: number, amount: number) {
        let params = new HttpParams();
        params = params.append('senderId', senderAccountId.toString())
        params = params.append('receiverId', receiverAccountId.toString());
        params = params.append('amount', amount.toString());
        return this.httpClient.put('http://localhost:8765/' + this.accountEnds.getTransfer(), {}, { params: params });
    }

}