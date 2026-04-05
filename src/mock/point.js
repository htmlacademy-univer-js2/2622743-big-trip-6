import { getRandomNumber, getRandomArrayElement } from '../utils.js'
import { POINT_TYPES } from '../const.js'
import { mockDestinations } from './destination.js'
import { mockOffers } from './offer.js'

const createPoint = (id) => {
  const type = getRandomArrayElement(POINT_TYPES)
  const destination = getRandomArrayElement(mockDestinations).id
  const offersByType = mockOffers.find((item) => item.type === type).offers
  const offerIds = offersByType.length
    ? Array.from({length: getRandomNumber(0, offersByType.length)}, () => getRandomArrayElement(offersByType).id)
    : []
  const uniqueOfferIds = [...new Set(offerIds)]

  return {
    basePrice: getRandomNumber(100, 1000),
    dateFrom: `2019-07-${getRandomNumber(10, 31)}T${ getRandomNumber(0, 23) }:${ getRandomNumber(0, 59) }:00.000Z`,
    dateTo: `2019-07-${getRandomNumber(10, 31)}T${ getRandomNumber(0, 23) }:${ getRandomNumber(0, 59) }:00.000Z`,
    destination,
    id: String(id),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    offers: uniqueOfferIds,
    type
  }
}

const mockPoints = Array.from({length: 10}, (_, index) => createPoint(index + 1))

export { mockPoints }