export class FormValidator {
    constructor(defaultFormConfig, HTMLformElement) {
        this.formElement = HTMLformElement;
        this.config = defaultFormConfig;
    }
    _formValidation(input) {
        if (!input.validity.valid) {
            this._showInputError(input, input.validationMessage);
        }
        else {
            this._hideInputError(input);
        }
        this._toggleButtonState();
    }
    _toggleButtonState() {
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
    _setEventListeners() {
        const inputs = this.formElement.querySelectorAll(this.config.inputSelector);
        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                this._formValidation(input);
            });
        });
    }
    _showInputError(input, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${input.name}-input-error`);
        input.classList.add(this.config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    _hideInputError(input) {
        const errorElement = this.formElement.querySelector(`.${input.name}-input-error`);
        input.classList.remove(this.config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove("popup__input-error_active");
    }
    enableValidation() {
        this._setEventListeners();
    }
    resetValidation() {
        const inputs = this.formElement.querySelectorAll(this.config.inputSelector);
        inputs.forEach((input) => {
            this._hideInputError(input);
        });
    }
}
