import FormStep from "./formStep";
import { createElementFromTemplate, renderHeader } from "./utils";

export default class PlanStep extends FormStep {
    #planCards = [];

    constructor(planCards) {
        super();
        this.#planCards = planCards;
    }

    getStepName() {
        return "Select plan";
    }

    renderStepHeader(container) {
        const title = "Select your plan";
        const description = "You have the option of monthly or yearly billing.";
        renderHeader(container, title, description);
    }

    renderStepBody(container, data) {
        const planFormElement = createElementFromTemplate("plan-form-template");

        const planCardsContainerElement =
            planFormElement.querySelector(".plan-cards");
        this.renderPlanCards(
            planCardsContainerElement,
            data.selectedPlan.paymentPeriod
        );

        const switchElement = planFormElement.querySelector(".switch input");
        switchElement.addEventListener("input", () => {
            const paymentPeriod = this.getPaymentPeriod(switchElement);
            this.renderPlanCards(planCardsContainerElement, paymentPeriod);

            this.switchPeriodsStyle(planFormElement)

            this.addOnChangeCallbacks(planFormElement, data);
        });

        container.appendChild(planFormElement);

        this.addOnChangeCallbacks(planFormElement, data);
        this.prefillPlanForm(planFormElement, data)
    }

    switchPeriodsStyle(planFormElement) {
        const monthlyElement = planFormElement.querySelector(".monthly");
        const yearlyElement = planFormElement.querySelector(".yearly");
        monthlyElement.classList.toggle("chosen-period");
        yearlyElement.classList.toggle("chosen-period");
    }

    getPaymentPeriod(switchElement) {
        return switchElement.checked ? "year" : "month";
    }

    renderPlanCards(container, paymentPeriod) {
        container.innerHTML = "";

        for (let card of this.#planCards) {
            const price =
                paymentPeriod === "year" ? card.yearlyPrice : card.monthlyPrice;
            this.renderPlanCard(
                container,
                card.iconPath,
                card.name,
                price,
                paymentPeriod
            );
        }
    }

    renderPlanCard(container, iconPath, planName, planPrice, paymentPeriod) {
        const planCardElement = createElementFromTemplate("plan-card-template");
        const cardTextElement = planCardElement.querySelector(".card-text");

        const planIconElement = planCardElement.querySelector("img");
        planIconElement.src = iconPath;

        const planNameElement = cardTextElement.querySelector(".plan-name");
        planNameElement.textContent = planName;

        const planPriceElement = cardTextElement.querySelector(".plan-price");
        planPriceElement.textContent = `$${planPrice}/${
            paymentPeriod === "month" ? "mo" : "yr"
        }`;

        if (paymentPeriod === "year") {
            const discountElement = document.createElement("p");
            discountElement.textContent = "2 months free";
            discountElement.className = "plan-discount";
            cardTextElement.appendChild(discountElement);
        }

        container.appendChild(planCardElement);
    }

    addOnChangeCallbacks(planFormElement, data) {
        const planInputElements = planFormElement.querySelectorAll(".plan-input");
        const switchElement = planFormElement.querySelector(".switch input")

        for (let i = 0; i < planInputElements.length; i++) {
            planInputElements[i].addEventListener("change", () => {
                const paymentPeriod = this.getPaymentPeriod(switchElement);
                data.selectedPlan.planName = this.#planCards[i].name;

                if (paymentPeriod === "year") {
                    data.selectedPlan.planPrice =
                        this.#planCards[i].yearlyPrice;
                } else {
                    data.selectedPlan.planPrice =
                        this.#planCards[i].monthlyPrice;
                }

                data.selectedPlan.paymentPeriod = paymentPeriod;
            });
        }
    }

    prefillPlanForm(planFormElement, data) {
        const switchElement = planFormElement.querySelector(".switch input")
        if (data.selectedPlan.paymentPeriod === "year") {
            switchElement.checked = true
            this.switchPeriodsStyle(planFormElement)
        }

        const planNameElements = planFormElement.querySelectorAll(".plan-name")
        const planInputElements = planFormElement.querySelectorAll(".plan-input")
        for (let i = 0; i < planInputElements.length; i++) {
            if (planNameElements[i].textContent === data.selectedPlan.planName) {
                planInputElements[i].checked = true
            }
        }
    }

    validateStep() {
        const checkedInputElement = document.querySelector(
            "input[type='radio']:checked"
        );

        if (!checkedInputElement) {
            const labelElements = document.querySelectorAll(".plan-card");
            labelElements.forEach((element) => {
                element.classList.add("shake");
                setTimeout(() => element.classList.remove("shake"), 1000);
            });
            return false;
        }
        return true;
    }
}
