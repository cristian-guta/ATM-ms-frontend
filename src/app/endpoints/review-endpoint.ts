export class ReviewEndpoints{
    api = 'review-service/reviews/';
    getAll = '';
    getByClientId = '';
    create = 'create';
    delete = 'delete';

    deleteReview(id: number){
        return this.api + this.delete + '/' + id;
    }

    getAllReviews(index: number, size: number){
        return this.api + this.getAll + index + '/' + size;
    }

    getCreate(){
        return this.api;
    }

    getDelete(id: number){
        return this.api + '/' + id;
    }
}