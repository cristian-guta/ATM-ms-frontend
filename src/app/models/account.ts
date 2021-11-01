import { Client } from './client';
import { Currency } from './currency';

export class Account {
    id?: number;
    amount?: number;
    name?: string;
    details?: string;
    clientId?: number;
    client?: Client;
    currency?: Currency;
}
