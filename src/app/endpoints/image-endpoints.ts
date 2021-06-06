export class ImageEndpoints {
    api = 'client-service/image';

    getImage(): string {
        return this.api;
    }

    uploadToAWS(): string {
        return this.api + '/aws';
    }

    saveProfilePicture(): string {
        return this.api;
    }
}