export const escKey = 27;
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileEditPopup = document.querySelector(".popup_profile");
export const inputPopupProfileName = profileEditPopup.querySelector(".popup__input_type_name");
export const inputPopupProfileAbout = profileEditPopup.querySelector(".popup__input_type_about");
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");
export const profileAvatar = document.querySelector(".profile__avatar")
export const popupAddCard = document.querySelector(".popup_card");
export const profileAddButton = document.querySelector(".profile__add-button");
export const showPopupMesto = document.querySelector(".popup-mesto");
export const popupBasket = document.querySelector(".popup_basket");
export const profileEditAvatar = document.querySelector(".profile__edit-avatar");
export const inpupPopupAvatar = document.querySelector(".popup__input_type_avatar");
export const popupAvatar = document.querySelector(".popup_avatar")

export {enableValidationObj}

// массив для валидации
const enableValidationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-edit',
  inactiveButtonClass: 'popup__button-edit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
}
