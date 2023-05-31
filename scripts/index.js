import {FormValidator} from './validate.js'

// элементы PROFILE
const editButtonProfile = document.querySelector(".profile__edit-button");
const editPopupProfile = document.querySelector(".popup_profile");
const inputPopupProfileName = editPopupProfile.querySelector(".popup__input_type_name");
const inputPopupProfileAbout = editPopupProfile.querySelector(".popup__input_type_about");
const formPopupProfile = editPopupProfile.querySelector(".popup__form_profile");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
// элементы CARD
const addPopupCard = document.querySelector(".popup_card");
const addButtonCard = document.querySelector(".profile__add-button");
const formPopupCard = addPopupCard.querySelector(".popup__form_card");
const inputPopupCardPlace = addPopupCard.querySelector(".popup__input_type_place");
const inputPopupCardLink = addPopupCard.querySelector(".popup__input_type_link");
const templateCard = document.getElementById('card-template');
const cards = document.querySelector('.cards');
//элементы ESC
const escKey = 27;

// ОТКРЫТИЕ ЛЮБОГО ПОПАПА
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('mousedown', closeByOverlay);
};
// функция которая находит кнонку сабмит открытого попапа и делает ее неактивной
function disabledSubmitButton(popup) {
  const button = popup.querySelector('.popup__button-edit');
  button.classList.add('popup__button-edit_inactive');
  button.setAttribute('disabled', true);
}

// ЗАКРЫТИЕ ПОПАПОВ
// закрытие по ESC
function closeEsc(evt) {
  if (evt.keyCode === escKey) {
    closePopup(document.querySelector('.popup_opened'));
  };
};
// закрытие по ОВЕРЛЕЙ
function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};
// закрытие любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('mousedown', closeByOverlay);
};
// закрытие крестиками всех попапов
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// РЕДАКТИРОВАТЬ ПРОФИЛЬ
// открытие попапа
editButtonProfile.addEventListener('click', () => {
  openPopup(editPopupProfile);
  // присваиваем в строках ввода значения из профайла
  inputPopupProfileName.value = profileName.textContent;
  inputPopupProfileAbout.value = profileAbout.textContent;
});
// сохранение изменений. В скобки event
formPopupProfile.addEventListener('submit', (event) => {
  event.preventDefault(); // обязательно при работе с формами, чтобы форма без ведома никуда не отправлялась
  const name = inputPopupProfileName.value;
  const about = inputPopupProfileAbout.value;
  // указываю куда сохранятся изменения
  profileName.textContent = name;
  profileAbout.textContent = about;
  disabledSubmitButton(editPopupProfile);
  closePopup(editPopupProfile);
});

// КАРТОЧКИ
// СОЗДАНИЕ КАРТОЧЕК ИЗ МАССИВА
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const showPopupMesto = document.querySelector(".popup-mesto");
const mestoName = document.querySelector('.popup-mesto__name');
const mestoMask = document.querySelector('.popup-mesto__mask');
  
class Card {
  constructor(data, templateSelector) { // конструктор получает объект
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() { // это метод, который возвращает разметку классу Card, забирает ее из HTML и клонирует элемент
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement; // возвращает DOM-элемент
  }

  generateCard() { // метод готовит карточку к публикации
    this._element = this._getTemplate(); // здесь запишем разметку
    this._setEventListeners();
    this._element.querySelector('.card__mask').src = this._link; // добавление данных
    this._element.querySelector('.card__place').textContent = this._name;
    return this._element // возврат элемента наружу
  }

  _setEventListeners() {
    this._element.querySelector('.card__hurt').addEventListener('click', () => { // лайки
      this._cardHurt();
    });
    this._element.querySelector('.card__basket').addEventListener('click', () => { // корзина
      this._cardBasket();
    })
    this._element.querySelector('.card__mask').addEventListener('click', () => {  // посмотреть фото
      this._showPopupMesto();
    })
  }

  _cardHurt() { // метод лайки
    this._element.querySelector('.card__hurt').classList.toggle('card__hurt_active')
  }

  _cardBasket() { // метод корзина
    this._element.querySelector('.card__basket').closest('.card').remove()
  }

  _showPopupMesto() { // метод просмотра фото
    mestoMask.src = this._link;
    mestoName.textContent = this._name;
    openPopup(showPopupMesto);
  }
}

initialCards.forEach(function (item) {
  const card = new Card(item, '.card-template_type_default'); // создание экземпляра карточки
  const cardElement = card.generateCard(); // создание карточки и возврат наружу
  document.querySelector('.cards').append(cardElement); // добавление в DOM
});


// открытие попапа карточек
addButtonCard.addEventListener('click', () => {
  openPopup(addPopupCard);
});

// ДОБАВЛЯЕТ ЭЛЕМЕНТ В НАЧАЛО БЛОКА
function renderImageCard(imageCard) {
  cards.prepend(imageCard);
};

// КНОПКА СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ
formPopupCard.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = inputPopupCardPlace.value;
  const link = inputPopupCardLink.value;

  const imageData = {
    name,
    link,
  };

  renderImageCard(createCard(imageData));
  formPopupCard.reset();
  disabledSubmitButton(addPopupCard);
  closePopup(addPopupCard);
});