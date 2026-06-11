export class Card {
    constructor(data, selector, handleCardClick) {
        this.data = data;
        this.selector = selector;
        this.element = this.getTemplate();
        this.elementImage = this.element.querySelector(".card__image");
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this.selector);
        const cardElement = cardTemplate.content
            .querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    generateCard() {
        console.log(this.elementImage + "ELEMENTO");
        console.log(this.data.link + "DATA");
        this.elementImage.src = this.data.link;
        this.elementImage.alt = this.data.link;
        const elementTitle = this.element.querySelector(".card__title");
        elementTitle.textContent = this.data["place-name"];
        this.setEventListeners();
        return this.element;
    }
    setEventListeners() {
        //3 delete, like, popup
        const likeButton = this.element.querySelector(".card__like-button");
        const deleteButton = this.element.querySelector(".card__delete-button");
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
