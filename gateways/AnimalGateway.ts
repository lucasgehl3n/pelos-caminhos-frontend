import axios from "axios";
import Constants from '../constants';
import AnimalModel from "../structures/Models/AnimalModel";
import deepcopy from 'deepcopy';
import AnimalImageModel from "../structures/Models/AnimalImageModel";
import AnimalAttachmentModel from "../structures/Models/AnimalAttachmentModel";
import AnimalFilter from "../structures/Filters/AnimalFilter";

const _mapImagesToFormData = async (id: number, model: AnimalModel) => {
    let formData = new FormData();
    if (id) {
        formData.append('id', id.toString());
    }

    if (model.deletedImages && model.deletedImages.length) {
        model.deletedImages.forEach(image => {
            formData.append(`deletedImages[]`, image.toString());
        });
    }


    if (model.deletedAnimalAttachments && model.deletedAnimalAttachments.length) {
        model.deletedAnimalAttachments.forEach(file => {
            formData.append(`deletedAnimalAttachments[]`, file.toString());
        });
    }

    if (model.animalImages) {
        for (let i = 0; i < model.animalImages.length; i++) {
            const imageString = model.animalImages[i].image as string;

            if (!model.animalImages[i].id) {
                model.animalImages[i] = new AnimalImageModel();
            }

            const blob = await (await fetch(imageString)).blob();
            formData.append(`animalImages[${i}].id`, model.animalImages[i].id.toString());
            formData.append(`animalImages[${i}].image`, blob);
        }
    }

    if (model.animalAttachments && model.animalAttachments.length) {
        for (let i = 0; i < model.animalAttachments.length; i++) {

            const fileString = model.animalAttachments[i].file as string;
            const blob = await (await fetch(fileString)).blob();
            if (model.animalAttachments[i].id)
                formData.append(`animalAttachments[${i}].id`, model.animalAttachments[i].id!.toString());
            formData.append(`animalAttachments[${i}].type`, model.animalAttachments[i].type.toString());
            formData.append(`animalAttachments[${i}].file`, blob);
            formData.append(`animalAttachments[${i}].description`, model.animalAttachments[i].description);
        }
    }

    return formData;
}
export default class AnimalGateway {
    static async Save(model: AnimalModel) {
        try {
            let copyModel = deepcopy(model);

            if (copyModel.medicineAnimal && copyModel.medicineAnimal.length) {
                copyModel.medicineAnimal.forEach(med => {
                    if (med.medicine) {
                        med.idMedicine = med.medicine.id;
                        med.medicine = undefined;
                    }
                });
            }

            if (copyModel.temporaryHome) {
                if (copyModel.temporaryHome.id)
                    copyModel.idTemporaryHome = copyModel.temporaryHome.id;
                copyModel.temporaryHome = undefined;
            }

            if (copyModel.breed) {
                copyModel.idBreed = copyModel.breed.id;
                copyModel.breed = undefined;
            }

            if (copyModel.adoptionUser) {
                copyModel.idAdoptionUser = copyModel.adoptionUser.id;
                copyModel.adoptionUser = undefined;
            }

            copyModel.animalImages = undefined;
            copyModel.deletedImages = [];
            copyModel.animalAttachments = undefined;

            const res = await axios.post(`${Constants.API_URL}/animal/save`,
                copyModel,
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

    static async SaveFiles(id: number, model: AnimalModel) {
        try {
            let copyModel = deepcopy(model);
            const formData = await _mapImagesToFormData(id, copyModel);
            const res = await axios.post(`${Constants.API_URL}/animal/saveFiles/`,
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
            const res = await axios.get(`${Constants.API_URL}/animal/${id}`,
                { withCredentials: true }
            );
            return res;
        } catch (error) {
            return error;
        }
    }

    static async List(pageDynamicRendering: number, filter: AnimalFilter = new AnimalFilter()) {
        try {
            if(filter.image){
                return await this.ListWithImage(pageDynamicRendering, filter);
            }
            const res = await axios.get(`${Constants.API_URL}/animal?page=${pageDynamicRendering}&${filter.toUrl()}`,
                { withCredentials: true }
            );
            return res;
        } catch (error) {
            return error;
        }
    }

    static async ListWithImage(pageDynamicRendering: number, filter: AnimalFilter = new AnimalFilter()) {
        try {
            const formData = new FormData();
            formData.append('image', filter.image!);
            formData.append('filters', filter.toUrl());
            formData.append('page', pageDynamicRendering.toString());

            const res = await axios.post(`${Constants.API_URL}/animal/prediction`,
                formData,
                { withCredentials: true }
            );
            return res;
        } catch (error) {
            return error;
        }
    }
}