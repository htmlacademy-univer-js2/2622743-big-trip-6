import EditPointView from '../view/edit-point-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { render, replace } from '../framework/render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #sortComponent = new SortView();
  #eventListComponent = new EventListView();

  #boardPoints = [];
  #boardDestinations = [];
  #boardOffers = [];

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

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      pointDestinations: this.#boardDestinations,
      pointOffers: this.#boardOffers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      pointDestinations: this.#boardDestinations,
      pointOffers: this.#boardOffers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventListComponent.element);
  }

  #renderBoard() {
    render(this.#sortComponent, this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }
}
