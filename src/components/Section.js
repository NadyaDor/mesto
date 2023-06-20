export default class Section { // НАРИСУЕТ КАРТОЧКИ НА СТРАНИЦУ
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderItems(items) { // отвечает за создание и отрисовку данных на странице
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) { // примет и добавит DOM в контейнер
    this._selector.prepend(element);
  }
}