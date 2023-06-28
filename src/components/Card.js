export default class Card {
  constructor({data, handleCardClick, handleDeleteClick}, templateSelector) { // конструктор получает объект с данными, обработчик клика на карточку, селектор шаблона
    // this._userId = 'c5735b78181013bfb61040e5'
    this._data = data; // сохраняет данные карточки
    this._cardId = data._id
    // this._likes = data.likes
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;

    this._handleLikeClick = this._handleLikeClick.bind(this);
  }

  
// if(this.hasMyLike = this._likes.some((like) => like._id === this._userId)) тогда закрисить лайк

  _getTemplate() { // возвращает разметку из html-шаблона
    const cardElement = document
      .querySelector(this._templateSelector) // получает элемент шаблона по селектору
      .content
      .querySelector('.card') // клонирует шаблон
      .cloneNode(true);
    return cardElement; // возвращает DOM-элемент
  }

  generateCard() { // метод готовит карточку к публикации
    this._element = this._getTemplate();

//c.lf

    this._elementMask = this._element.querySelector('.card__mask');
    this._elementMask.src = this._link; // добавление данных
    this._elementMask.alt = this._name;
    this._element.querySelector('.card__place').textContent = this._name;
    this._element.querySelector('.card__hurt-count').textContent = this._getLikesCount();
        
    this._setEventListeners();

    return this._element // возврат элемента наружу
  }

  _setEventListeners() { // устанавливает обраотчики событий для элементов карточки
    this._element.querySelector('.card__hurt').addEventListener('click', this._handleLikeClick); // нравится
    this._element.querySelector('.card__basket').addEventListener('click', this._handleDeleteClick); // удаление
    this._elementMask.addEventListener('click', () => { // увеличить картинку
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeClick() { // переключает класс на кнопке нравится
    this._element.querySelector('.card__hurt').classList.toggle('card__hurt_active');
  }

  _getLikesCount() { // получает количество лайков для одной карточки
    return this._data.likes.length;
  }

  _handleDeleteClick() { // удаляет элемент карточки из DOM-дерева
    handleDeleteClick(this._cardId)
  }

  deleteCard() {
    this._element.remove();
    this._element = null; // это значение освобождает память
  }
}