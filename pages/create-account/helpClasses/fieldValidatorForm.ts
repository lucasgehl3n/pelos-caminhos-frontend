import FieldValidatorInfos from "../../../helpers/objects/FieldValidatorInfos";
import DefaultFieldValidatorObject from "../../../helpers/objects/DefaultFieldValidatorObject";
import UserModel from "../../../structures/Models/UserModel";
import { cpf } from 'cpf-cnpj-validator';

export const formFieldErrorValidator = reactive({
    name: new DefaultFieldValidatorObject(),
    email: new DefaultFieldValidatorObject(),
    password: new DefaultFieldValidatorObject(),
    birthdayDate: new DefaultFieldValidatorObject(),
    document: new DefaultFieldValidatorObject(),
    phone: new DefaultFieldValidatorObject(),
    street: new DefaultFieldValidatorObject(),
    number: new DefaultFieldValidatorObject(),
})

export class FieldsToValidate {
    public name: FieldValidatorInfos;

    [key: string]: FieldValidatorInfos;
    constructor(form: UserModel) {
        this.name = {
            field: 'name',
            fieldError: formFieldErrorValidator.name,
            tab: 0,
        };
        this.email = {
            field: 'email',
            fieldError: formFieldErrorValidator.email,
            tab: 0,
        };
        this.password = {
            field: 'password',
            fieldError: formFieldErrorValidator.password,
            tab: 0,
        };
        this.birthdayDate = {
            field: 'birthdayDate',
            fieldError: formFieldErrorValidator.birthdayDate,
            tab: 0,
        };
        this.document = {
            field: 'document',
            fieldError: formFieldErrorValidator.document,
            tab: 0,
        };
        this.phone = {
            field: 'phone',
            fieldError: formFieldErrorValidator.phone,
            tab: 0,
        };
        this.street = {
            field: 'address.street',
            fieldError: formFieldErrorValidator.street,
            tab: 0,
        };
        this.number = {
            field: 'address.number',
            fieldError: formFieldErrorValidator.number,
            tab: 0,
        };
    }
};



let context: any;
export default class FieldValidatorForm {
    public fieldsToValidate: Ref<FieldsToValidate>;
    stepperControlValues: any[];
    form: Ref<UserModel>;

    constructor(fieldsToValidate: Ref<FieldsToValidate>, form: Ref<UserModel>, stepperControlValues: any[]) {
        this.fieldsToValidate = fieldsToValidate;
        this.form = form;
        this.stepperControlValues = stepperControlValues;
        context = this;
    }

    removeFieldError(e: any) {
        if (context.fieldsToValidate.value.hasOwnProperty(e.target.name)) {
            context.fieldsToValidate.value[e.target.name].fieldError.error = false;
        }
    }

    validateDocument = () => {
        const document = this.form.value.document;
        if (document) {
            const isValid = cpf.isValid(document);
            if (!isValid) {
                context.fieldsToValidate.value.document.error = true;
                context.fieldsToValidate.value.titleMessage = "CPF inválido";
                context.fieldsToValidate.value.bodyMessage = "Documento não atende aos critérios de validação!";
            } else {
                context.fieldsToValidate.value.document.error = false;
                context.fieldsToValidate.value.document.titleMessage = "";
                context.fieldsToValidate.value.document.fieldError.bodyMessage = "";
            }
        }
    };

    validateRequiredFields() {
        let hasErrorOnInitTab = false;
        let hasErrorOnContactTab = false;

        Object.keys(context.fieldsToValidate.value).forEach((fieldKey) => {
            const { tab, field, fieldError } = context.fieldsToValidate.value[fieldKey];
            const keys = field.split('.');
            let fieldValue: any = this.form.value;

            for (const key of keys) {
                if (!fieldValue || !fieldValue.hasOwnProperty(key)) {
                    if (tab === 0) {
                        hasErrorOnInitTab = true;
                    } else {
                        hasErrorOnContactTab = true;
                    }
                    fieldError.error = true;
                    break;
                }
                fieldValue = fieldValue[key as keyof typeof this.form.value];
            }

            if (!fieldValue) {
                if (tab === 0) {
                    hasErrorOnInitTab = true;
                } else {
                    hasErrorOnContactTab = true;
                }
                fieldError.error = true;
            } else {
                fieldError.error = false;
            }
            return true;
        });

        if (hasErrorOnInitTab) {
            context.switchTabInit();
            return false;
        }

        if (hasErrorOnContactTab) {
            context.switchTabContact();
            return false;
        }
        return true;
    }

    switchTabInit() {
        context.stepperControlValues.value[1].active = false;
        context.stepperControlValues.value[0].active = true;
    }

    witchTabContact() {
        context.stepperControlValues.value[0].active = false;
        context.stepperControlValues.value[1].active = true;
    }
}