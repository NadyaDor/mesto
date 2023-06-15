import Popup from './Popup.js'

export default class PopupWithForm extends Popup { // ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
  constructor({popupElement, handleFormSubmit}) {
    super(popupElement);
    this._form = this._popupElement.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  };

  _getInputValues() { // соберет данные всех полей формы
    this._formValues = {};
    this._inputList.forEach((input) => {
      (this._formValues[input.name] = input.value)
    });
    return this._formValues;
  };

  setEventListeners() { // добавит обработчики клика иконке и сабмита формы
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), () => {
        this.close();
      });
    });
    super.setEventListeners();
  };

  close() { // сбросит форму при закрытии
    this._form.reset();
    super.close();
  };
}