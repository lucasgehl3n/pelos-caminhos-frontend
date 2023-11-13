import AdressModel from "./AdressModel";
import InstitutionImageModel from "./InstitutionImageModel";
import TreatmentModel from "./TreatmentModel";

export default class InstitutionModel {
    id: number | null = null;
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