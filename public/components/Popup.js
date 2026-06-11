export class Popup {
    constructor(popupSelector) {
        this.modal = document.querySelector(popupSelector);
        this.handleEscClose = this.handleEscClose.bind(this);
        this.handleOverlayClose = this.handleOverlayClose.bind(this);
        this.close = this.close.bind(this);
        this.closeButton = this.modal.querySelector(".popup__close");
    }
    handleEscClose(evt) {
        if (evt.key === "Escape" &&
            this.modal.classList.contains("popup_is-opened")) {
            this.close();
        }
    }
    handleOverlayClose(evt) {
        if (evt.target === this.modal) {
            this.close();
        }
    }
    setEventListeners() {
        this.closeButton.addEventListener("click", this.close);
        this.modal.addEventListener("click", this.handleOverlayClose);
        window.addEventListener("keydown", this.handleEscClose);
    }
    removeEventListeners() {
        this.closeButton.addEventListener("click", this.close);
        this.modal.removeEventListener("click", this.handleOverlayClose);
        window.removeEventListener("keydown", this.handleEscClose);
    }
    open() {
        this.modal.classList.add("popup_is-opened");
        this.setEventListeners();
    }
    close() {
        this.modal.classList.remove("popup_is-opened");
        this.removeEventListeners();
    }
}
