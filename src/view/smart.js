import Abstract from './abstract.js';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  // restoreHandlers() {
  //   throw new Error(`Метод restoreHandlers надо переопределить`);
  // }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null; // Чтобы окончательно "убить" ссылку на prevElement

    // this.restoreHandlers();
  }

  updateData(update) {
    this._data = Object.assign({}, this._data, update);
    this.updateElement();
  }
}
