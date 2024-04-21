export default class FormStep {
    getStepName() {
        throw new Error("Method 'getStepName()' must be implemented.");
    }

    renderStepHeader(container) {
        throw new Error("Method 'renderHeader()' must be implemented.");
    }

    renderStepBody(container) {
        throw new Error("Method 'renderStepBody()' must be implemented.");
    }

    validateStep() {
        return true;
    }
}
