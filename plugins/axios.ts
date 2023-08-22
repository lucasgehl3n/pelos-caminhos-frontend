import { Plugin } from '@nuxt/types';
import { Context } from 'vm';
import axios from 'axios';
import { useRouter } from 'vue-router'; 
const router = useRouter();

export default function (ctx: any) {
    axios.interceptors.response.use(function (response: any) {
        return response
    }, function (error: any) {
        if (error.response.status === 403) {
            window.location.href = '/login';
        }
        else if (error.response.status === 401) {
            window.location.href = '/';
        }
        return Promise.reject(error)
    })
};