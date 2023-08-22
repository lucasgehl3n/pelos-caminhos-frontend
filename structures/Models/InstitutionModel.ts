import AdressModel from "./AdressModel";

export default class InstitutionModel{
    id: number = 0;
    name:string = '';
    document:string = '';
    description:string = '';
    email:string = '';
    phone:string = '';
    site:string = '';
    logo:string = '';
    address:AdressModel = new AdressModel();
}