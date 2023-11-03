import axios from 'axios';
import Constants from '../constants';
import EntityTemporaryHome from 'structures/Models/EntityTemporaryHome';

export default class TemporaryHomeGateway {
    static async List(search: string, idInstitution: number) {
        try {
            const res = await axios.get(`${Constants.API_URL}/temporaryHome?search=${search}&idInstitution=${idInstitution}`,
                { withCredentials: true },
            );
            return res;
        } catch (error: any) {
            return error;
        }
    }
    static async Save(model: EntityTemporaryHome) {
        try {
            const res = await axios.post(`${Constants.API_URL}/temporaryHome/save`,
                model,
                { withCredentials: true },
            );
            return res;
        } catch (error) {
            return error;
        }
    }
}