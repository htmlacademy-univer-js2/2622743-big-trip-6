import EditPointView from '../view/edit-point-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { render, RenderPosition } from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({ boardContainer, pointsModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.points];
    this.boardDestinations = [...this.pointsModel.destinations];
    this.boardOffers = [...this.pointsModel.offers];

    render(this.sortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);

    render(new EditPointView({
      point: this.boardPoints[0],
      pointDestinations: this.boardDestinations,
      pointOffers: this.boardOffers
    }), this.eventListComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointView({
        point: this.boardPoints[i],
        pointDestinations: this.boardDestinations,
        pointOffers: this.boardOffers
      }), this.eventListComponent.getElement());
    }
  }
}
