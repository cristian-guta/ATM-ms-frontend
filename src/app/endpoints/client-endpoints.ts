import { Client } from '../models/client';

export class ClientEndpoints{
    api = 'client-service/clients/';
    currentClient = 'current';
    updateClient = 'update';
    deactivateClient = 'delete';
    activateClient = 'activate';

    getClientById(id: number){
        return this.api + id;
    }

    getAllClients(page, size){
        return this.api + page + '/' + size;
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
}

