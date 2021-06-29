import { Subscription } from '../models/subscription';

export class SubscriptionEndpoints{
    api = 'subscription-service/subscriptions/';
    currentSubscription = 'getSubscription';
    cancelSubscription = 'cancelSubscription';
    updateSubscription = 'updateSubscription';
    activateSubscription = 'activateSubscription';
    getByNetwork = 'phone';
    allForRegister = 'all'

    getDelete(subscription: Subscription): string{
        return this.api + subscription.id;
    }

    getUpdate(subscription: Subscription): string{
        return this.api + this.updateSubscription + '/' + subscription.id;
    }

    activateSub(subscription: Subscription): string{
        return this.api + this.activateSubscription + '/' + subscription.id;
    }
    
    getCurrentSubscription(){
        return this.api + this.currentSubscription;
    }

    getCancelSubscription(){
        return this.api + this.cancelSubscription;
    }

    getCreateSubscription(){
        return this.api;
    }

    getByNtw(){
        return this.api + this.getByNetwork;
    }

    getAllForRegister(){
        return this.api + this.allForRegister
    }
}