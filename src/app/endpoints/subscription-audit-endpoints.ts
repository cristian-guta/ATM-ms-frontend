export class SubscriptionAuditEndpoints{
    api = 'subscription-service/';
    subscriptionAuditInfo = 'audit/subscriptions/getAuditInfo';

    getSubscriptiontAuditInfo(page: number, size: number){
        return this.api + this.subscriptionAuditInfo + '/' + page + '/' + size;
    }
}