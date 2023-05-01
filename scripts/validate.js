// покажет ошибку
function showInpurError(formElemetnt, inputElement, errorMessage) {
  const errorElement = formElemetnt.querySelector('.popup__input-error');
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// скрывает элемент ошибки
function hideInputError(formElemetnt, inputElement) {
  const errorElement = formElemetnt.querySelector('.popup__input-error');
  inputElement.classList.remove('popup__input_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
};

// проверим валидность
function isValid(formElemetnt, inputElement) {
  if (!inputElement.validity.valid) {
    showInpurError(formElemetnt, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElemetnt, inputElement);
  }
};

// отключение и включение кнопки
function toggleBattonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button-edit_inactive');
    } else {
      buttonElement.classList.remove('popup__button-edit_inactive');
    }
  };

// принимает элемент формы и добавляет её полям нужные обработчики
function setEventListernes (formElemetnt) {
  const inputList = Array.from(formElemetnt.querySelectorAll('.popup__input'));
  const buttonElement = formElemetnt.querySelector('.popup__button-edit');
  toggleBattonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElemetnt, inputElement);
      toggleBattonState(inputList, buttonElement);
    });
  });
};

// найдет и переберет все формы на странице
function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElemetnt) => {
    formElemetnt.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListernes(formElemetnt);
  });
};

// проверка наличия невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

enableValidation();