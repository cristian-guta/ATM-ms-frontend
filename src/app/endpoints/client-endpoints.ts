import { Client } from '../models/client';

export class ClientEndpoints{
    api = 'client-service/clients/';
    getAll = 'findAll';
    currentClient = 'current';
    updateClient = 'update';
    deactivateClient = 'deactivate';
    activateClient = 'activate';
    create = 'create';

    getClientById(id: number){
        return this.api + id;
    }

    getAllClients(page, size){
        return this.api + page + '/' + size;
    }

    getUnpagedClients(){
        return this.api;
    }
    
    getUpdateClient(client: Client){
        return this.api + this.updateClient;
    }

    getDeactivateClient(client: Client){
        return this.api + this.deactivateClient;
    }

    getActivateClient(client: Client){
        return this.api + this.activateClient;
    }

    getCurrentClient(){
        return this.api + this.currentClient;
    }

    createUser(){
        return this.api + this.create;
    }
}

