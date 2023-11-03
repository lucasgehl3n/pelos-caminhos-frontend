import axios from 'axios';
import Constants from '../constants';
import UserModel from '../structures/Models/UserModel';
import { serialize } from 'object-to-formdata';
import CityModel from '../structures/Models/CityModel';
import InterestModel from 'structures/Models/InterestModel';

const _mapCitiesToFormData = (cities: CityModel[], formData: FormData) => {
    for (let index = 0; index < cities.length; index++) {
        for (const key in cities[index]) {
            if (cities[index].hasOwnProperty(key)) {
                formData.append(`cities[${index}].${key}`, cities[index][key as keyof CityModel].toString());
            }
        }
    };
}

const _mapInterestsToFormData = (interests: InterestModel[], formData: FormData) => {
    for (let index = 0; index < interests.length; index++) {
        for (const key in interests[index]) {
            if (interests[index].hasOwnProperty(key)) {
                const interestValue = interests[index][key as keyof InterestModel];
                const valueToAppend = interestValue !== null && interestValue !== undefined ? interestValue.toString() : '';
                formData.append(`interests[${index}].${key}`, valueToAppend);
            }
        }
    };
}

export default class UserGateway {
    static async Save(model: UserModel) {
        try {
            const modelWithoutArrays = { ...model };
            delete modelWithoutArrays.cities;
            delete modelWithoutArrays.interests;

            const profileImage = await (await fetch(model.profileImage)).blob();

            const formData = serialize(modelWithoutArrays);
            formData.append('profileImage', profileImage);
            _mapCitiesToFormData(model.cities!, formData);
            _mapInterestsToFormData(model.interests!, formData);

            const res = await axios.post(`${Constants.API_URL}/create-account/save`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
            );
            return res;
        } catch (error) {
            return error;
        }
    }
    
    static async List(search: string) {
        try {
            const res = await axios.get(`${Constants.API_URL}/user?search=${search}`,
                { withCredentials: true },
            );
            return res;
        } catch (error: any) {
            return error;
        }
    }
}