import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BenefitEndpoints } from '../endpoints/benefit-endpoints';
import { Benefit } from '../models/benefit';
import { Subscription } from '../models/subscription';
import { RestService } from './rest.service';

@Injectable({
    providedIn: 'root'
})
export class BenefitService {

    private benefitEnds = new BenefitEndpoints();

    constructor(
        private rest: RestService,
        private httpClient: HttpClient
        ) { }

    getAllBenefits(page: number, size: number) {
        return this.rest.get(this.benefitEnds.getAllBenefits(page, size));
    }

    getAllUnpagedBenefits() {
        return this.rest.get(this.benefitEnds.getUnpaged());
    }

    getBenefitsBySubscription(page: number, size: number) {
        return this.rest.get(this.benefitEnds.getAllBenefitsBySubscription(page, size));
    }

    getCreateBenefit(benefit: Benefit) {
        return this.rest.post(this.benefitEnds.getCreate(), benefit);
    }

    deleteBenefit(benefit: Benefit){
        let params = new HttpParams();
        params = params.append('id', benefit.id.toString())
        return this.httpClient.delete('http://localhost:8765/' + this.benefitEnds.delete(), { params: params })
    }
}