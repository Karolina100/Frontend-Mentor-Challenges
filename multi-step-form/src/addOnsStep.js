import FormStep from "./formStep";
import { createElementFromTemplate, renderHeader } from "./utils";

export default class AddOnsStep extends FormStep {
    #addOnCards = [];

    constructor(addOnCards) {
        super();
        this.#addOnCards = addOnCards;
    }

    getStepName() {
        return "Add-ons";
    }

    renderStepHeader(container) {
        const title = "Pick add-ons";
        const description = "Add-ons help enhance your gaming experience.";
        renderHeader(container, title, description);
    }

    renderAddOnCard(
        container,
        addOnName,
        addOnDescription,
        addOnPrice,
        paymentPeriod
    ) {
        const addOnCardElement = createElementFromTemplate(
            "add-on-card-template"
        );
        const contentElement =
            addOnCardElement.querySelector(".add-on-content");

        const addOnNameElement = contentElement.querySelector(".add-on-name");
        addOnNameElement.textContent = addOnName;

        const addOnDescriptionElement = contentElement.querySelector(
            ".add-on-description"
        );
        addOnDescriptionElement.textContent = addOnDescription;

        const addOnPriceElement =
            addOnCardElement.querySelector(".add-on-price");
        addOnPriceElement.textContent = `$${addOnPrice}/${
            paymentPeriod === "month" ? "mo" : "yr"
        }`;

        container.appendChild(addOnCardElement);
    }

    renderStepBody(container, data) {
        const addOnsFormElement = createElementFromTemplate(
            "add-ons-form-template"
        );

        const paymentPeriod = data.selectedPlan.paymentPeriod;

        data.selectedAddOns = data.selectedAddOns.filter(
            (addOn) => addOn.paymentPeriod === paymentPeriod
        );

        for (let card of this.#addOnCards) {
            const price =
                paymentPeriod === "year" ? card.yearlyPrice : card.monthlyPrice;
            this.renderAddOnCard(
                addOnsFormElement,
                card.name,
                card.description,
                price,
                paymentPeriod
            );
        }

        container.appendChild(addOnsFormElement);

        this.addOnChangeCallbacks(data);
        this.prefillForm(data);
    }

    addOnChangeCallbacks(data) {
        const addOnInputElements =
            document.querySelectorAll(".add-on-checkbox");
        const paymentPeriod = data.selectedPlan.paymentPeriod;
        const priceProperty =
            paymentPeriod === "month" ? "monthlyPrice" : "yearlyPrice";

        for (let i = 0; i < addOnInputElements.length; i++) {
            const addOnName = this.#addOnCards[i].name;
            const addOnPrice = this.#addOnCards[i][priceProperty];

            addOnInputElements[i].addEventListener("change", () => {
                if (addOnInputElements[i].checked) {
                    data.selectedAddOns.push({
                        addOnName,
                        addOnPrice,
                        paymentPeriod,
                    });
                } else {
                    data.selectedAddOns = data.selectedAddOns.filter(
                        (addOn) =>
                            addOn.addOnName !== addOnName ||
                            addOn.addOnPrice !== addOnPrice
                    );
                }
            });
        }
    }

    prefillForm(data) {
        const addOnInputElements =
            document.querySelectorAll(".add-on-checkbox");
        const addOnNameElements = document.querySelectorAll(".add-on-name");
        const addOnNames = Array.from(addOnNameElements).map(
            (element) => element.textContent
        );

        for (let addOn of data.selectedAddOns) {
            const elementIndex = addOnNames.indexOf(addOn.addOnName);
            if (elementIndex !== -1) {
                addOnInputElements[elementIndex].checked = true;
            }
        }
    }
}
