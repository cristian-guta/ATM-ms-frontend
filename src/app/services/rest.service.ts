import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class RestService {

    private readonly serverLink = environment.serverLink;

    constructor(
        private _http: HttpClient,
    ) { }

    options = {
        headers: new HttpHeaders({
        }).append('Authorization', "Bearer " + this.getToken())
    };

    getToken(): any {
        let token;
        if(!sessionStorage.getItem('jwt')){
            token = localStorage.getItem('jwt');
        }
        else{
            token = sessionStorage.getItem('jwt');
        }

        if(!token){
            if(!sessionStorage.getItem('AuthToken')){
                token = localStorage.getItem('AuthToken');
            }
            else{
                token = sessionStorage.getItem('AuthToken');
            }
        }
        return token;
    }

    get(endpoint, options = this.options) {
        return this._http.get<any>(this.serverLink + endpoint, options);
    }

    post(endpoint, item, options = this.options) {
        return this._http.post<any>(this.serverLink + endpoint, item, options);
    }

    put(endpoint, item, options = this.options) {
        return this._http.put<any>(this.serverLink + endpoint, item, options);
    }

    delete(endpoint, options = this.options) {
        return this._http.delete<any>(this.serverLink + endpoint, options);
    }
}