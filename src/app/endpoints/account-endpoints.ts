import { HttpParams } from '@angular/common/http';
import { Account } from '../models/account';

export class AccountEndpoints {
    api = 'account-service/';
    accountByCNP = 'accounts/client';
    create = 'account-service/accounts';
    delete = 'accounts';
    account = 'accounts';
    allAccounts = 'accounts';
    update = 'accounts';
    deposit = 'accounts/deposit';
    withdraw = 'accounts/withdraw';
    transfer = 'accounts/transfer';

    getAllAccounts(page, size) {
        return this.api + this.allAccounts + '/' + page + '/' + size;
    }

    getDelete(): string {

        return this.api + this.delete;
    }

    getAccount(id: number): string {
        return this.api + this.account + '/' + id;
    }

    getUpdate(account: Account): string {
        return this.api + this.account + '/' + account.id;
    }

    getDeposit(id: number, amount: number): string {
        return this.api + this.deposit + '/' + id + '/' + amount;
    }

    getWithdraw(id: number, amount: number): string {
        return this.api + this.withdraw + '/' + id + '/' + amount;
    }

    getTransfer(senderId: number, receiverId: number, amount: number): string {
        return this.api + this.transfer + '/' + senderId + '/' + receiverId + '/' + amount;
    }

    getAccountByCNP(id: number) {
        return this.api + this.accountByCNP + '/' + id;
    }
}