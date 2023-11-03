import Medicine from "./Medicine";

export default class MedicineAnimal {
    id: number | null = null;
    name: string = '';
    recurrence_days: number = 1;
    recurrence_per_days: number = 1;
    application_hour: string = '';
    quantity_ml: number = 1;
    done: boolean = false;
    initialDate: string | null = null;
    endDate: string | null = null;
    observation: string = '';
    idAnimal: number = 0;
    idMedicine: number = 0;
    medicine: Medicine | undefined;
}