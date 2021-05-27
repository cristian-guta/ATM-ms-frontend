import { Injectable } from "@angular/core";
import { ClientEmotionsEndpoints } from "../endpoints/client-emotions";
import { RestService } from "./rest.service";

@Injectable({
    providedIn: 'root'
})
export class ClientEmotionsService{
    private clientEmotionEndpoint = new ClientEmotionsEndpoints();

    constructor(
        private rest: RestService
    ){}

    getAllEmotionsData(page: number, size: number){
        return this.rest.get(this.clientEmotionEndpoint.getAllClientEmotions(page, size));
    }
}

