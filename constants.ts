export default class Constants{
    static readonly API_URL = process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : 'http://localhost:3000/api/v1';
    static readonly RESULTS_PER_PAGE = 10;
}