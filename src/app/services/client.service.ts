import { RestService } from './rest.service';
import { Injectable } from '@angular/core';
import { ClientEndpoints } from '../endpoints/client-endpoints';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

    getAllUnpagedClients(){
        return this.rest.get(this.clientEnds.getUnpagedClients());
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

    create(client: Client){
        return this.rest.post(this.clientEnds.createUser(), client);
    }

    googleLogin(){
        return this.rest.get('login/oauth2/code/google');
    }
}

