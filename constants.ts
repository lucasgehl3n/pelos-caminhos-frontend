const config = useRuntimeConfig()

export default class Constants{
    static readonly API_URL = config.public._NODE_ENV === 'production' ? config.public._BACKEND_URL : 'http://localhost:8000';
    static readonly RESULTS_PER_PAGE = 10;
}