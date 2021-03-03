import { Client } from './client';
import { Account } from './account';

export class Operation{
    id?: number;
    type?: string;
    amount?: number;
    dateOfOperation?: Date;
    client?: Client;
    account?: Account;
}