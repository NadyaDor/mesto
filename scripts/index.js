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
// элементы MESTO
const showPopupMesto = document.querySelector(".popup-mesto");
const mestoName = document.querySelector('.popup-mesto__name');
const mestoMask = document.querySelector('.popup-mesto__mask');
//элементы ESC
const escKey = 27;

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

// открытие ЛЮБОГО ПОПАПА
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('mousedown', closeByOverlay);
};

// закрытие ЛЮБОГО ПОПАПА
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

// открытие ПОПАПА ПРОФИЛЯ
editButtonProfile.addEventListener('click', () => {
  openPopup(editPopupProfile);
  // присваиваем в строках ввода значения из профайла
  inputPopupProfileName.value = profileName.textContent;
  inputPopupProfileAbout.value = profileAbout.textContent;
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

 // ПРОСМОТР ФОТО
 function openImage(image) {
  mestoName.textContent = image.name;
  mestoMask.src = image.link;
  mestoMask.alt = image.name;
  openPopup(showPopupMesto);
};

// ДЛЯ КАРТОЧЕК
// 
function createCard(imageData) {
  const imageCard = templateCard.content.querySelector('.card').cloneNode(true);
  const cardBasket = imageCard.querySelector('.card__basket');
  const cardPlace = imageCard.querySelector('.card__place');
  const cardMask = imageCard.querySelector('.card__mask');

  cardPlace.textContent = imageData.name;
  cardMask.src = imageData.link;
  cardMask.alt = imageData.name;

  // функция корзина (этот вариант кода из совета из чата)
  cardBasket.addEventListener('click', function () {
    const deleteCard = cardBasket.closest('.card');
    deleteCard.remove();
  });

  // функция лайки (этот вариант кода из вебинара)
  const cardHurt = imageCard.querySelector('.card__hurt');
  function cardLike() {
    cardHurt.classList.toggle('card__hurt_active');
  };
    cardHurt.addEventListener('click', cardLike);

  // просмотр фото (функция написана выше)
  imageCard.querySelector('.card__mask').addEventListener('click', () => openImage(imageData));
  
  return imageCard;

};

// ДОБАВЛЯЕТ ЭЛЕМЕНТ В НАЧАЛО БЛОКА
function renderImageCard(imageCard) {
  cards.prepend(imageCard);
};

// ПРОХОД ПО МАССИВУ forEaclh
initialCards.forEach(function (image){
  const createNewCard = createCard(image);
  cards.append(createNewCard);
});

// ОТКРЫТИЕ ПОПАПА КАРТОЧЕК
addButtonCard.addEventListener('click', () => {
  openPopup(addPopupCard);
 
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

  renderImageCard(createCard(imageData));
  formPopupCard.reset();
  disabledSubmitButton(addPopupCard);
  closePopup(addPopupCard);
});
// это функция которая находит кнонку сабмит открытого попапа и делает ее неактивной
function disabledSubmitButton(popup) {
  const button = popup.querySelector('.popup__button-edit');
  button.classList.add('popup__button-edit_inactive');
  button.setAttribute('disabled', true);
}