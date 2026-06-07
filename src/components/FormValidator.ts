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

  private formValidation(input: HTMLInputElement) {
    if (!input.validity.valid) {
      this.showInputError(input, input.validationMessage);
    } else {
      this.hideInputError(input);
    }
    this.toggleButtonState();
  }
  private toggleButtonState() {
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
  private setEventListeners() {
    const inputs = this.formElement.querySelectorAll(
      this.config.inputSelector,
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this.formValidation(input);
      });
    });
  }
  private showInputError(input: HTMLInputElement, errorMessage: string) {
    const errorElement = this.formElement.querySelector(
      `.${input.name}-input-error`,
    ) as HTMLInputElement;
    input.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
  }
  private hideInputError(input: HTMLInputElement) {
    const errorElement = this.formElement.querySelector(
      `.${input.name}-input-error`,
    ) as HTMLInputElement;
    input.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_active");
  }
  public enableValidation() {
    this.setEventListeners();
  }
  public resetValidation() {
    const inputs = this.formElement.querySelectorAll(
      this.config.inputSelector,
    ) as NodeListOf<HTMLInputElement>;
    inputs.forEach((input) => {
      this.hideInputError(input);
    });
  }
}
