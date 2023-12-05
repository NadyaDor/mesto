import Popup from './Popup.js'

// ОТОБРАЗИТ УВЕЛИЧЕННОЕ ИЗОБРАЖЕНИЕ

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._zoomMask = this._popupElement.querySelector('.popup-mesto__mask');
    this._zoomName = this._popupElement.querySelector('.popup-mesto__name');
  }

  open(data) {
    super.open();
    this._zoomMask.src = data.link;
    this._zoomName.textContent = data.name;
    this._zoomMask.alt = data.alt
  }
}
