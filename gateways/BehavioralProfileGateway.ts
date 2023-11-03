import axios from 'axios';
import Constants from '../constants';

export default class BehavioralProfileGateway {
    static async List() {
        try {
            const res = await axios.get(`${Constants.API_URL}/behavioralProfile`,
                { withCredentials: true },
            );
            return res;
        } catch (error: any) {
            return error;
        }
    }
}