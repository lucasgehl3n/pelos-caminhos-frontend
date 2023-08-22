import axios from 'axios';
import Constants from '../constants';

export default class LoginGateway {
    static async SubmitLogin(email: string, password: string) {
        try {
            const res = await axios.post(`${Constants.API_URL}/login`,
                {
                    email,
                    password
                },
                { withCredentials: true },
            );
            return res;
        } catch (error) {
            return error;
        }
    }
}