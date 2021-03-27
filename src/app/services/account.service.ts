import { Injectable } from '@angular/core';
import { AccountEndpoints } from '../endpoints/account-endpoints';
import { RestService } from './rest.service';
import { Account } from '../models/account';

@Injectable({
    providedIn: 'root'
})
export class AccountService{
    private accountEnds = new AccountEndpoints();
    constructor(
        private rest: RestService,
    ){}

    currAcct: Account;

    getAccountByCNP(id: number){
        return this.rest.get(this.accountEnds.getAccountByCNP(id));
    }

    getAccount(id: number){
        return this.rest.get(this.accountEnds.getAccount(id));
    }

    getAllAccounts(page, size){
        return this.rest.get(this.accountEnds.getAllAccounts(page, size));
    }

    createAccount(account: Account){
        return this.rest.post(this.accountEnds.create, account);
    }

    deleteAccount(account: Account){
        return this.rest.delete(this.accountEnds.getDelete(account.id));
    }

    updateAccount(account: Account){
        return this.rest.put(this.accountEnds.getUpdate(account), account);
    }

    depositMoney(id: number, amount: number){
        return this.rest.put(this.accountEnds.getDeposit(id, amount), {id, amount});
    }

    withdrawMoney(id: number, amount: number){
        return this.rest.put(this.accountEnds.getWithdraw(id, amount), {id, amount});
    }

    transferMoney(senderAccountId: number, receiverAccountId: number, amount: number){
        return this.rest.put(this.accountEnds.getTransfer(senderAccountId, receiverAccountId, amount), {senderAccountId, receiverAccountId, amount});
    }

}