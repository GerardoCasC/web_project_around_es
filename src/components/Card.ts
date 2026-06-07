import type { CardData } from "../types/types";

export class Card {
  private data: CardData;
  private selector: string;
  private element!: HTMLElement;
  private handleCardClick: () => void;

  constructor(data: CardData, selector: string, handleCardClick: () => void) {
    this.data = data;
    this.selector = selector;
    this.handleCardClick = handleCardClick;
  }
  protected getTemplate(): HTMLElement {
    const cardTemplate = document.querySelector(
      this.selector,
    ) as HTMLTemplateElement;
    const cardElement = cardTemplate.content
      .querySelector(".card")!
      .cloneNode(true) as HTMLElement;

    return cardElement;
  }
  public generateCard() {
    this.element = this.getTemplate();
    const elementImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;
    elementImage.src = this.data.image;
    elementImage.alt = this.data.image;

    const elementTitle = this.element.querySelector(
      ".card__title",
    ) as HTMLElement;
    elementTitle.textContent = this.data.title;
    this.setEventListeners();
    return this.element;
  }
  private setEventListeners() {
    //3 delete, like, popup
    const likeButton = this.element.querySelector(
      ".card__like-button",
    ) as HTMLButtonElement;
    const deleteButton = this.element.querySelector(
      ".card__delete-button",
    ) as HTMLButtonElement;

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_is-active");
    });
    deleteButton.addEventListener("click", () => {
      this.element.remove();
    });

    this.element.addEventListener("click", this.handleCardClick);
  }
}
