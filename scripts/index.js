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

initialCards.forEach((element) => {
  console.log(element[0]);
});

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
