import './index.css';
import Card from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {enableValidationObj} from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Api from '../components/Api.js'
import {
  profileEditButton,
  profileEditPopup,
  inputPopupProfileName,
  inputPopupProfileAbout,
  popupAddCard,
  profileAddButton,
  popupBasket,
  profileName,
  profileAbout,
  profileAvatar
} from '../utils/constants.js'

let myId; // хранит мой _id

// ВЗАИМОДЕЙСТВИЕ С СЕРВЕРОМ

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '9e13b88e-8a47-4c65-9992-ee33a8d52585'
  }
});

// УПРАВЛЕНИЕ ИНФОРМАЦИЕЙ О ПОЛЬЗОВАТЕЛЕ

const userInfo = new UserInfo({
  nameElement: '.profile__name',
  aboutElement: '.profile__about',
  avatarElement: '.profile__avatar'
});

api.getUserInfo() // получает данные о пользователе с сервера
  .then(userInfoData => {
    myId = userInfoData._id; // здесь я сохраняю свой _id в переменную

    userInfo.setUserInfo({ // устанавливает данные на странице
      name: userInfoData.name,
      about: userInfoData.about,
      avatar: userInfoData.avatar
    });
  })
  .catch(error => {
    console.log(error);
  });

const popupEditProfile = new PopupWithForm({ // редактирование профиля
  popupElement: '.popup_profile',
  handleFormSubmit: (input, callback) => {
    const data = {
      name: input['name'],
      about: input['about']
    };
    api.updateUserInfo(data)
      .then(() => {
        userInfo.setUserInfo(data);
        callback();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

// КАРТОЧКИ

const popupOpenMesto = new PopupWithImage('.popup-mesto'); // увеличивает изображение при клике на карточку

function createCard(cardData) { //создается экземпляр карточки
  const card = new Card(
    {
      data: cardData,
      handleCardClick: () => {
        popupOpenMesto.open(cardData);
      }
    },
    '#card-template'
  );
  const cardElement = card.generateCard(); // создает DOM-элемент карточки

  if (cardData.owner._id !== myId) { // удаляет корзинки с чужих карточек
    const basketElement = cardElement.querySelector('.card__basket');
    basketElement.remove();
  }

  return cardElement;
};

const cardList = new Section({ // отрисует карточки на странице
  renderer: (cardData) => {
    const card = createCard(cardData);
    cardList.addItem(card);
  }
}, '.cards')

api.getInitialCards() // получает список карточек с сервера
  .then((cards) =>{
    cardList.renderItems(cards); // полученные карточки передаются для отрисовки
  })
  .catch((error) => {
    console.log(error);
  });

const popupCard = new PopupWithForm({ // добавление карточек
  popupElement: '.popup_card',
  handleFormSubmit: (input, callback) => {
    const data = {
      name: input['name'],
      link: input['link']
    };
    api.addCard(data)
      .then((newCard) => {
        renderCard(newCard);
        callback();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

function renderCard(cardData) { // создает и добавляет новую карточку в список
  const cardElement = createCard(cardData);
  cardList.addItem(cardElement);
};

profileEditButton.addEventListener('click', () => { // обработчик для кнопки редактирования профиля, открытие попапа
  const userData = userInfo.getUserInfo();
  inputPopupProfileName.value = userData.name || '';
  inputPopupProfileAbout.value = userData.about || '';
  popupEditProfile.open();
});

profileAddButton.addEventListener('click', () => { // обработчик для кнопки добавления карточки, открытие попапа
  popupCard.open();
});

// ОБРАБОТЧИКИ ЗАКРЫТИЯ ПОПАПОВ

popupEditProfile.setEventListeners(); // редактирование профиля
popupCard.setEventListeners(); // добавление карточек
popupOpenMesto.setEventListeners(); // увеличенное фото
// popupBasket.setEventListeners(); // корзина

// ВАЛИДАЦИЯ ФОРМ В ПОПАПАХ

const formValidatorAddCard = new FormValidator(enableValidationObj, popupAddCard);
formValidatorAddCard.enableValidation();

const formValidatorEditProfile = new FormValidator(enableValidationObj, profileEditPopup);
formValidatorEditProfile.enableValidation();
