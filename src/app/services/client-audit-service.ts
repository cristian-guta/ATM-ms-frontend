import { Injectable } from '@angular/core';
import { ClientAuditEndpoints } from '../endpoints/client-audit-endpoints';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root'
})
export class ClientAuditService{
    private clientAuditEnds = new ClientAuditEndpoints();

    constructor(private rest: RestService){}

    getClientAuditInfo(page: number, size: number){
        return this.rest.get(this.clientAuditEnds.getClientAuditInfo(page, size));
    }
}