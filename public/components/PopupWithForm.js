import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this.handleSubmit = handleSubmit;
        this.Submit = this.Submit.bind(this);
        this.form = this.modal.querySelector(".popup__form");
    }
    getInputValues() {
        const values = this.form.querySelectorAll(".popup__input");
        const arrValues = Array.from(values);
        const Inputs = arrValues.reduce((obj, element) => (Object.assign(Object.assign({}, obj), { [element.name]: element.value })), {});
        return Inputs;
    }
    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener("submit", this.Submit);
    }
    Submit(evt) {
        evt.preventDefault();
        this.handleSubmit(this.getInputValues());
    }
    removeEventListeners() {
        super.removeEventListeners();
        this.form.removeEventListener("submit", this.Submit);
    }
    close() {
        this.form.reset();
        this.removeEventListeners();
        super.close();
    }
}
