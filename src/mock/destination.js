import { getRandomNumber, getRandomArrayElement } from '../utils.js'
import { DESTINATIONS, DESCRIPTIONS } from './const.js'

const createPicture = () => ({
  src: `https://placehold.co/248x152?text=Cool+Photo+of+Point`,
  description: getRandomArrayElement(DESCRIPTIONS)
})

const createDestination = (id) => ({
  id,
  description: Array.from({ length: getRandomNumber(1, 5) }, () => getRandomArrayElement(DESCRIPTIONS)).join(' '),
  name: getRandomArrayElement(DESTINATIONS),
  pictures: Array.from({ length: getRandomNumber(1, 5) }, createPicture)
})

const mockDestinations = Array.from({ length: 10 }, (_, index) => createDestination(index + 1))

export { mockDestinations }