import StatisticView from '../view/statistic.js';
import {render, RenderPosition, remove} from '../utils/render.js';

export default class Statisitc {
  constructor(container) {
    this._container = container;
    this._statisticElement = null;
  }

  init() {
    this._statisticElement = new StatisticView();
    render(this._container, this._statisticElement, RenderPosition.BEFOREEND);
    this._statisticElement.setStatisticInputHandler(this._statisticInputHandler);
  }

  removeStatisticElement() {
    remove(this._statisticElement);
  }

  _statisticInputHandler(value) {
    console.log(value);
  }
}
