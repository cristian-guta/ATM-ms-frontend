import { RestService } from './rest.service';
import { Injectable } from '@angular/core';
import { ClientEndpoints } from '../endpoints/client-endpoints';
import { Client } from '../models/client';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private clientEnds = new ClientEndpoints();

    constructor(
        private rest: RestService
    ){}

    getById(id: number){
        return this.rest.get(this.clientEnds.getClientById(id));
    }

    getClients(page: number, size: number){
        return this.rest.get(this.clientEnds.getAllClients(page, size));
    }

    getCurrentClient(){
        return this.rest.get(this.clientEnds.getCurrentClient());
    }

    updateClient(client: Client){
        return this.rest.put(this.clientEnds.getUpdateClient(client), client);
    }

    deactivateClient(client: Client){
        return this.rest.delete(this.clientEnds.getDeactivateClient(client));
    }

    activateClient(client: Client){
        return this.rest.put(this.clientEnds.getActivateClient(client), client);
    }

    googleLogin(){
        return this.rest.get('login/oauth2/code/google');
    }
}

