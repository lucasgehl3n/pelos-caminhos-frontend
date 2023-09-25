import DefaultFieldValidatorObject from "./DefaultFieldValidatorObject";

export default class FieldValidatorInfos{
    field: string; 
    fieldError: DefaultFieldValidatorObject; 
    tab: number;

    constructor(field: string, fieldError: DefaultFieldValidatorObject, tab: number) {
        this.field = field;
        this.fieldError = fieldError;
        this.tab = tab;
    }
}