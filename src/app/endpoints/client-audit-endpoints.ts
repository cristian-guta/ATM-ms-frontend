export class ClientAuditEndpoints{
    api = 'client-service/';
    clientAuditInfo = 'audit/client';

    getClientAuditInfo(page: number, size: number){
        return this.api +  this.clientAuditInfo + '/' + page + '/' + size;
    }
}