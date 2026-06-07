export class Popup {
  private modal: HTMLElement;
  constructor(popupSelector: string) {
    this.modal = document.querySelector(popupSelector) as HTMLElement;
    this.handleEscClose = this.handleEscClose.bind(this);
    this.handleOverlayClose = this.handleOverlayClose.bind(this);
    this.close = this.close.bind(this);
  }
  private handleEscClose(evt: KeyboardEvent) {
    if (
      evt.key === "Escape" &&
      this.modal.classList.contains("popup_is-opened")
    ) {
      this.close();
    }
  }
  private handleOverlayClose(evt: MouseEvent) {
    if (evt.target === this.modal) {
      this.close();
    }
  }
  public setEventListeners() {
    const closeImageModalButton = this.modal.querySelector(
      ".popup__close",
    ) as HTMLButtonElement;

    closeImageModalButton.addEventListener("click", this.close);
    this.modal.addEventListener("click", this.handleOverlayClose);
    window.addEventListener("keydown", this.handleEscClose);
  }
  private removeEventListeners() {
    const closeImageModalButton = this.modal.querySelector(
      ".popup__close",
    ) as HTMLButtonElement;

    closeImageModalButton.removeEventListener("click", this.close);
    this.modal.removeEventListener("click", this.handleOverlayClose);
    window.removeEventListener("keydown", this.handleEscClose);
  }
  public open(): void {
    this.modal.classList.add("popup_is-opened");
    this.setEventListeners();
  }
  public close(): void {
    this.modal.classList.remove("popup_is-opened");
    this.removeEventListeners();
  }
}
