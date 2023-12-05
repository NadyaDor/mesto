export default class Card {
  constructor({myId, data, handleCardClick, handleDeleteClick, handleSetLike, handleDeleteLike}, templateSelector) { // конструктор получает объект с данными, обработчик клика на карточку, селектор шаблона
    this._data = data; // сохраняет данные карточки
    this._cardId = data._id;
    this._userId = data.userId; // это id владельца карточки
    this._likes = data.likes;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._myId = myId; // это id  владельца подключения
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleSetLike = handleSetLike;
    this._handleDeleteLike = handleDeleteLike;
    this._templateSelector = templateSelector;
  }

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
    this._elementLike = this._element.querySelector('.card__hurt');

    if ((this.hasMyLike = this._likes.some((like) => like._id === this._myId))) {
      this._elementLike.classList.add('card__hurt_active');
    } else {
      this._elementLike.classList.remove('card__hurt_active');
    }

    this._elementMask = this._element.querySelector('.card__mask');
    this._elementMask.src = this._link; // добавление данных
    this._elementMask.alt = this._name;
   
    this._element.querySelector('.card__place').textContent = this._name;
    this._likesCount = this._element.querySelector('.card__hurt-count');
    this._likesCount.textContent = this._likes.length;
    
    
    // this._isLike(); // вызов проверки поставлен ли мной лайк
    this._setEventListeners();
    return this._element // возврат элемента наружу
  }

  cardId() { // id для лайков присваивает
    return this._cardId
  }

  isLike () {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._elementLike.classList.add('card__hurt_active');
      } else {
        this._elementLike.classList.remove('card__hurt_active');
      }
    })
  }

  _setEventListeners() { // устанавливает обраотчики событий для элементов карточки
    this._elementLike.addEventListener('click', () => {
      if (this._elementLike.classList.contains('card__hurt_active')){
        this._handleDeleteLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    });
      
    this._element.querySelector('.card__basket').addEventListener('click',
      this._handleDeleteClick); // удаление

    this._elementMask.addEventListener('click', () => { // увеличить картинку
      this._handleCardClick(this._name, this._link);
    });
  }

  handleLikeClick = (data) => { // лайки
    this._likes = data.likes;
    this._likesCount.textContent = this._likes.length;
    this._elementLike.classList.toggle('card__hurt_active');
  }

  _handleDeleteClick() { // удаляет элемент карточки из DOM-дерева
    this._handleDeleteClick(this._cardId)
  }

  deleteCard() {
    this._element.remove();
    this._element = null; // это значение освобождает память
  }
}
