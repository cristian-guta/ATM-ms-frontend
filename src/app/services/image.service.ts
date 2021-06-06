import { Injectable } from "@angular/core";
import { ImageEndpoints } from "../endpoints/image-endpoints";
import { RestService } from "./rest.service";

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private imageEndpoints = new ImageEndpoints();
    constructor(
        private rest: RestService
    ) { }

    saveProfilePic(uploadImageData: FormData) {
        return this.rest.post(this.imageEndpoints.saveProfilePicture(), uploadImageData);
    }

    uploadToAws(uploadImageData: FormData) {
        return this.rest.post(this.imageEndpoints.uploadToAWS(), uploadImageData);
    }

    getImage() {
        return this.rest.get(this.imageEndpoints.getImage());
    }
}