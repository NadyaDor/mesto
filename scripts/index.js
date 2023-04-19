// элементы PROFILE
const editButtonProfile = document.querySelector(".profile__edit-button");
const editPopupProfile = document.querySelector(".popup_profile");
const closePopupProfile = document.querySelector(".popup__close_profile");
const inputPopupProfileName = editPopupProfile.querySelector(".popup__name-input_type_name");
const inputPopupProfileAbout = editPopupProfile.querySelector(".popup__name-input_type_about");
const formPopupProfile = editPopupProfile.querySelector(".popup__form_profile");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
// элементы CARD
const addPopupCard = document.querySelector(".popup_element");
const addButtonCard = document.querySelector(".profile__add-button");
const closePopupCard = document.querySelector(".popup__close_element");
const formPopupCard = addPopupCard.querySelector(".popup__form_element");
const inputPopupCardPlace = addPopupCard.querySelector(".popup__name-input_type_place");
const inputPopupCardLink = addPopupCard.querySelector(".popup__name-input_type_link");
const templateCard = document.getElementById('element-template');
const cards = document.querySelector('.elements');
// элементы MESTO
const showPopupMesto = document.querySelector(".popup-mesto");
const closePopupMesto = document.querySelector(".popup__close_mesto");

// ФУНКЦИЯ ОТКРЫТИЯ ЛЮБОГО ПОПАПА
const openPopup = (popup) => {
  popup.classList.add('popup_opened')
}

// ФУНКЦИЯ ЗАКРЫТИЯ ЛЮБОГО ПОПАПА
const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}

// ОТКРЫТИЕ ПОПАПА ПРОФИЛЯ
editButtonProfile.addEventListener('click', () => {
  openPopup(editPopupProfile);
  // присваиваем в строках ввода значения из профайла
  inputPopupProfileName.value = profileName.textContent;
  inputPopupProfileAbout.value = profileAbout.textContent;
});

// ЗАКРЫТИЕ ПОПАПА ПРОФИЛЯ
closePopupProfile.addEventListener('click', () => {
  closePopup(editPopupProfile);
});

// КНОПКА СОХРАНИТЬ ИЗМЕНЕНИЯ В ПРОФИЛЕ. В скобки event
formPopupProfile.addEventListener('submit', (event) => {
  event.preventDefault(); // обязательно при работе с формами, чтобы форма без ведома никуда не отправлялась
  const name = inputPopupProfileName.value;
  const about = inputPopupProfileAbout.value;
  // указываю куда сохранятся изменения
  profileName.textContent = name;
  profileAbout.textContent = about;
  closePopup(editPopupProfile);
});

 // ФУНКЦИЯ ПРОСМОТР ФОТО
 function openImage(image) {
  showPopupMesto.querySelector('.popup-mesto__name').textContent = image.name;
  showPopupMesto.querySelector('.popup-mesto__mask').src = image.link;
  showPopupMesto.querySelector('.popup-mesto__mask').alt = image.name;
  openPopup(showPopupMesto);
};

// ЗАКРЫТИЕ ПРОСМОТРА ФОТО
closePopupMesto.addEventListener('click', () => {
  closePopup(showPopupMesto);
});

// ФУНКЦИЯ ДЛЯ КАРТОЧЕК
// 
const createCard = (imageData) => {
  const imageCard = templateCard.content.querySelector('.element').cloneNode(true);
  const cardBasket = imageCard.querySelector('.element__basket');
  const cardPlace = imageCard.querySelector('.element__place');
  const cardMask = imageCard.querySelector('.element__mask');

  cardPlace.textContent = imageData.name;
  cardMask.src = imageData.link;
  cardMask.alt = imageData.name;

  // функция корзина (этот вариант кода из совета из чата)
  cardBasket.addEventListener('click', function () {
    const deleteCard = cardBasket.closest('.element');
    deleteCard.remove();
  });

  // функция лайки (этот вариант кода из вебинара)
  const cardHurt = imageCard.querySelector('.element__hurt');
  const cardLike = () => {
    cardHurt.classList.toggle('element__hurt_active');
  };
    cardHurt.addEventListener('click', cardLike);

  // просмотр фото (функция написана выше)
  imageCard.querySelector('.element__mask').addEventListener('click', () => openImage(imageData));
  
  return imageCard;

};

// ФУНКЦИЯ ВСТАВЛЯЕТ ЭЛЕМЕНТЫ
const renderImageElement = (imageElement) => {
  cards.prepend(imageElement);
};

initialCards.forEach(function (image){
  const createNewCard = createCard(image);
  cards.prepend(createNewCard);
});

// ОТКРЫТИЕ ПОПАПА КАРТОЧЕК
addButtonCard.addEventListener('click', () => {
  openPopup(addPopupCard);
});

// ЗАКРЫТИЕ ПОПАПА КАРТОЧЕК
closePopupCard.addEventListener('click', () => {
  closePopup(addPopupCard);
});

// КНОПКА СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ
formPopupCard.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = inputPopupCardPlace.value;
  const link = inputPopupCardLink.value;

  const imageData = {
    name,
    link,
  };

  renderImageElement(createCard(imageData));
  closePopup(addPopupCard);
});