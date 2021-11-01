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
    baseUrl: String = 'http://localhost:8765/';

    getAccountByCNP(id: number) {
        let params = new HttpParams();
        params = params.append('id', id.toString());
        return this.httpClient.get(this.baseUrl + this.accountEnds.getAccountByCNP(), { params: params });
    }

    getAccount(id: number) {
        let params = new HttpParams();
        params = params.append('id', id.toString());
        return this.httpClient.get(this.baseUrl + this.accountEnds.getAccount(), { params: params });
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
        return this.httpClient.delete(this.baseUrl + this.accountEnds.getDelete(), { params: params });
    }

    updateAccount(account: Account) {
        return this.rest.put(this.accountEnds.getUpdate(account), account);
    }

    depositMoney(id: number, amount: number) {
        let params = new HttpParams();
        params = params.append('id', id.toString())
        params = params.append('amount', amount.toString());
        return this.httpClient.put(this.baseUrl + this.accountEnds.getDeposit(), {}, { params: params });
    }

    withdrawMoney(id: number, amount: number) {
        let params = new HttpParams();
        params = params.append('id', id.toString())
        params = params.append('amount', amount.toString());
        return this.httpClient.put(this.baseUrl + this.accountEnds.getWithdraw(), {}, { params: params });
    }

    transferMoney(senderAccountId: number, receiverAccountId: number, amount: number) {
        let params = new HttpParams();
        params = params.append('senderId', senderAccountId.toString())
        params = params.append('receiverId', receiverAccountId.toString());
        params = params.append('amount', amount.toString());
        return this.httpClient.put(this.baseUrl + this.accountEnds.getTransfer(), {}, { params: params });
    }

}