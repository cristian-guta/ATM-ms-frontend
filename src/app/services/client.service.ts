import { RestService } from './rest.service';
import { Injectable } from '@angular/core';
import { ClientEndpoints } from '../endpoints/client-endpoints';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private clientEnds = new ClientEndpoints();

    constructor(
        private rest: RestService,
        private httpClient: HttpClient
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
        let params = new HttpParams();
        params = params.append('id', client.id.toString());
        return this.httpClient.put('http://localhost:8765/' + this.clientEnds.getUpdateClient(client), client, { params: params });
    }

    deactivateClient(client: Client){
        let params = new HttpParams();
        params = params.append('id', client.id.toString());
        return this.httpClient.put('http://localhost:8765/' + this.clientEnds.getDeactivateClient(client), {}, { params: params });
    }

    activateClient(client: Client){
        let params = new HttpParams();
        params = params.append('id', client.id.toString());
        return this.httpClient.put('http://localhost:8765/' + this.clientEnds.getActivateClient(client), client, { params: params });
    }

    create(client: Client){
        return this.rest.post(this.clientEnds.createUser(), client);
    }

    googleLogin(){
        return this.rest.get('login/oauth2/code/google');
    }
}

