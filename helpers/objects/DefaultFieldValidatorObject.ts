import { createApp } from 'vue';
export default class DefaultFieldValidatorObject {
    error: boolean;
    bodyMessage: string;
    titleMessage: string;

    constructor(error:boolean = false, bodyMessage: string = '', titleMessage:string = '') {
        this.error = error;
        this.bodyMessage = bodyMessage;
        this.titleMessage = titleMessage;
    }
}