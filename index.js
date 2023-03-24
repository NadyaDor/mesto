// находим кнопку карандаш в дереве
const editButton = document.querySelector(".profile__edit-button");
// добавили в HTML пустой модификатор, по которому находим нужный попап с редактированием профайла
const popupEditButton = document.querySelector(".popup_edit-button");
// добавили в HTML пустой модификатор, по которому находим находим в попапе редактированиея профайла кнопку крест
const popupCloseEditButton = popupEditButton.querySelector(".popup__close_edit-button");
// добавила сердца
const elementHurt = document.querySelector(".element__hurt");
// добавляем ввод имени
const popupNameInputType = popupEditButton.querySelector(".popup__name-input_type");
// добавляем ввод описания под именем
const popupNameAboutInput = popupEditButton.querySelector(".popup__name-about_input");
// добавляем кнопку сохранить
const popupButtonEdit = popupEditButton.querySelector(".popup__button-edit");
// добавили поиск формы, в которой в попапе вписываем новые данные
const popupForm = popupEditButton.querySelector(".popup__form");
// добавила месту, куда в профайле запишется новое имя
const profileName = document.querySelector(".profile__name");
// а сюда описание под именем
const profileAbout = document.querySelector(".profile__about");


// добавляем слушатель к кнопке карандаш
editButton.addEventListener('click', () => {
  // добавляем модификатор, который сделает попап с редактированием профайла видимым
  popupEditButton.classList.add('popup_open');
  // присваиваем в строках ввода значения из профайла, если этого не сделать, то строки для ввода останутся пустыми
  popupNameInputType.value = profileName.innerHTML;
  popupNameAboutInput.value = profileAbout.innerHTML;
});

// добавляю слушатель к кнопке крестик
popupCloseEditButton.addEventListener('click', () => {
  // убираю модификатор, кот добавлял видимость попапу  
  popupEditButton.classList.remove('popup_open');
});

// слушаю сердца
elementHurt.addEventListener('click',() => {
  elementHurt.classList.toggle('element__hurt_active');
});

// добавляем слушатель сабмита на кноgке сохранить в форме попапа. В скобки добавляем event
popupForm.addEventListener('submit', (event) => {
  event.preventDefault(); // обязательно при работе с формами
  const name = popupNameInputType.value;
  const about = popupNameAboutInput.value;
  // указываю куда сохранятся изменения
  profileName.innerHTML = name;
  profileAbout.innerHTML = about;
});
