export default class UserInfo { // отображает информацию о пользователе на странице
  constructor({ nameElement, aboutElement, avatarElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._aboutElement = document.querySelector(aboutElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;
  }
}