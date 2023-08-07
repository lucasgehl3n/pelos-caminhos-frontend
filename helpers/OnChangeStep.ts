import StepperObject from "structures/StepperObject";

export default function OnChangeStep(step: StepperObject, stepperControlValues: Ref){
    const currentStep = stepperControlValues.value.find((x: StepperObject) => x === step);
    currentStep.active = true;
    const anotherSteps = stepperControlValues.value.filter((x: StepperObject) => x !== step);
    anotherSteps.forEach((x: StepperObject) => {
        x.active = false
    });
}