import AdressModel from "./AdressModel";
import CityModel from "./CityModel";
import InterestModel from "./InterestModel";

export default class UserModel {
    id: number = 0;
    name: string = '';
    document: string = '';
    password: string = '';
    birthdayDate: string = '';
    email: string = '';
    phone: string = '';
    address: AdressModel = new AdressModel();
    interests?: InterestModel[] = [];
    cities?: CityModel[] = [];
    profileImage?: string | null = null;
}