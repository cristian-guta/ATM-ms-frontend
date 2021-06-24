import { Injectable } from "@angular/core";
import { RoleEndpoints } from "../endpoints/role-endpoints";
import { RestService } from "./rest.service";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private roleEnds = new RoleEndpoints();

    constructor(
        private rest: RestService,
    ) { }

    getAllRoles() {

        return this.rest.get(this.roleEnds.getAllRoles());
    }
}