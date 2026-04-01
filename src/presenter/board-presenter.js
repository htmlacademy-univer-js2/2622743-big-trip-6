import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import EventListView from '../view/event-list-view.js';
import EditPointView from '../view/edit-point-view.js';

import {render, RenderPosition} from '../render.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.sortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);

    render(new EditPointView(), this.eventListComponent.getElement(), RenderPosition.AFTERBEGIN);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.eventListComponent.getElement());
    }
  }
}