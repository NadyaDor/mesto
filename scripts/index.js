// находим кнопку карандаш в дереве
const editButton = document.querySelector(".profile__edit-button");
// находим нужный попап с редактированием профайла
const popup = document.querySelector(".popup");
//  находим находим в попапе редактированиея профайла кнопку крест
const popupClose = popup.querySelector(".popup__close");
// добавляем ввод имени
const popupNameInputTypeName = popup.querySelector(".popup__name-input_type_name");
// добавляем ввод описания под именем
const popupNameInputTypeAbout = popup.querySelector(".popup__name-input_type_about");
// добавили поиск формы, в которой в попапе вписываем новые данные
const popupForm = popup.querySelector(".popup__form");
// добавила месту, куда в профайле запишется новое имя
const profileName = document.querySelector(".profile__name");
// а сюда описание под именем
const profileAbout = document.querySelector(".profile__about");


// добавляем слушатель к кнопке карандаш
editButton.addEventListener('click', () => {
  // добавляем модификатор, который сделает попап с редактированием профайла видимым
  popup.classList.add('popup_opened');
  // присваиваем в строках ввода значения из профайла, если этого не сделать, то строки для ввода останутся пустыми
  popupNameInputTypeName.value = profileName.textContent;
  popupNameInputTypeAbout.value = profileAbout.textContent;
});

// добавляем слушатель сабмита на кноgке сохранить в форме попапа. В скобки добавляем event
popupForm.addEventListener('submit', (event) => {
  event.preventDefault(); // обязательно при работе с формами
  const name = popupNameInputTypeName.value;
  const about = popupNameInputTypeAbout.value;
  // указываю куда сохранятся изменения
  profileName.textContent = name;
  profileAbout.textContent = about;
  popup.classList.remove('popup_opened');
});

// добавляю слушатель к кнопке крестик
popupClose.addEventListener('click', () => {
  // убираю модификатор, кот добавлял видимость попапу  
  popup.classList.remove('popup_opened');
});
