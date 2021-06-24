import { Client } from '../models/client';

export class ClientEndpoints{
    api = 'client-service/clients/';
    getAll = 'findAll';
    currentClient = 'current';
    updateClient = 'update';
    deactivateClient = 'delete';
    activateClient = 'activate';
    create = 'create';

    getClientById(id: number){
        return this.api + id;
    }

    getAllClients(page, size){
        return this.api + page + '/' + size;
    }

    getUnpagedClients(){
        return this.api + this.getAll;
    }
    
    getUpdateClient(client: Client){
        return this.api + this.updateClient + '/' + client.id;
    }

    getDeactivateClient(client: Client){
        return this.api + this.deactivateClient + '/' + client.id;
    }

    getActivateClient(client: Client){
        return this.api + this.activateClient + '/' + client.id;
    }

    getCurrentClient(){
        return this.api + this.currentClient;
    }

    createUser(){
        return this.api + this.create;
    }
}

