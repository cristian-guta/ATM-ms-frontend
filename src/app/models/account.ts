import { Client } from './client';

export class Account {
    id?: number;
    amount?: number;
    name?: string;
    details?: string;
    clientId?: number;
    client?: Client;
}
