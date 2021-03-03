import { Client } from "./client";

export class Review {
    id?: number;
    title?: string;
    description?: string;
    clientId: number;
    client: Client;
}