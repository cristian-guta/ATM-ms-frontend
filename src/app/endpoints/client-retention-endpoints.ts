export class ClientRetentionEndpoints{
    api = 'client-service/clients-retention/';

    getAllRetentionData(page: number, size: number){
        return this.api + page + '/' + size;
    }
}