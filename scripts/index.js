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

const profileSection = document.querySelector(".profile");
const editProfileButton = profileSection.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const closeEditProfileButton = editProfileModal.querySelector(".popup__close");
const editProfileForm = editProfileModal.querySelector(".popup__form");

editProfileButton.addEventListener("click", handleOpenEditModal);

closeEditProfileButton.addEventListener("click", () =>
  closeModal(editProfileModal),
);

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

function handleOpenEditModal() {
  openModal(editProfileModal);
  fillProfileForm();
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  const nameInput = editProfileForm.querySelector(".popup__input_type_name");
  const name = profileSection.querySelector(".profile__title");
  const descriptionInput = editProfileForm.querySelector(
    ".popup__input_type_description",
  );
  const description = profileSection.querySelector(".profile__description");
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
  console.log(name.textContent);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = editProfileForm.querySelector(".popup__input_type_name");
  const name = profileSection.querySelector(".profile__title");
  const descriptionInput = editProfileForm.querySelector(
    ".popup__input_type_description",
  );
  const description = profileSection.querySelector(".profile__description");
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

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

  const elementTitle = cardElement.querySelector(".card__title");
  elementTitle.textContent = title;
  return cardElement;
}

function renderCard() {
  const container = document.querySelector(".cards__list");

  initialCards.forEach((card) => {
    const cardElement = getCardElement(card[0], card[1]);
    container.appendChild(cardElement);
  });
}

renderCard();
