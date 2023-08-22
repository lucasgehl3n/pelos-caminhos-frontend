export default function ProgressBarControl(dynamicWidth: { value: string }, interval: number, time: number, callback: Function) {
    setTimeout(() => {
        callback();
    }, time);

    const percentsPerCycle = 100 / (time / interval);
    let currentStep = 0;

    setInterval(() => {
        currentStep += percentsPerCycle;
        dynamicWidth.value = `${currentStep}%`;
    }, interval);
}