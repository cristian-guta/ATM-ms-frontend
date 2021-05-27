export class ClientEmotionsEndpoints{
    api = 'client-service/'
    emotions = 'client-emotions/'
    
    getAllClientEmotions(page: number, size: number){
        return this.api + this.emotions + page + '/' + size;
    }

}