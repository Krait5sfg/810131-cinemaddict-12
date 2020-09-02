import StatisticView from '../view/statistic.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Stats {
  constructor(container) {
    this._container = container;
  }
  init() {
    this._statisticElement = new StatisticView();
    render(this._container, this._statisticElement, RenderPosition.BEFOREEND);
  }
}
