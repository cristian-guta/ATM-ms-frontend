export class BenefitEndpoints{
    api = 'subscription-service/benefits/'
    
    unpagedBenefits = 'unpagedBenefits';
    bySubscriptionPaged = 'user';

    getAllBenefits(page: number, size: number){
        return this.api + page + '/' + size;
    }
    
    getAllBenefitsBySubscription(page: number, size: number){
        return this.api + this.bySubscriptionPaged + '/' + page + '/' + size;
    }

    getUnpaged(){
        return this.api + this.unpagedBenefits;
    }

}