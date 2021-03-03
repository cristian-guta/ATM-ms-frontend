export class OperationsEndpoints{
    allOperations='api/operations';

    getAllOperations(page, size){
        return this.allOperations + '/' + page + '/' + size;
    }
}