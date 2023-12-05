import Popup from './Popup.js'

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ И ДОБАВЛЕНИЯ КАРТОЧКИ

export default class PopupWithForm extends Popup {
  constructor({popupElement, handleFormSubmit}) {
    super(popupElement);
    this._form = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() { // собирает данные всех полей формы
    this._formValues = {}; // данные осбираются в этот объект
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupElement.addEventListener('submit', (evt) => { // добавляет обработчик события на этот элемент, представляющий форму внутри попапа
      evt.preventDefault(); // предотвращает отправку данных без разрешения
      this._handleFormSubmit(this._getInputValues(), () => { // передает значение полей формы 
        this.close();
      });
    });
    super.setEventListeners(); // добавляет другие обработчики событий
  }

  close() { // сбросит форму при закрытии
    this._form.reset();
    super.close();
  }
}
