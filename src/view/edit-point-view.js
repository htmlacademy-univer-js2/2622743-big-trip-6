import dayjs from 'dayjs';
import { createElement } from '../render.js';
import { POINT_TYPES } from '../const.js';

const DATE_FORMAT = 'DD/MM/YY HH:mm';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight'
};

function createEditPointTemplate(point, destinations, offers) {
  const {basePrice, dateFrom, dateTo, type} = point;
  const pointDestination = destinations.find((dest) => dest.id === point.destination);
  const pointTypeOffers = offers.find((offer) => offer.type === type);
  const currentPointOffers = pointTypeOffers ? pointTypeOffers.offers : [];

  const destinationName = pointDestination ? pointDestination.name : '';
  const destinationDescription = pointDestination ? pointDestination.description : '';
  const destinationPictures = pointDestination ? pointDestination.pictures : [];

  const typeList = POINT_TYPES.map((pointType) => `
    <div class="event__type-item">
      <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${pointType.charAt(0).toUpperCase() + pointType.slice(1)}</label>
    </div>
  `).join('');

  const offersList = currentPointOffers.map((offer) => {
    const isChecked = point.offers.includes(offer.id) ? 'checked' : '';
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${isChecked}>
        <label class="event__offer-label" for="event-offer-${offer.id}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  }).join('');

  const destinationOptions = destinations.map((dest) => `<option value="${dest.name}"></option>`).join('');

  const picturesList = destinationPictures.map((pic) => `
    <img class="event__photo" src="${pic.src}" alt="${pic.description}">
  `).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typeList}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationOptions}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : ''}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? dayjs(dateTo).format(DATE_FORMAT) : ''}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${currentPointOffers.length ? `
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${offersList}
              </div>
            </section>
          ` : ''}

          ${pointDestination ? `
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destinationDescription}</p>
              ${destinationPictures.length ? `
                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${picturesList}
                  </div>
                </div>
              ` : ''}
            </section>
          ` : ''}
        </section>
      </form>
    </li>`
  );
}

export default class EditPointView {
  constructor({ pointDestinations, pointOffers, point = BLANK_POINT}) {
    this.pointDestinations = pointDestinations;
    this.pointOffers = pointOffers;
    this.point = point;
  }

  getTemplate() {
    return createEditPointTemplate(this.point, this.pointDestinations, this.pointOffers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
