export class FormValidator {
    constructor(defaultFormConfig, HTMLformElement) {
        this.formElement = HTMLformElement;
        this.config = defaultFormConfig;
    }
    formValidation(input) {
        if (!input.validity.valid) {
            this.showInputError(input, input.validationMessage);
        }
        else {
            this.hideInputError(input);
        }
        this.toggleButtonState();
    }
    toggleButtonState() {
        const submitButton = this.formElement.querySelector(this.config.submitButtonSelector);
        const inputs = this.formElement.querySelectorAll(this.config.inputSelector);
        const allValid = Array.from(inputs).every((input) => input.validity.valid);
        if (!allValid) {
            submitButton.classList.add(this.config.inactiveButtonClass);
            submitButton.disabled = true;
        }
        else {
            submitButton.classList.remove(this.config.inactiveButtonClass);
            submitButton.disabled = false;
        }
    }
    setEventListeners() {
        const inputs = this.formElement.querySelectorAll(this.config.inputSelector);
        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this.formValidation(input);
            });
        });
    }
    showInputError(input, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${input.name}-input-error`);
        input.classList.add(this.config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    hideInputError(input) {
        const errorElement = this.formElement.querySelector(`.${input.name}-input-error`);
        input.classList.remove(this.config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove("popup__input-error_active");
    }
    enableValidation() {
        this.setEventListeners();
    }
    resetValidation() {
        const inputs = this.formElement.querySelectorAll(this.config.inputSelector);
        inputs.forEach((input) => {
            this.hideInputError(input);
        });
    }
}
