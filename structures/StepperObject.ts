export default class StepperObject{
    label: string = '';
    active: boolean = false;
    
    constructor(label: string, active: boolean){
        this.label = label;
        this.active = active;
    }
}