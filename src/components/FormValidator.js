export {FormValidator}

class FormValidator {
  constructor(enableValidationObj, popupElement) {
    this._element = popupElement;
    this.enableValidationObj = enableValidationObj;
    this._inputs = Array.from(this._element.querySelectorAll(this.enableValidationObj.inputSelector));
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
    // console.log('_inputs:', this._inputs); // ПРОВЕРКА
    return this._inputs.some((input) => {
      return !input.validity.valid;
    })
  }

  // отключит и включит кнопку
  _toggleBattonState() {
    if (this._hasInvalidInput()) {
      // console.log('submitButtonSelector:', this._button); // ПРОВЕРКА
      this._button.setAttribute('disabled', true);
      this._button.classList.add(this.enableValidationObj.inactiveButtonClass);
    } else {
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this.enableValidationObj.inactiveButtonClass);
    }
  }

  // принимает элемент формы и добавляет её полям нужные обработчики
  _setEventListernes() {
    // console.log('_setEventListernes() called'); // ПРОВЕРКА
    this._toggleBattonState();
    this._element.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleBattonState();
      }, 0);
    });
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleBattonState();
      })
    })
  }

  // находит все формы на странице
  enableValidation() {
    // this._element = this._element.querySelector('.popup__form');
    this._element.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      this._setEventListernes();
  }
}
