import axios from 'axios';

export default function (ctx: any) {
    axios.interceptors.response.use(function (response: any) {
        return response
    }, function (error: any) {
        if (error.response.status === 403) {
            window.location.href = '/login';
        }
        else if (error.response.status === 401 && !error.request.responseURL.includes('login')) {
            window.location.href = '/';
        }
        return Promise.reject(error)
    })
};