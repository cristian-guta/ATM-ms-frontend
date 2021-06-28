import { Injectable } from '@angular/core';
import { BenefitAuditEndpoints } from '../endpoints/benefit-audit-endpoints';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root'
})
export class BenefitAuditService{
    private benefitAuditEnds = new BenefitAuditEndpoints();

    constructor(private rest: RestService){}

    getBenefitAuditInfo(page: number, size: number){
        return this.rest.get(this.benefitAuditEnds.getBenefitAuditInfo(page, size));
    }
}