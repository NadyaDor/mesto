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
  profileName,
  profileAbout,
  profileAvatar
} from '../utils/constants.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '70f24e40-981a-4d62-bb24-0aeaa2de0af4'
  }
});

const userInfo = new UserInfo({
  nameElement: '.profile__name',
  aboutElement: '.profile__about',
  avatarElement: '.profile__avatar'
});

api.getUserInfo() // получение данных о пользователе
  .then(userInfoData => {
    userInfo.setUserInfo({
      name: userInfoData.name,
      about: userInfoData.about,
      avatar: userInfoData.avatar
    });
  })
  .catch(error => {
    console.log(error);
  });

const popupOpenMesto = new PopupWithImage('.popup-mesto'); // ОТКРОЕТ ПОПАП БОЛЬШОЕ ФОТО
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

const cardList = new Section({
  renderer: (cardData) => {
    const card = createCard(cardData);
    cardList.addItem(card);
  }
}, '.cards')

api.getInitialCards()
  .then((cards) =>{
    cardList.renderItems(cards); // обработает полученные карточки
  })
  .catch((err) => {
    console.log(err);
  });

// const userInfo = new UserInfo({ // ПРИСВОИТ НОВЫЕ ЗНАЧЕНИЯ ИНФОРМАЦИИ О ПРОФИЛЕ
//   userName: '.profile__name',
//   userAbout: '.profile__about'
// })

const popupEditProfile = new PopupWithForm({
  popupElement: '.popup_profile',
  handleFormSubmit: (input, callback) => {
    const data = {
      name: input['name'],
      about: input['about']
    };
    api.updateUserInfo()
      .then(() => {
        userInfo.setUserInfo(data); // обновляем данные пользователя на странице
        callback(); // закрываем попап
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const popupCard = new PopupWithForm({ // ДОБАВЛЕНИЕ КАРТОЧКИ
  popupElement: '.popup_card',
  handleFormSubmit: (input, callback) => {
    const data = {
      name: input['name'],
      link: input['link']
    };
    renderCard(data);
    callback();
  }
});

// const section = new Section( // БЕРЕМ КАРТОЧКИ ИЗ МАССИВА
//   { items: initialCards, renderer: renderCard },
//   '.cards'
// );

profileEditButton.addEventListener('click', () => { //ОТКРОЕТ ПОПАП ПРОФИЛЯ
  const userData = userInfo.getUserInfo();
  inputPopupProfileName.value = userData.name || ''; // Присваиваем значение поля name
  inputPopupProfileAbout.value = userData.about || ''; // Присваиваем значение поля about
  popupEditProfile.open();
});

profileAddButton.addEventListener('click', () => { // ОТКРОЕТ ПОПАП КАРТОЧКИ
  popupCard.open();
});

// function renderCard(cardData) {
//   const cardElement = createCard(cardData);
//   section.addItem(cardElement);
// };

// section.renderItems(initialCards);

popupEditProfile.setEventListeners();
popupCard.setEventListeners();
popupOpenMesto.setEventListeners();

// валидация на попапы

const formValidatorAddCard = new FormValidator(enableValidationObj, popupAddCard);
formValidatorAddCard.enableValidation();

const formValidatorEditProfile = new FormValidator(enableValidationObj, profileEditPopup);
formValidatorEditProfile.enableValidation();
