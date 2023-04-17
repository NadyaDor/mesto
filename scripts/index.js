const editButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_profile");
const popupCloseProfile = document.querySelector(".popup__close_profile");
const popupNameInputTypeName = popupProfile.querySelector(".popup__name-input_type_name");
const popupNameInputTypeAbout = popupProfile.querySelector(".popup__name-input_type_about");
const popupFormProfile = popupProfile.querySelector(".popup__form_profile");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const popupElement = document.querySelector(".popup_element");
const addButton = document.querySelector(".profile__add-button");
const popupCloseElement = document.querySelector(".popup__close_element");
const popupFormElement = popupElement.querySelector(".popup__form_element");
const popupNameInputTypePlace = popupElement.querySelector(".popup__name-input_type_place");
const popupNameInputTypeLink = popupElement.querySelector(".popup__name-input_type_link");
const popupMesto = document.querySelector(".popup-mesto");
const popupCloseMesto = document.querySelector(".popup__close_mesto");

// ФУНКЦИЯ ОТКРЫТИЯ ЛЮБОГО ПОПАПА
const openPopup = (popup) => {
  popup.classList.add('popup_opened')
}

// ФУНКЦИЯ ЗАКРЫТИЯ ЛЮБОГО ПОПАПА
const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}

// ОТКРЫТИЕ ПОПАПА ПРОФИЛЯ
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  // присваиваем в строках ввода значения из профайла
  popupNameInputTypeName.value = profileName.textContent;
  popupNameInputTypeAbout.value = profileAbout.textContent;
});

// ЗАКРЫТИЕ ПОПАПА ПРОФИЛЯ
popupCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

// КНОПКА СОХРАНИТЬ ИЗМЕНЕНИЯ В ПРОФИЛЕ. В скобки event
popupFormProfile.addEventListener('submit', (event) => {
  event.preventDefault(); // обязательно при работе с формами, чтобы форма без ведома никуда не отправлялась
  const name = popupNameInputTypeName.value;
  const about = popupNameInputTypeAbout.value;
  // указываю куда сохранятся изменения
  profileName.textContent = name;
  profileAbout.textContent = about;
  popupProfile.classList.remove('popup_opened');
});

// ТЕМПЛЕЙТ С КАРТОЧКАМИ
const elementTemplate = document.getElementById('element-template');
const elements = document.querySelector('.elements');

// ФУНКЦИЯ СОЗДАНИЯ ЭЛЕМЕНТА
const createImageElement = (imageData) => {
  const imageElement = elementTemplate.content.querySelector('.element').cloneNode(true);
  const elementBasket = imageElement.querySelector('.element__basket');
  const elementPlace = imageElement.querySelector('.element__place');
  const elementMask = imageElement.querySelector('.element__mask');

  elementPlace.innerHTML = imageData.name;
  elementMask.src = imageData.link;
  elementMask.alt = imageData.name;

  // корзина (этот вариант кода из совета из чата)
  elementBasket.addEventListener('click', function () {
    const elementDelete = elementBasket.closest('.element');
    elementDelete.remove();
  });

  // лайки (этот вариант кода из вебинара)
  const elementHurt = imageElement.querySelector('.element__hurt');
  const elementLike = () => {
    elementHurt.classList.toggle('element__hurt_active');
  };
  elementHurt.addEventListener('click', elementLike);

  // увеличивает фото, функцию написала внизу
  imageElement.querySelector('.element__mask').addEventListener('click', () => openImage(imageData));
  
  return imageElement
};

// ФУНКЦИЯ ВСТАВЛЯЕТ ЭЛЕМЕНТЫ
const renderImageElement = (imageElement) => {
  elements.prepend(imageElement);
};

initialCards.forEach((image) => {
  renderImageElement(createImageElement(image));
});

// ОТКРЫТИЕ ПОПАПА КАРТОЧЕК
addButton.addEventListener('click', () => {
  openPopup(popupElement);
});

// ЗАКРЫТИЕ ПОПАПА КАРТОЧЕК
popupCloseElement.addEventListener('click', () => {
  closePopup(popupElement);
});

// КНОПКА СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ
popupFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = popupNameInputTypePlace.value;
  const link = popupNameInputTypeLink.value;

  const imageData = {
    name,
    link,
  };

  renderImageElement(createImageElement(imageData));
  popupElement.classList.remove('popup_opened');
});

// ФУНКЦИЯ ДЛЯ УВЕЛИЧЕНИЯ ФОТО
function openImage(imageDate) {
  popupMesto.querySelector('.popup-mesto__name').textContent = imageDate.name;
  popupMesto.querySelector('.popup-mesto__mask').src = imageDate.link;
  popupMesto.querySelector('.popup-mesto__mask').alt = imageDate.name;
  openPopup(popupMesto);
};

// ЗАКРЫТИЕ ПОПАПА УВЕЛИЧЕННЫХ ФОТО
popupCloseMesto.addEventListener('click', () => {
  closePopup(popupMesto);
});