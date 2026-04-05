import { getRandomNumber, getRandomArrayElement } from '../utils.js';
import { POINT_TYPES } from '../const.js';

const OFFERS = [
  'Add luggage',
  'Switch to comfort',
  'Add meal',
  'Choose seats',
  'Travel by train'
];

const createOffer = (id) => ({
  id,
  title: getRandomArrayElement(OFFERS),
  price: getRandomNumber(10, 100)
});

const createOffersByType = () => POINT_TYPES.map((type) => ({
  type,
  offers: Array.from({length: getRandomNumber(0, 5)}, (_, index) => createOffer(index + 1))
}));

const mockOffers = createOffersByType();

export { mockOffers };
