import axios from 'axios';
import Constants from '../constants';

export default class CityGateway {
    static async List(search: string) {
        try {
            const res = await axios.get(`${Constants.API_URL}/breed?search=${search}`,
                { withCredentials: true },
            );
            return res;
        } catch (error: any) {
            return error;
        }
    }
}