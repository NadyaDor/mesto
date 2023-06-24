export default class Card {
  constructor({data, handleCardClick}, templateSelector) { // конструктор получает объект
    this._data = data; // сохраняет данные карточки
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;

    this._handleLikeClick = this._handleLikeClick.bind(this);
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
    this._elementMask = this._element.querySelector('.card__mask');
    this._elementMask.src = this._link; // добавление данных
    this._elementMask.alt = this._name;
    this._element.querySelector('.card__place').textContent = this._name;
    this._element.querySelector('.card__hurt-count').textContent = this._getLikesCount();
        
    this._setEventListeners();

    return this._element // возврат элемента наружу
  }

  _setEventListeners() {
    this._element.querySelector('.card__hurt').addEventListener('click', this._handleLikeClick);
    this._element.querySelector('.card__basket').addEventListener('click', this._handleDeleteClick);
    this._elementMask.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeClick() {
    this._element.querySelector('.card__hurt').classList.toggle('card__hurt_active');
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _getLikesCount() {
    return this._data.likes.length;
  }
}