import { Popup } from "./Popup.js";

export type handleSubmitFunction<T> = (item: T) => void;

export class PopupWithForm<T> extends Popup {
  private handleSubmit: handleSubmitFunction<T>;
  private form: HTMLFormElement;

  constructor(popupSelector: string, handleSubmit: handleSubmitFunction<T>) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this.Submit = this.Submit.bind(this);
    this.form = this.modal.querySelector(".popup__form") as HTMLFormElement;
  }
  private getInputValues(): T {
    const values = this.form.querySelectorAll(
      ".popup__input",
    ) as NodeListOf<HTMLInputElement>;
    const arrValues = Array.from(values);
    const Inputs = arrValues.reduce(
      (obj, element) => ({ ...obj, [element.name]: element.value }),
      {} as T,
    );
    return Inputs;
  }
  public setEventListeners(): void {
    super.setEventListeners();

    this.form.addEventListener("submit", this.Submit);
  }
  private Submit(evt: SubmitEvent) {
    evt.preventDefault();
    this.handleSubmit(this.getInputValues());
  }
  protected removeEventListeners(): void {
    super.removeEventListeners();
    this.form.removeEventListener("submit", this.Submit);
  }
  public close(): void {
    this.form.reset();
    this.removeEventListeners();
    super.close();
  }
}
