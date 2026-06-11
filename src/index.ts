import { initialCards } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import type { CardData, FormEditValues } from "./types/types.js";
import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig } from "./utils/constants.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";

// QUERY SELECTORS

const editProfileButton = document.querySelector(
  ".profile__edit-button",
) as HTMLButtonElement;
const editProfileModal = document.querySelector("#edit-popup") as HTMLElement;

const editProfileForm = editProfileModal.querySelector(
  ".popup__form",
) as HTMLFormElement;

const addCardButton = document.querySelector(
  ".profile__add-button",
) as HTMLButtonElement;
const addCardModal = document.querySelector("#new-card-popup") as HTMLElement;

const addCardForm = addCardModal.querySelector(
  ".popup__form",
) as HTMLFormElement;

const imageModal = document.querySelector("#image-popup") as HTMLElement;
const closeImageModalButton = imageModal.querySelector(
  ".popup__close",
) as HTMLButtonElement;
const container = document.querySelector(".cards__list");

const profileValidator = new FormValidator(defaultFormConfig, editProfileForm);
profileValidator.enableValidation();
const FormCard = new FormValidator(defaultFormConfig, addCardForm);
FormCard.enableValidation();

// EDIT SUBMIT

const userProfile = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const handleEditSubmit = (values: FormEditValues) => {
  console.log(values.name);
  console.log(values.description);

  userProfile.setUserInfo({
    name: values.name,
    description: values.description,
  });
  popupEditModal.close();
};

// ADD CARD SUBMIT
const handleCardClick = (title: string, image: string) => {
  popupModal.setData(title, image);
  popupModal.open();
};

const handleAddCardSubmit = (values: CardData) => {
  const card = new Card(values, "#card__template", handleCardClick);
  const cardElement = card.generateCard();
  CardList.addItem(cardElement);
  popupAddCardModal.close();
};

// BUTTONS EVENTLISTENERS
const popupModal = new PopupWithImage("#image-popup");

const popupEditModal = new PopupWithForm<FormEditValues>(
  "#edit-popup",
  handleEditSubmit,
);

const popupAddCardModal = new PopupWithForm<CardData>(
  "#new-card-popup",
  handleAddCardSubmit,
);

editProfileButton.addEventListener("click", () => {
  popupEditModal.open();
});
addCardButton.addEventListener("click", () => {
  popupAddCardModal.open();
});

// RENDER CARDS

const CardList = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card__template", handleCardClick);
      const cardElement = card.generateCard();
      CardList.addItem(cardElement);
    },
  },
  ".cards__list",
);

CardList.renderItems();
