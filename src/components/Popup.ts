export class Popup {
  protected modal: HTMLElement;
  private closeButton: HTMLButtonElement;
  constructor(popupSelector: string) {
    this.modal = document.querySelector(popupSelector) as HTMLElement;
    this.handleEscClose = this.handleEscClose.bind(this);
    this.handleOverlayClose = this.handleOverlayClose.bind(this);
    this.close = this.close.bind(this);
    this.closeButton = this.modal.querySelector(
      ".popup__close",
    ) as HTMLButtonElement;
  }
  protected handleEscClose(evt: KeyboardEvent) {
    if (
      evt.key === "Escape" &&
      this.modal.classList.contains("popup_is-opened")
    ) {
      this.close();
    }
  }
  protected handleOverlayClose(evt: MouseEvent) {
    if (evt.target === this.modal) {
      this.close();
    }
  }
  public setEventListeners() {
    this.closeButton.addEventListener("click", this.close);
    this.modal.addEventListener("click", this.handleOverlayClose);
    window.addEventListener("keydown", this.handleEscClose);
  }
  protected removeEventListeners() {
    this.closeButton.addEventListener("click", this.close);
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
