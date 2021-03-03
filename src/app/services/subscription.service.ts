import { Injectable } from '@angular/core';
import { SubscriptionEndpoints } from '../endpoints/subscription-endpoints';
import { RestService } from './rest.service';
import { Subscription } from '../models/subscription';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService{

    private subscriptionEnds = new SubscriptionEndpoints();
    constructor(
        private rest: RestService,
    ){}

    getSubscription(){
        return this.rest.get(this.subscriptionEnds.getCurrentSubscription());
    }

    getAllSubscriptions(){
        return this.rest.get(this.subscriptionEnds.api);
    }

    cancelSubscription(){
        return this.rest.delete(this.subscriptionEnds.getCancelSubscription());
    }

    updateSubscription(subscription: Subscription){
        return this.rest.put(this.subscriptionEnds.getUpdate(subscription), subscription);
    }

    deleteSubscription(subscription: Subscription){
        return this.rest.delete(this.subscriptionEnds.getDelete(subscription));
    }

    createSubscription(subscription: Subscription){
        return this.rest.post(this.subscriptionEnds.getCreateSubscription(), subscription);
    }

    activateSubscription(subscription: Subscription){
        return this.rest.put(this.subscriptionEnds.activateSub(subscription), subscription);
    }
}