import './index.css';
import {initialCards} from '../utils/initialCards.js'
import Card from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {enableValidationObj} from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
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
} from '../utils/constants.js'

const userInfo = new UserInfo({ // ПРИСВОИТ НОВЫЕ ЗНАЧЕНИЯ ИНФОРМАЦИИ О ПРОФИЛЕ
  userName: '.profile__name',
  userAbout: '.profile__about'
})

const popupEditProfile = new PopupWithForm({ // ЗАПИШЕТ НОВУЮ ИНФУ О ПРОФИЛЕ
  popupElement: profileEditPopup,
  handleFormSubmit: (input, callback) => {
    const data = {
      userName: input['name'],
      userAbout: input['about']
    }
    userInfo.setUserInfo(data);
    callback();
  }
});

const popupCard = new PopupWithForm({ // ДОБАВЛЕНИЕ КАРТОЧКИ
  popupElement: popupAddCard,
  handleFormSubmit: (input, callback) => {
    const data = {
      name: input['name'],
      link: input['link']
    };
    renderCard(data);
    callback();
  }
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

profileEditButton.addEventListener('click', () => { //ОТКРОЕТ ПОПАП ПРОФИЛЯ
  const data = userInfo.getUserInfo()
  inputPopupProfileName.value = data.userName; // присваиваем в строках ввода значения из профайла
  inputPopupProfileAbout.value = data.userAbout;
  popupEditProfile.open();
});

profileAddButton.addEventListener('click', () => { // ОТКРОЕТ ПОПАП КАРТОЧКИ
  popupCard.open();
});

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
};

section.renderItems(initialCards);

popupEditProfile.setEventListeners();
popupCard.setEventListeners();
popupOpenMesto.setEventListeners();

// валидация на попапы

const formValidatorAddCard = new FormValidator(enableValidationObj, popupAddCard);
formValidatorAddCard.enableValidation();

const formValidatorEditProfile = new FormValidator(enableValidationObj, profileEditPopup);
formValidatorEditProfile.enableValidation();
