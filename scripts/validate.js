const enableValidationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-edit',
  inactiveButtonClass: 'popup__button-edit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
}

// покажет ошибку
function showInpurError(formElemetnt, inputElement, errorMessage, enableValidationObj) {
  const errorElement = formElemetnt.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(enableValidationObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidationObj.errorClass);
};

// скрывает элемент ошибки
function hideInputError(formElemetnt, inputElement, enableValidationObj) {
  const errorElement = formElemetnt.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(enableValidationObj.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(enableValidationObj.errorClass);
};

// проверим валидность
function isValid(formElemetnt, inputElement, enableValidationObj) {
  if (!inputElement.validity.valid) {
    showInpurError(formElemetnt, inputElement, inputElement.validationMessage, enableValidationObj);
  } else {
    hideInputError(formElemetnt, inputElement, enableValidationObj);
  }
};

// отключение и включение кнопки
function toggleBattonState(inputList, buttonElement, enableValidationObj) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(enableValidationObj.inactiveButtonClass);
      buttonElement.setAttribute('disabled',true);
    } else {
      buttonElement.classList.remove(enableValidationObj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };

// принимает элемент формы и добавляет её полям нужные обработчики
function setEventListernes (formElemetnt, enableValidationObj) {
  const inputList = Array.from(formElemetnt.querySelectorAll(enableValidationObj.inputSelector));
  const buttonElement = formElemetnt.querySelector(enableValidationObj.submitButtonSelector);
  toggleBattonState(inputList, buttonElement, enableValidationObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElemetnt, inputElement, enableValidationObj);
      toggleBattonState(inputList, buttonElement, enableValidationObj);
    });
  });
};

// найдет и переберет все формы на странице
function enableValidation (enableValidationObj) {
  const formList = Array.from(document.querySelectorAll(enableValidationObj.formSelector));
  formList.forEach((formElemetnt) => {
    formElemetnt.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListernes(formElemetnt, enableValidationObj);
  });
};

// проверка наличия невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

enableValidation(enableValidationObj);