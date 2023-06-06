export {FormValidator}

class FormValidator {
  constructor(enableValidationObj, popupElement) {
    this._element = popupElement;
    this.enableValidationObj = enableValidationObj;
    this._input = Array.from(this._element.querySelectorAll(this.enableValidationObj.inputSelector));
    this._button = this._element.querySelector(this.enableValidationObj.submitButtonSelector);
    // console.log('submitButtonSelector:', this._button); // ПРОВЕРКА
  }

  // покажет ошибку
  _showInputError(input, errorMessage) {
    const errorElement = this._element.querySelector(`#${input.id}-error`);
    input.classList.add(this.enableValidationObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.enableValidationObj.errorClass);
  }

  // скроет ошибку
  _hideInputError(input) {
    const errorElement = this._element.querySelector(`#${input.id}-error`);
    input.classList.remove(this.enableValidationObj.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this.enableValidationObj.errorClass);
  }

  // проверит валидность
  _isValid(input) {
    // console.log('input:', input); // ПРОВЕРКА
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  // проверит наличие невалидного поля
  _hasInvalidInput() {
    // console.log('_input:', this._input); // ПРОВЕРКА
    return this._input.some((input) => {
      return !input.validity.valid;
    })
  }

  // отключит и включит кнопку
  _toggleBattonState() {
    if (this._hasInvalidInput()) {
      // console.log('submitButtonSelector:', this._button); // ПРОВЕРКА
      this._button.classList.add(this.enableValidationObj.inactiveButtonClass);
      this._button.setAttribute('disabled', true);
    } else {
      this._button.classList.remove(this.enableValidationObj.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }

  // принимает элемент формы и добавляет её полям нужные обработчики
  _setEventListernes() {
    // console.log('_setEventListernes() called'); // ПРОВЕРКА
    this._toggleBattonState();
    this._input.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleBattonState();
      })
    })
  }

  // находит все формы на странице
  enableValidation() {
    // console.log('enableValidation() called'); // ПРОВЕРКА
    // this._element = this._element.querySelector('.popup__form');
    this._element.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      this._setEventListernes();
  }
}