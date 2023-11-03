import axios from 'axios';
import Constants from '../constants';

export default class ColorGateway {
    static async List() {
        try {
            const res = await axios.get(`${Constants.API_URL}/colors`,
                { withCredentials: true },
            );
            return res;
        } catch (error: any) {
            return error;
        }
    }
}