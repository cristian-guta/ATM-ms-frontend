export class BenefitAuditEndpoints{
    benefitAuditInfo = 'api/audit/benefit/getAuditInfo';

    getBenefitAuditInfo(page: number, size: number){
        return this.benefitAuditInfo + '/' + page + '/' + size;
    }
}