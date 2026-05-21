import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EmptyListView from '../view/empty-list-view.js';
import PointPresenter from './point-presenter.js';
import {render} from '../framework/render.js';
import {updateItem} from '../utils.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #sortComponent = new SortView();
  #eventListComponent = new EventListView();
  #emptyListComponent = new EmptyListView();

  #boardPoints = [];
  #boardDestinations = [];
  #boardOffers = [];
  #pointPresenters = new Map();

  constructor({ boardContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardDestinations = [...this.#pointsModel.destinations];
    this.#boardOffers = [...this.#pointsModel.offers];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#boardDestinations, this.#boardOffers);
  };


  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#eventListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, this.#boardDestinations, this.#boardOffers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#boardPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderListEmpty() {
    render(this.#emptyListComponent, this.#boardContainer);
  }

  #renderSort() {
    render(this.#sortComponent, this.#boardContainer);
  }

  #renderEventList() {
    render(this.#eventListComponent, this.#boardContainer);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderBoard() {
      if (this.#boardPoints.length === 0) {
      this.#renderListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderEventList();
    this.#renderPoints();
  }
}
