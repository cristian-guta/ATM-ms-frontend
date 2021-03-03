import { Injectable } from '@angular/core';
import { SubscriptionAuditEndpoints } from '../endpoints/subscription-audit-endpoints';

import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionAuditService{
    private subscriptionAuditEnds = new SubscriptionAuditEndpoints();

    constructor(private rest: RestService){}

    getSubscriptionAuditInfo(page: number, size: number){
        return this.rest.get(this.subscriptionAuditEnds.getSubscriptiontAuditInfo(page, size));
    }
}