import CityModel from "../../../structures/Models/CityModel";

let context:any = null;
export default class CityControlForm {
    citiesAdded: CityModel[];
    citiesList: CityModel[];
    constructor(
        citiesAdded: CityModel[],
        citiesList: CityModel[]
    ) {
        this.citiesAdded = citiesAdded;
        this.citiesList = citiesList;
        context = this;
    }

    addCity(city: CityModel) {
        if (context.citiesAdded.some((c: { id: number; }) => c.id === city.id)) {
            return;
        }
        context.citiesAdded.push(city);
    }

    removeCity(city: CityModel) {
        context.citiesAdded = context.citiesAdded.filter((c: { id: number; }) => c.id !== city.id);
    }
}