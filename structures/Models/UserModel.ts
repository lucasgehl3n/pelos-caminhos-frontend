import AdressModel from "./AdressModel";
import CityModel from "./CityModel";
import InterestModel from "./InterestModel";

export default class UserModel {
    id: number = 0;
    name: string = 'Lucas Gehlen';
    document: string = '036.149.870-51';
    password: string = 'teste';
    birthdayDate: string = '17/03/2000';
    email: string = 'contato.lucasgehlen@gmail.com';
    phone: string = '(54) 99924-3818';
    address: AdressModel = new AdressModel();
    interests?: InterestModel[] = [];
    cities?: CityModel[] = [];
    profileImage: string = '';
}