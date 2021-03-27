export class BenefitAuditEndpoints{
    api = 'subscription-service/';
    benefitAuditInfo = 'audit/benefit/getAuditInfo';

    getBenefitAuditInfo(page: number, size: number){
        return this.api +  this.benefitAuditInfo + '/' + page + '/' + size;
    }
}