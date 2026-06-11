import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.image = "";
        this.title = "";
    }
    setData(title, image) {
        this.image = image;
        this.title = title;
    }
    open() {
        const modalImage = this.modal.querySelector(".popup__image");
        const modalTitle = this.modal.querySelector(".popup__caption");
        modalImage.src = this.image;
        modalImage.alt = this.image;
        modalTitle.textContent = this.title;
        super.open();
    }
}
