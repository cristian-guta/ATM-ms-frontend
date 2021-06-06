export class OperationsEndpoints{
    api = 'account-service/';
    allOperations='operations';

    getAllOperations(page, size){
        return this.api + this.allOperations + '/' + page + '/' + size;
    }
}