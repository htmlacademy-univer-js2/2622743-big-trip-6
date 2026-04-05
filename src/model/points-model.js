import { mockDestinations } from '../mock/destination.js'
import { mockPoints } from '../mock/point.js'
import { mockOffers } from '../mock/offer.js'

export default class PointsModel {
  #destinations = mockDestinations
  #points = mockPoints
  #offers = mockOffers

  get destinations() {
    return this.#destinations
  }

  get points() {
    return this.#points
  }

  get offers() {
    return this.#offers
  }
}