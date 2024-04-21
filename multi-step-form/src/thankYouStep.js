import { createElementFromTemplate } from "./utils";

export default class ThankYouStep {
    render(container) {
        const thankYouElement = createElementFromTemplate("thank-you-template");
        container.classList.add("thank-you-container");
        container.prepend(thankYouElement);
    }
}
