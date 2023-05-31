export {FormValidator}

const enableValidationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-edit',
  inactiveButtonClass: 'popup__button-edit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
}

class FormValidator {
  constructor(enableValidationObj) {
    this.enableValidationObj = enableValidationObj;
    this._form = formSelector;
    this._input = Array.from(this.form.querySelectorAll(this.enableValidationObj.inputSelector));
    this._button = submitButtonSelector;
  }

  // покажет ошибку
  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this.enableValidationObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.enableValidationObj.errorClass);
  }

  // скроет ошибку
  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this.enableValidationObj.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this.enableValidationObj.errorClass);
  }

  // проверит валидность
  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  // проверит наличие невалидного поля
  _hasInvalidInput() {
    return this.input.some((input) => {
      return !input.validity.valid;
    })
  }

  // отключит и включит кнопку
  _toggleBattonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this.enableValidationObj.inactiveButtonClass);
      this._button.setAttribute('disabled',true);
    } else {
      this._button.classList.remove(this.enableValidationObj.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
  }

  // принимает элемент формы и добавляет её полям нужные обработчики
  _setEventListernes() {
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
    this.form = Array.form(this.form.querySelectorAll(this.enableValidationObj.formSelector));
    this.form.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      this._setEventListernes();
    })
  }
}