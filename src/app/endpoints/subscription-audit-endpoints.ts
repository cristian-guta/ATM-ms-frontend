export class SubscriptionAuditEndpoints{
    subscriptionAuditInfo = 'api/audit/subscriptions/getAuditInfo';

    getSubscriptiontAuditInfo(page: number, size: number){
        return this.subscriptionAuditInfo + '/' + page + '/' + size;
    }
}