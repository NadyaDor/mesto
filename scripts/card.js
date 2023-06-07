import {showMesto} from './showMesto.js' //_________________
export {Card}

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
    this._element.querySelector('.card__mask').alt = this._name;
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
    this._element.querySelector('.card__mask').addEventListener('click', () => { // ________________________
      showMesto(this._link, this._name, this._templateSelector); 
    }); 
  }

  _cardHurt() { // метод лайки
    this._element.querySelector('.card__hurt').classList.toggle('card__hurt_active')
  }

  _cardBasket() { // метод корзина
    this._element.querySelector('.card__basket').closest('.card').remove()
    this._element = null;
  }
}