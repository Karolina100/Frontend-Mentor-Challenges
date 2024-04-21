import FormStep from "./formStep";
import { createElementFromTemplate, renderHeader } from "./utils";

export default class SummaryStep extends FormStep {
    getStepName() {
        return "Summary";
    }

    renderStepHeader(container) {
        const title = "Finishing up";
        const description =
            "Double-check everything looks OK before confirming.";
        renderHeader(container, title, description);
    }

    renderStepBody(container, data) {
        const summaryElement = createElementFromTemplate("summary-template");

        const planNameElement =
            summaryElement.querySelector(".summary-plan-name");
        planNameElement.textContent = `${data.selectedPlan.planName} (${
            data.selectedPlan.paymentPeriod === "year" ? "yearly" : "monthly"
        })`;

        const planPriceElement = summaryElement.querySelector(
            ".summary-plan-price"
        );
        planPriceElement.textContent = `$${data.selectedPlan.planPrice}/${
            data.selectedPlan.paymentPeriod === "year" ? "yr" : "mo"
        }`;

        const addOnsSummaryElement =
            summaryElement.querySelector(".add-ons-summary");
        this.renderSummaryAddOns(
            addOnsSummaryElement,
            data.selectedPlan,
            data.selectedAddOns
        );

        const totalTextElement = summaryElement.querySelector(".total-text");
        totalTextElement.textContent = `Total (per ${
            data.selectedPlan.paymentPeriod === "year" ? "year" : "month"
        })`;

        const totalPrice =
            data.selectedPlan.planPrice +
            data.selectedAddOns.reduce(
                (sum, current) => sum + current.addOnPrice,
                0
            );
        const totalPriceElement = summaryElement.querySelector(".total-price");
        totalPriceElement.textContent = `$${totalPrice}/${
            data.selectedPlan.paymentPeriod === "year" ? "yr" : "mo"
        }`;

        container.appendChild(summaryElement);
    }

    renderSummaryAddOns(container, selectedPlan, selectedAddOns) {
        for (let addOn of selectedAddOns) {
            const addOnElement = createElementFromTemplate(
                "add-on-summary-template"
            );
            const addOnNameElement = addOnElement.querySelector(
                ".summary-add-on-name"
            );
            addOnNameElement.textContent = addOn.addOnName;

            const addOnPriceElement = addOnElement.querySelector(
                ".summary-add-on-price"
            );
            addOnPriceElement.textContent = `$${addOn.addOnPrice}/${
                selectedPlan.paymentPeriod === "year" ? "yr" : "mo"
            }`;

            container.appendChild(addOnElement);
        }
    }
}
