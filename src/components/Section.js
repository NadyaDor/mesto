export default class Section { // НАРИСУЕТ КАРТОЧКИ НА СТРАНИЦУ
  constructor({items, renderer}, selector) {
    this._items = items; // массив, кот надо добавить на страницу
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  };

  renderItems(items) { // отвечает за создание и отрисовку данных на странице
    items.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(card) { // примет и добавит DOM в контейнер
    this._selector.prepend(card);
  };
}