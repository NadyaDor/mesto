export default class UserInfo { // отображает информацию о пользователе на странице
  constructor({userName, userAbout}) {
    this._profileUserName = document.querySelector(userName);
    this._profileUserAbout = document.querySelector(userAbout);
  };

  getUserInfo() { // возвратит объект с данными пользователя
    return {
      userName: this._profileUserName.textContent,
      userAbout: this._profileUserAbout.textContent
    };
  };

  setUserInfo({ userName, userAbout }) { // примет данные пользователя и добавит их на страницу
    this._profileUserName.textContent = userName;
    this._profileUserAbout.textContent = userAbout;
  };
}