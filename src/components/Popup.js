import {escKey} from '../utils/constants.js'

// ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ НА СТРАНИЦЕ

export default class Popup {
  constructor(popupElement) {
    this._popupElement = document.querySelector(popupElement);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) { // закрытие по esc
    if (evt.keyCode === escKey) {
      this.close();
    }
  }

  _handleOverlayClose() { // закрытие при клике на затемненную область
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close();
      }
    });
  }

  setEventListeners() { // слушает иконку закрытия попапа
    this._closeButton = this._popupElement.querySelector('.popup__close');
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._handleOverlayClose();
  }
}
