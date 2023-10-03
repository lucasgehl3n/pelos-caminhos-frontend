import axios from 'axios';
import Constants from '../constants';
import InstitutionModel from '../structures/Models/InstitutionModel';
import InstitutionImageModel from '../structures/Models/InstitutionImageModel';
import { serialize } from 'object-to-formdata';
import InstitutionFilter from '../structures/Filters/InstitutionFilter';

const _mapPublicImagesToFormData = async (publicImages: InstitutionImageModel[], formData: FormData) => {
    for (let i = 0; i < publicImages.length; i++) {
        const imageString = publicImages[i].image as string;

        if (!publicImages[i].id) {
            publicImages[i] = new InstitutionImageModel();
        }

        const blob = await (await fetch(imageString)).blob();
        formData.append(`publicImages[${i}].id`, publicImages[i].id.toString());
        formData.append(`publicImages[${i}].image`, blob);
    }
}

export default class InstitutionGateway {
    static async Save(model: InstitutionModel) {
        try {
            const publicImages = model.publicImages;
            model.publicImages = [];


            const logo = await (await fetch(model.logo)).blob();
            model.logo = '';

            const formData = serialize(model);
            formData.append('logo', logo);

            await _mapPublicImagesToFormData(publicImages, formData);

            const res = await axios.post(`${Constants.API_URL}/institution/save`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
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
    static async GetPublicInfos(id: string) {
        try {
            const res = await axios.get(`${Constants.API_URL}/public/institution/${id}`,
                { withCredentials: true }
            );
            return res;
        } catch (error) {
            return error;
        }
    }
    static async List(pageDynamicRendering: number, filter: InstitutionFilter = new InstitutionFilter()) {
        try {
            console.log(useRuntimeConfig().public.NODE_ENV)
            const res = await axios.get(`${Constants.API_URL}/institution?page=${pageDynamicRendering}&${filter.toUrl()}`,
                { withCredentials: true }
            );
            return res;
        } catch (error) {
            return error;
        }
    }
}