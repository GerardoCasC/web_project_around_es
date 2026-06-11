export const defaultFormConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type-error",
    errorClass: "popup__input-error_active",
};
export let initialCards = [
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
].map(([title, image]) => ({
    "place-name": title,
    link: image,
}));
