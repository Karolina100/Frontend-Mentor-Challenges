import FormStep from "./formStep";
import { createElementFromTemplate, renderHeader } from "./utils";

export default class PersonalInfoStep extends FormStep {
    getStepName() {
        return "Your info";
    }

    renderStepHeader(container) {
        const title = "Personal info";
        const description =
            "Please provide your name, email address and phone number.";
        renderHeader(container, title, description);
    }

    renderStepBody(container, data) {
        const formElement = createElementFromTemplate(
            "personal-info-form-template"
        );
        container.appendChild(formElement);

        this.prefillInputs(data);
        this.addOnBlurCallbacks();
        this.addOnChangeCallbacks(data);
    }

    addOnBlurCallbacks() {
        const inputElements = document.querySelectorAll("input");
        const regexArray = [
            /\p{Lu}{1}\p{Ll}+ \p{Lu}{1}\p{Ll}+/u,
            /[a-z0-9\.]+@[a-z]+\.[a-z]+/,
            /\+[0-9\s]+/,
        ];
        const incorrectInputElements = document.querySelectorAll(
            ".incorrect-input-text"
        );

        for (let i = 0; i < inputElements.length; i++) {
            inputElements[i].addEventListener("blur", () => {
                if (!inputElements[i].value.match(regexArray[i])) {
                    inputElements[i].classList.add("incorrect-input");
                    incorrectInputElements[i].classList.add("visible");
                } else {
                    inputElements[i].classList.remove("incorrect-input");
                    incorrectInputElements[i].classList.remove("visible");
                }
            });
        }
    }

    addOnChangeCallbacks(data) {
        const inputElements = document.querySelectorAll("input");
        const keyNames = ["fullName", "emailAddress", "phoneNumber"];

        for (let i = 0; i < inputElements.length; i++) {
            inputElements[i].addEventListener("change", () => {
                const keyName = keyNames[i];
                data[keyName] = inputElements[i].value;
            });
        }
    }

    prefillInputs(data) {
        const inputElements = document.querySelectorAll("input");
        inputElements[0].value = data.fullName;
        inputElements[1].value = data.emailAddress;
        inputElements[2].value = data.phoneNumber;
    }

    validateStep() {
        const inputElements = document.querySelectorAll("input");
        const incorrectInputElements = document.querySelectorAll(
            ".incorrect-input-text"
        );

        for (let i = 0; i < inputElements.length; i++) {
            if (!inputElements[i].value.trim()) {
                inputElements[i].classList.add("incorrect-input");
                incorrectInputElements[i].classList.add("visible");
            }
        }

        for (let input of inputElements) {
            if (input.classList.contains("incorrect-input")) {
                return false;
            }
        }

        return true;
    }
}
