import {initialCards} from './initialCards.js'
import Card from './card.js'
import {FormValidator} from './FormValidator.js'
import {enableValidationObj} from './enableValidationObj.js'
import UserInfo from './UserInfo.js'
import PopupWithForm from './PopupWithForm.js'
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js'
import {
  profileEditButton,
  profileEditPopup,
  inputPopupProfileName,
  inputPopupProfileAbout,
  profileName,
  profileAbout,
  popupAddCard,
  profileAddButton,
  showPopupMesto
} from './components.js'

profileEditButton.addEventListener('click', () => { //ОТКРОЕТ ПОПАП ПРОФИЛЯ
  const data = userInfo.getUserInfo()
  inputPopupProfileName.value = data.userName; // присваиваем в строках ввода значения из профайла
  inputPopupProfileAbout.value = data.userAbout;
  popupEditProfile.open();
});

const userInfo = new UserInfo({ // ПРИСВОИТ НОВЫЕ ЗНАЧЕНИЯ ИНФОРМАЦИИ О ПРОФИЛЕ
  userName: profileName,
  userAbout: profileAbout
})

const popupEditProfile = new PopupWithForm({ // ЗАПИШЕТ НОВУЮ ИНФУ О ПРОФИЛЕ
  popupElement: profileEditPopup,
  handleFormSubmit: (input) => {
    const data = {
    userName: input['name'],
    userAbout: input['about']
    }
    userInfo.setUserInfo(data);
  }
});

popupEditProfile.setEventListeners();

const popupCard = new PopupWithForm({ // ДОБАВЛЕНИЕ КАРТОЧКИ
  popupElement: popupAddCard,
  handleFormSubmit: (input) => {
    const data = {
      name: input['name'],
      link: input['link']
    };
    section.addItem(createCard(data));
  }
});

profileAddButton.addEventListener('click', () => { // ОТКРОЕТ ПОПАП КАРТОЧКИ
  // formValidatorAddCard.disabledSubmitButton();
  popupCard.open();
});

const popupOpenMesto = new PopupWithImage(showPopupMesto); // ОТКРОЕТ ПОПАП БОЛЬШОЕ ФОТО
function createCard(cardData) {
  const card = new Card(
    {
      data: cardData,
      handleCardClick: () => {
        popupOpenMesto.open(cardData);
      }
    },
    '#card-template'
  );
  const cardElement = card.generateCard();
  return cardElement;
};

const section = new Section( // БЕРЕМ КАРТОЧКИ ИЗ МАССИВА
  { items: initialCards, renderer: renderCard },
  '.cards'
);

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

section.renderer(initialCards);

popupCard.setEventListeners();

popupOpenMesto.setEventListeners();

// валидация на попапы

const formValidatorAddCard = new FormValidator(enableValidationObj, popupAddCard);
formValidatorAddCard.enableValidation();

const formValidatorEditProfile = new FormValidator(enableValidationObj, profileEditPopup);
formValidatorEditProfile.enableValidation();
