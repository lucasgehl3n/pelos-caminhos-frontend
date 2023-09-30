const config = useRuntimeConfig()

export default class Constants{
    static readonly API_URL = config.public.NODE_ENV === 'production' ? config.public.BACKEND_URL : 'http://localhost:3000/';
    static readonly RESULTS_PER_PAGE = 10;
}