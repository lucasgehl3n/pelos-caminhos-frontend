import axios from 'axios';
import Constants from '../constants';

export default class LoginUsecase {
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
    static async SubmitFoo() {
        try {
            const res = await axios.get(`${Constants.API_URL}/testingRoute`, { withCredentials: true },);
            return res;
        } catch (error) {
            return error;
        }
    }
}