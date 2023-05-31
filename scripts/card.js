// export { Card }

// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// const showPopupMesto = document.querySelector(".popup-mesto");
// const mestoName = document.querySelector('.popup-mesto__name');
// const mestoMask = document.querySelector('.popup-mesto__mask');
  
// class Card {
//   constructor(data, templateSelector) { // конструктор получает объект
//     this._name = data.name;
//     this._link = data.link;
//     this._templateSelector = templateSelector;
//   }

//   _getTemplate() { // это метод, который возвращает разметку классу Card, забирает ее из HTML и клонирует элемент
//     const cardElement = document
//       .querySelector(this._templateSelector)
//       .content
//       .querySelector('.card')
//       .cloneNode(true);

//     return cardElement; // возвращает DOM-элемент
//   }

//   generateCard() { // метод готовит карточку к публикации
//     this._element = this._getTemplate(); // здесь запишем разметку
//     this._setEventListeners();
//     this._element.querySelector('.card__mask').src = this._link; // добавление данных
//     this._element.querySelector('.card__place').textContent = this._name;
//     return this._element // возврат элемента наружу
//   }

//   _setEventListeners() {
//     // лайки
//     this._element.querySelector('.card__hurt').addEventListener('click', () => {
//       this._cardHurt();
//     });
//     // корзина
//     this._element.querySelector('.card__basket').addEventListener('click', () => {
//       this._cardBasket();
//     })
//     // // посмотреть фото
//     // this._element.querySelector('.card__mask').addEventListener('click', () => {
//     //   this._showPopupMesto();
//     // })
//   }

//   _cardHurt() { // метод лайки
//     this._element.querySelector('.card__hurt').classList.toggle('card__hurt_active')
//   }

//   _cardBasket() { // метод корзина
//     this._element.querySelector('.card__basket').closest('.card').remove()
//   }

//   // _showPopupMesto() { // метод просмотра фото
//   //   mestoMask.src = this._link;
//   //   mestoName.textContent = this._name;
//   //   openPopup(showPopupMesto);
//   // }
// }

// initialCards.forEach((item) => {
//   const card = new Card(item, '.card-template_type_default'); // создание экземпляра карточки
//   const cardElement = card.generateCard(); // создание карточки и возврат наружу
//   document.querySelector('.cards').append(cardElement); // добавление в DOM
// });
