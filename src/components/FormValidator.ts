import type { defaultFormConfig } from "../utils/constants.js";

export class FormValidator {
  private config: defaultFormConfig;
  private formElement: HTMLFormElement;

  constructor(
    defaultFormConfig: defaultFormConfig,
    HTMLformElement: HTMLFormElement,
  ) {
    this.formElement = HTMLformElement;
    this.config = defaultFormConfig;
  }

  private _formValidation(input: HTMLInputElement) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
    this._toggleButtonState();
  }
  private _toggleButtonState() {
    const submitButton = this.formElement.querySelector(
      this.config.submitButtonSelector,
    ) as HTMLButtonElement;
    const inputs = this.formElement.querySelectorAll(
      this.config.inputSelector,
    ) as NodeListOf<HTMLInputElement>;
    const allValid = Array.from(inputs).every((input) => input.validity.valid);

    if (!allValid) {
      submitButton.classList.add(this.config.inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this.config.inactiveButtonClass);
      submitButton.disabled = false;
    }
  }
  private _setEventListeners() {
    const inputs = this.formElement.querySelectorAll(
      this.config.inputSelector,
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._formValidation(input);
      });
    });
  }
  private _showInputError(input: HTMLInputElement, errorMessage: string) {
    const errorElement = this.formElement.querySelector(
      `.${input.name}-input-error`,
    ) as HTMLInputElement;
    input.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
  }
  private _hideInputError(input: HTMLInputElement) {
    const errorElement = this.formElement.querySelector(
      `.${input.name}-input-error`,
    ) as HTMLInputElement;
    input.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_active");
  }
  public enableValidation() {
    this._setEventListeners();
  }
  public resetValidation() {
    const inputs = this.formElement.querySelectorAll(
      this.config.inputSelector,
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
