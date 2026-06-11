import type { CardData } from "../types/types";

export class Card {
  private data: CardData;
  private selector: string;
  private element!: HTMLElement;
  private elementImage: HTMLImageElement;
  private handleCardClick: (title: string, image: string) => void;

  constructor(
    data: CardData,
    selector: string,
    handleCardClick: (title: string, image: string) => void,
  ) {
    this.data = data;
    this.selector = selector;
    this.element = this.getTemplate();
    this.elementImage = this.element.querySelector(
      ".card__image",
    ) as HTMLImageElement;
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
    console.log(this.elementImage + "ELEMENTO");
    console.log(this.data.link + "DATA");
    this.elementImage.src = this.data.link;
    this.elementImage.alt = this.data.link;

    const elementTitle = this.element.querySelector(
      ".card__title",
    ) as HTMLElement;
    elementTitle.textContent = this.data["place-name"];
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

    this.elementImage.addEventListener("click", () => {
      this.handleCardClick(this.data["place-name"], this.data.link);
    });
  }
}
