import { createElementFromTemplate } from "./utils";

export default class MultistepForm {
    #stepIndex = 0;
    #steps = [];
    #finalStep;
    formData;

    constructor(steps, finalStep, defaultFormData) {
        this.#steps = steps;
        this.#finalStep = finalStep;
        this.formData = {...defaultFormData};
        this.renderSidebar();
        this.onStepUpdate();
    }

    onStepUpdate() {
        this.renderStepHeader();
        this.renderStepBody();
        this.renderButtons();
        this.updateSidebarActiveStep();
    }

    renderSidebar() {
        const sidebarElement = document.querySelector(".sidebar");

        for (let i = 0; i < this.#steps.length; i++) {
            const stepName = this.#steps[i].getStepName();
            this.renderSidebarStep(sidebarElement, i + 1, stepName);
        }
    }

    renderSidebarStep(container, stepNumber, stepName) {
        const sidebarStepElement = createElementFromTemplate(
            "sidebar-step-template"
        );

        const stepNumberElement = sidebarStepElement.querySelector(".step-num");
        stepNumberElement.textContent = stepNumber;

        const stepInfoParagraphElement =
            sidebarStepElement.querySelector(".step-info p");
        stepInfoParagraphElement.textContent = `Step ${stepNumber}`;

        const stepNameElement = sidebarStepElement.querySelector("h2");
        stepNameElement.textContent = stepName;

        container.appendChild(sidebarStepElement);
    }

    updateSidebarActiveStep() {
        const sidebarElement = document.querySelector(".sidebar");
        const activeStepElement = sidebarElement.querySelector(".active");
        const stepElement = sidebarElement.querySelector(
            `.step:nth-child(${this.#stepIndex + 1}) .step-num`
        );

        if (activeStepElement) {
            activeStepElement.classList.toggle("active");
        }
        stepElement.classList.toggle("active");
    }

    renderStepHeader() {
        const stepHeaderElement = document.querySelector(".step-header");
        stepHeaderElement.innerHTML = "";
        this.#steps[this.#stepIndex].renderStepHeader(stepHeaderElement);
    }

    renderStepBody() {
        const stepBodyElement = document.querySelector(".step-body");
        stepBodyElement.innerHTML = "";
        this.#steps[this.#stepIndex].renderStepBody(stepBodyElement, this.formData);
    }

    renderButtons() {
        const bottomBarElement = document.querySelector(".bottom-bar");
        bottomBarElement.innerHTML = "";

        const lastStepIndex = this.#steps.length - 1;

        if (this.#stepIndex > 0 && this.#stepIndex <= lastStepIndex) {
            const backButtonElement = createElementFromTemplate(
                "back-button-template"
            );
            backButtonElement.addEventListener("click", () => {
                this.#stepIndex--;
                this.onStepUpdate();
            });
            bottomBarElement.prepend(backButtonElement);
        }

        if (this.#stepIndex < lastStepIndex) {
            const nextButtonElement = createElementFromTemplate(
                "next-button-template"
            );
            nextButtonElement.addEventListener("click", () => {
                if (!this.#steps[this.#stepIndex].validateStep()) {
                    return
                }
                this.#stepIndex++;
                this.onStepUpdate();
            });
            bottomBarElement.prepend(nextButtonElement);
        }

        if (this.#stepIndex === lastStepIndex) {
            const confirmButtonElement = createElementFromTemplate(
                "confirm-button-template"
            );
            confirmButtonElement.addEventListener("click", () => {
                this.#stepIndex++;
                this.renderFinalStep();
            });
            bottomBarElement.prepend(confirmButtonElement);
        }
    }

    renderFinalStep() {
        const stepContainerElement = document.querySelector(".step-container");
        stepContainerElement.innerHTML = "";
        this.#finalStep.render(stepContainerElement);
    }
}
