import './index.css';
import Card from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {enableValidationObj} from '../utils/constants.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Api from '../components/Api.js'
import PopupWithBasket from '../components/PopupWithBasket.js'
import {
  profileEditButton,
  profileEditPopup,
  inputPopupProfileName,
  inputPopupProfileAbout,
  popupAddCard,
  profileAddButton,
  profileEditAvatar,
  inpupPopupAvatar,
  popupBasket,
  popupAvatar
} from '../utils/constants.js'

let myId; // хранит мой _id

// ВЗАИМОДЕЙСТВИЕ С СЕРВЕРОМ

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '9e13b88e-8a47-4c65-9992-ee33a8d52585'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()]) // параллельная загрузка данных пользователя и карточек с сервера
  .then(([data, cards]) => {
    myId = data._id;
    userInfo.setUserInfo(data);
    cardList.renderItems(cards);
  })
  .catch((error) => {
    console.log(error);
  })

function loading(popup, text) { // функция напишет ожидание на кнопке подтверждения
  const submitButton = popup.querySelector('.popup__button-edit')
  submitButton.textContent = text;
}

const popupWithBasket = new PopupWithBasket('.popup_basket'); // попап для подтверждения удаления карточки

// УПРАВЛЕНИЕ ИНФОРМАЦИЕЙ О ПОЛЬЗОВАТЕЛЕ

const userInfo = new UserInfo({
  nameElement: '.profile__name',
  aboutElement: '.profile__about',
  avatarElement: '.profile__avatar'
});

const popupEditProfile = new PopupWithForm({ // редактирование профиля
  popupElement: '.popup_profile',
  handleFormSubmit: (data, callback) => {
    loading(profileEditPopup, 'Сохранение...');
    api.updateUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        callback();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loading(profileEditPopup, 'Сохранить');
      })
  }
});

const popupEditAvatar = new PopupWithForm({ // редактирование аватара
  popupElement: '.popup_avatar',
  handleFormSubmit: (data, callback) => {
    loading(popupAvatar, 'Сохранение...');
    api.updateAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        callback();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loading(popupAvatar, 'Сохранить')
      })
  }
})

// КАРТОЧКИ

const popupOpenMesto = new PopupWithImage('.popup-mesto'); // увеличивает изображение при клике на карточку

function createCard(cardData) { //создается экземпляр карточки
  const card = new Card(
    {
      data: cardData,
      handleCardClick: () => {
        popupOpenMesto.open(cardData)
      },

      handleDeleteClick: () => {
        popupWithBasket.open();
        popupWithBasket.callbackSubmit(() => {
          loading(popupBasket, 'Удаление...');
          api.deleteMyCard(cardData._id) // вызов метода для удаления карточки
            .then((res) => {
              card.deleteCard(res);
              popupWithBasket.close();
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => {
              loading(popupBasket, 'Да');
            })         
        })
      },

      handleSetLike: (cardId) => {
        api.likeCard(cardId)
          .then(() => {
            card.handleLikeClick();
          })
          .catch((error) => {
            console.log(`handleSetLike - ${error}`);
          });
      },
      handleDeleteLike: (cardId) => {
        api.unlikeCard(cardId)
          .then(() => {
            card.handleLikeClick();
          })
          .catch((error) => {
            console.log(`handleDeleteLike - ${error}`);
          });
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

const popupCard = new PopupWithForm({ // добавление карточек
  popupElement: '.popup_card',
  handleFormSubmit: (input, callback) => {
    const data = {
      name: input['name'],
      link: input['link']
    };
    loading(popupAddCard, 'Сохранение...');
    api.addCard(data)
      .then((newCard) => {
        renderCard(newCard);
        callback();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loading(popupAddCard, 'Создать');
      })
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

profileEditAvatar.addEventListener('click', () => { // обработчик открытия попапа аватара
  const avatarData = userInfo.getUserInfo();
  inpupPopupAvatar.value = avatarData.avatar || '';
  popupEditAvatar.open();
});

profileAddButton.addEventListener('click', () => { // обработчик для кнопки добавления карточки, открытие попапа
  popupCard.open();
});

// ОБРАБОТЧИКИ ЗАКРЫТИЯ ПОПАПОВ

popupEditProfile.setEventListeners(); // редактирование профиля
popupCard.setEventListeners(); // добавление карточек
popupOpenMesto.setEventListeners(); // увеличенное фото
popupEditAvatar.setEventListeners(); // редактирование аватара
popupWithBasket.setEventListeners(); // удаление карточки

// ВАЛИДАЦИЯ ФОРМ В ПОПАПАХ

const formValidatorAddCard = new FormValidator(enableValidationObj, popupAddCard);
formValidatorAddCard.enableValidation();

const formValidatorEditProfile = new FormValidator(enableValidationObj, profileEditPopup);
formValidatorEditProfile.enableValidation();

const formValidatorAvatar = new FormValidator(enableValidationObj, popupAvatar);
formValidatorAvatar.enableValidation();