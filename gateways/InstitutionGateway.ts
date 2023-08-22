import axios from 'axios';
import Constants from '../constants';
import InstitutionModel from 'structures/Models/InstitutionModel';

export default class InstitutionGateway {
    static async Save(model: InstitutionModel) {
        try {
            let logo: Blob = new Blob();
            if (model.logo)
                logo = await (await fetch(model.logo)).blob();

            const res = await axios.post(`${Constants.API_URL}/institution/save`,
                {
                    ...model,
                    logo,
                    adress: JSON.stringify(model.address)
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                },
            );
            return res;
        } catch (error) {
            return error;
        }
    }
    static async Get(id: string) {
        try {
            const res = await axios.get(`${Constants.API_URL}/institution/${id}`,
                { withCredentials: true }
            );
            return res;
        } catch (error) {
            return error;
        }
    }
}