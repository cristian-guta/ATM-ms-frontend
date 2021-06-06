import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ReviewEndpoints } from "../endpoints/review-endpoint";
import { Review } from "../models/review";
import { RestService } from "./rest.service";

@Injectable({
    providedIn: 'root'
})
export class ReviewService{
    private reviewsEnds = new ReviewEndpoints();

    constructor(
        private rest: RestService,
        private httpClient: HttpClient
    ){}

    getAllReviews(index: number, size: number){
        let params = new HttpParams();
        params.set('page', index.toString());
        params.set('size', size.toString());
        return this.rest.get(this.reviewsEnds.getAllReviews(index, size));
    }

    createReview(review: Review){
        return this.rest.post(this.reviewsEnds.getCreate(), review);
    }

    deleteReview(id: number){
        return this.rest.delete(this.reviewsEnds.getDelete(id));
    }
}