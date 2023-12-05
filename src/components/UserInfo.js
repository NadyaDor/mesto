// ИНФА О ПОЛЬЗОВАТЕЛЕ НА СТРАНИЦЕ

export default class UserInfo {
  constructor({ nameElement, aboutElement, avatarElement }) { // принимает объект с тремя свойствами, кот являются селекторами DOM-элементов
    this._nameElement = document.querySelector(nameElement);
    this._aboutElement = document.querySelector(aboutElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() { // возвращает элемент с информацией о пользователе
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src
    };
  }

  setUserInfo({ name, about, avatar }) { // принимает эелемент с инфой о пользователе
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}
