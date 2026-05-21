let initialCards = [
  [
    "Valle de Yosemite",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  ],
  [
    "Lago Louise",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  ],
  [
    "Montañas Calvas",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  ],
  [
    "Latemar",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  ],
  [
    "Parque Nacional de la Vanoise",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  ],
  [
    "Lago di Braies",
    "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  ],
];
// QUERY SELECTORS

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const closeEditProfileButton = editProfileModal.querySelector(".popup__close");
const editProfileForm = editProfileModal.querySelector(".popup__form");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const closeAddCardButton = addCardModal.querySelector(".popup__close");
const addCardForm = addCardModal.querySelector(".popup__form");

const imageModal = document.querySelector("#image-popup");
const closeImageModalButton = imageModal.querySelector(".popup__close");

// RENDER CARDS
window.addEventListener("load", () => {
  renderCard();
});

function renderCard() {
  const container = document.querySelector(".cards__list");

  initialCards.forEach((card) => {
    const cardElement = getCardElement(card[0], card[1]);
    container.appendChild(cardElement);
  });
}

// CREATE TEMPLATES
function getCardElement(
  title = "Sin título",
  image = "./iamges/placeholder.jpg",
) {
  const cardTemplate = document.querySelector("#card__template");
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const elementImage = cardElement.querySelector(".card__image");
  elementImage.src = image;
  elementImage.alt = image;

  const elementTitle = cardElement.querySelector(".card__title");
  elementTitle.textContent = title;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  elementImage.addEventListener("click", () => handleOpenImageModal(image));
  return cardElement;
}

// OPEN/CLOSE MODAL
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

// OPEN IMAGE-MODAL
function handleOpenImageModal(image) {
  openModal(imageModal);

  const imageInput = imageModal.querySelector(".popup__image");
  imageInput.src = image;
  imageInput.alt = image;
}

// CLOSE IMAGE-MODAL
closeImageModalButton.addEventListener("click", () => closeModal(imageModal));
closeImageModalButton.removeEventListener("click", () =>
  closeModal(imageModal),
);

// OPEN EDIT-FORM MODAL
editProfileButton.addEventListener("click", handleOpenEditModal);

function handleOpenEditModal() {
  openModal(editProfileModal);
  fillProfileForm();
  handleInputMessageError(editProfileForm);
}

function fillProfileForm() {
  const nameInput = editProfileForm.querySelector(".popup__input_type_name");
  const name = document.querySelector(".profile__title");
  const descriptionInput = editProfileForm.querySelector(
    ".popup__input_type_description",
  );
  const description = document.querySelector(".profile__description");
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
}

// CLODE EDIT-FORM MODAL
closeEditProfileButton.addEventListener("click", () =>
  closeModal(editProfileModal),
);
closeEditProfileButton.removeEventListener("click", () =>
  closeModal(editProfileModal),
);

// SUBMIT EDIT-FORM MODAL
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = editProfileForm.querySelector(".popup__input_type_name");
  const name = document.querySelector(".profile__title");
  const descriptionInput = editProfileForm.querySelector(
    ".popup__input_type_description",
  );
  const description = document.querySelector(".profile__description");
  const inputs = editProfileForm.querySelectorAll(".popup__input");

  let formValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage, editProfileForm);
      formValid = false;
    }
  });
  if (!formValid) {
    return;
  }
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

// OPEN ADD-CARD MODAL
addCardButton.addEventListener("click", handleOpenAddModal);

function handleOpenAddModal() {
  openModal(addCardModal);
  handleInputMessageError(addCardForm);
}

// CLOSE ADD-CARD MODAL
closeAddCardButton.addEventListener("click", () => closeModal(addCardModal));
closeAddCardButton.removeEventListener("click", () => closeModal(addCardModal));

// SUBMIT ADD-CARD MODAL
addCardForm.addEventListener("submit", handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const titleInput = addCardForm.querySelector(".popup__input_type_card-name");
  const imageInput = addCardForm.querySelector(".popup__input_type_url");
  const newCardElement = getCardElement(titleInput.value, imageInput.value);
  const container = document.querySelector(".cards__list");
  const inputs = addCardForm.querySelectorAll(".popup__input");

  let formValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage, addCardForm);
      formValid = false;
    }
  });
  if (!formValid) {
    return;
  }

  container.appendChild(newCardElement);
  addCardForm.reset();
  closeModal(addCardModal);
}

// SHOW/HIDE-ERROR INPUT
const handleInputMessageError = (form) => {
  const inputs = form.querySelectorAll(".popup__input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage, form);
      } else {
        hideInputError(input, form);
      }
      toggleButtonState(form);
    });
  });
};

const showInputError = (inputElement, errorMessage, form) => {
  const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (inputElement, form) => {
  const errorElement = form.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

// ACTIVAR/DESACTIVAR BOTÓN FORM
function toggleButtonState(form) {
  const submitButton = form.querySelector(".popup__button");
  const inputs = form.querySelectorAll(".popup__input");
  const allValid = Array.from(inputs).every((input) => input.validity.valid);
  submitButton.disabled = !allValid;
}
