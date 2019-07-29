import API from './api';

export class QuizService {

    get = (url,params)=> {
        return API.get(url,{ params: params});
    }
}

export default new QuizService();