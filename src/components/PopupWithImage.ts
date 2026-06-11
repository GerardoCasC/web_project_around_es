import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  private image: string;
  private title: string;

  constructor(popupSelector: string) {
    super(popupSelector);
    this.image = "";
    this.title = "";
  }
  public setData(title: string, image: string): void {
    this.image = image;
    this.title = title;
  }
  public open(): void {
    const modalImage = this.modal.querySelector(
      ".popup__image",
    ) as HTMLImageElement;
    const modalTitle = this.modal.querySelector(
      ".popup__caption",
    ) as HTMLElement;
    modalImage.src = this.image;
    modalImage.alt = this.image;
    modalTitle.textContent = this.title;
    super.open();
  }
}
