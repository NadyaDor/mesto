// ОТРИСОВКА КАРТОЧЕК НА СТРАНИЦЕ

export default class Section {
  constructor({ renderer }, selector) { // метод renderer используется для отрисовки элементов, селектор представляет DOM-элемент, в кот будут добавляться карточки
    this._renderer = renderer; // будет вызываться для отрисовки каждого элемента
    this._selector = document.querySelector(selector); // контейнер, в кот будут добавляться карточки
  }

  renderItems(items) { // отвечает за создание и отрисовку элементов на странице
    items.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) { // примет и добавит DOM-элемент в контейнер
    this._selector.prepend(element);
  }
}
