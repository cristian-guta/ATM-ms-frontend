import { Injectable } from "@angular/core";
import { RestService } from "./rest.service";

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    constructor(
        private rest: RestService
    ){}

    saveProfilePic(uploadImageData: FormData){
        this.rest.post('client-service/image/upload', uploadImageData)
            .subscribe((response) => {
                console.log("Image uploaded successfully!");
            }
        );
    }

    uploadToAws(uploadImageData: FormData){
        this.rest.post('client-service/image/aws', uploadImageData)
            .subscribe((response) => {
                console.log(response);
        });
    }
} 