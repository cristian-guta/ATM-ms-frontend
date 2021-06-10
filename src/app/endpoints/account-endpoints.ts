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

    getAccount(): string {
        return this.api + this.account;
    }

    getUpdate(account: Account): string {
        return this.api + this.account + '/' + account.id;
    }

    getDeposit(): string {
        return this.api + this.deposit;
    }

    getWithdraw(): string {
        return this.api + this.withdraw;
    }

    getTransfer(): string {
        return this.api + this.transfer;
    }

    getAccountByCNP() {
        return this.api + this.accountByCNP;
    }
}