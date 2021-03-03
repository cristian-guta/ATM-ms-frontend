import { Injectable } from "@angular/core";
import { ClientRetentionEndpoints } from "../endpoints/client-retention-endpoints";
import { RestService } from "./rest.service";

@Injectable({
    providedIn: 'root'
})
export class ClientRetentionService{
    private clientRetentionEndpoint = new ClientRetentionEndpoints();

    constructor(
        private rest: RestService
    ){}

    getAllRetentionData(page: number, size: number){
        return this.rest.get(this.clientRetentionEndpoint.getAllRetentionData(page, size));
    }
}

