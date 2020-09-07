import Abstract from './abstract.js';

export default class Smart extends Abstract {
  restoreHandlers() {
    throw new Error(`Метод restoreHandlers надо переопределить`);
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    prevElement = null; // Чтобы окончательно "убить" ссылку на prevElement

    this.restoreHandlers();
  }
}
