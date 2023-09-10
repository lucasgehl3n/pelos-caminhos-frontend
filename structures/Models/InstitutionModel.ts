import AdressModel from "./AdressModel";
import InstitutionImageModel from "./InstitutionImageModel";

export default class InstitutionModel {
    id: number = 0;
    name: string = '';
    document: string = '';
    description: string = '';
    email: string = '';
    phone: string = '';
    site: string = '';
    logo: string = '';
    publicImages: Array<InstitutionImageModel> = [];
    deletedPublicImages: Array<number> = [];
    role: string = '';
    address: AdressModel = new AdressModel();
}