// находим кнопку карандаш в дереве
const editButton = document.querySelector(".profile__edit-button");
// находим нужный попап с редактированием профайла
const popup = document.querySelector(".popup");
//  находим находим в попапе редактированиея профайла кнопку крест
const popupClose = popup.querySelector(".popup__close");
// добавляем ввод имени
const popupNameInputName = popup.querySelector(".popup__name-input_name");
// добавляем ввод описания под именем
const popupNameInputAbout = popup.querySelector(".popup__name-input_about");
// добавляем кнопку сохранить
const popupButtonEdit = popup.querySelector(".popup__button-edit");
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
});

// добавляем слушатель сабмита на кноgке сохранить в форме попапа. В скобки добавляем event
popupForm.addEventListener('submit', (event) => {
  event.preventDefault(); // обязательно при работе с формами
  const name = popupNameInputName.value;
  const about = popupNameInputAbout.value;
  // указываю куда сохранятся изменения
  profileName.textContent = name;
  profileAbout.textContent = about;
});

// добавляю слушатель к кнопке крестик
popupClose.addEventListener('click', () => {
  // убираю модификатор, кот добавлял видимость попапу  
  popup.classList.remove('popup_opened');
});
