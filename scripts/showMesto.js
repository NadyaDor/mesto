import {openPopup} from './index.js'
export {showMesto}

const showPopupMesto = document.querySelector(".popup-mesto");
const mestoName = document.querySelector('.popup-mesto__name');
const mestoMask = document.querySelector('.popup-mesto__mask');

// ПРОСМОТР ФОТО
function showMesto(data) {
    mestoName.textContent = data.name;
    mestoMask.src = data.link;
    mestoMask.alt = data.name;
    openPopup(showPopupMesto);
  }