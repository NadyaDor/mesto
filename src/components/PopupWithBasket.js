import Popup from "./Popup.js";

export default class PopupWithBasket extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popupElement.querySelector('.popup__form');
  }

  callbackSubmit(delet) {
    this._handleSubmit = delet;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmit();
    });
  }
}
