import BoardPresenter from './presenter/board-presenter.js'
import FilterView from './view/filter-view.js'
import PointsModel from './model/points-model.js'
import { render } from './render.js'

const siteMainElement = document.querySelector('.page-main')
const siteHeaderElement = document.querySelector('.page-header')
const tripControlsFilters = siteHeaderElement.querySelector('.trip-controls__filters')
const tripEventsElement = siteMainElement.querySelector('.trip-events')

render(new FilterView(), tripControlsFilters)

const pointsModel = new PointsModel()
const boardPresenter = new BoardPresenter({boardContainer: tripEventsElement, pointsModel})
boardPresenter.init()