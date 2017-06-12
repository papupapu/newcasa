import React from 'react';
import PropTypes from 'prop-types';

import {
  DEFAULT_FILTERS_VALUES,
  FILTER_CATEGORY_VALUES,
  FILTER_PROPERTY_VALUES,
  FILTER_PRICE_SALE_VALUES,
  FILTER_SQUAREMETERS_VALUES,
  FILTER_NUMROOMS_VALUES,
  FILTER_NUMBATHS_VALUES,
  FILTER_NUMPARKINGSPACES_VALUES,
  FILTER_GARDEN_VALUES,
  FILTER_HEATING_VALUES,
  FILTER_SELLERTYPE_VALUES,
} from '../../../constants/filters/Filters';

import { computeActiveFilters } from '../../../helpers/filters/Filters';

import Select from '../select/Select';
import Checkbox from '../checkbox/Checkbox';

import './Filters.css';

class Filters extends React.Component {

  constructor(props) {
    super(props);

    this.filters = JSON.parse(JSON.stringify(props.filters));
    this.activeFilters = {};
    this.filtersCount = 0;

    this.update = this.update.bind(this);
    this.clearOneFilter = this.clearOneFilter.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
  }

  update(updated) {
    const scope = Object.keys(updated)[0];
    const value = updated[scope];
    this.filters[scope] = value;
    const newFiltersState = computeActiveFilters(this.filters);
    this.activeFilters = newFiltersState[0];
    this.filtersCount = newFiltersState[1];
    this.counter.innerText = this.filtersCount;
    this.props.passNewFilters(this.filters);
  }

  clearOneFilter(scope) {
    this.filters[scope] = DEFAULT_FILTERS_VALUES[scope];
    this[scope].reset(this.filters[scope]);
    this.update({ [scope]: this.filters[scope] });
  }

  clearAllFilters() {
    this.filters = JSON.parse(JSON.stringify(DEFAULT_FILTERS_VALUES));
    // reset active filters components value
    const activeFiltersKeys = Object.keys(this.activeFilters);
    activeFiltersKeys.forEach(
      (active) => {
        const scope = active;
        this[scope].reset(this.filters[scope]);
      },
    );
    // we have no active filters now
    this.activeFilters = {};
    this.filtersCount = 0;
    this.counter.innerText = this.filtersCount;
    this.props.passNewFilters(this.filters);
  }

  render() {
    return (
      <div className="filters">
        <p>
          Filtri impostati{' '}
          <span ref={(counter) => { this.counter = counter; }}>{this.filtersCount}</span>
          <a
            ref={(clearAll) => { this.clearAll = clearAll; }}
            href=""
            title="Cancella tutti"
            onClick={(e) => { e.preventDefault(); this.clearAllFilters(); }}
          >
            Cancella tutti
          </a>
        </p>
        <div className="block1 couple">
          <Select
            ref={(category) => { this.category = category; }}
            scope="category"
            label="Categoria"
            type="single"
            value={this.filters.category}
            values={FILTER_CATEGORY_VALUES}
            defaultValue={FILTER_CATEGORY_VALUES[1]}
            update={this.update}
          />
          <Select
            ref={(propertyTypes) => { this.propertyTypes = propertyTypes; }}
            scope="propertyTypes"
            label="Tipologia immobile"
            type="multiple"
            value={this.filters.propertyTypes}
            values={FILTER_PROPERTY_VALUES.residenziale}
            defaultValue={DEFAULT_FILTERS_VALUES.propertyTypes}
            update={this.update}
          />
        </div>
        <div className="block2 couple">
          <Select
            ref={(priceMin) => { this.priceMin = priceMin; }}
            scope="priceMin"
            label="Prezzo minimo"
            type="single"
            value={this.filters.priceMin}
            values={FILTER_PRICE_SALE_VALUES}
            defaultValue={DEFAULT_FILTERS_VALUES.priceMin}
            update={this.update}
          />
          <Select
            ref={(priceMax) => { this.priceMax = priceMax; }}
            scope="priceMax"
            label="Prezzo massimo"
            type="single"
            value={this.filters.priceMax}
            values={FILTER_PRICE_SALE_VALUES}
            defaultValue={DEFAULT_FILTERS_VALUES.priceMax}
            update={this.update}
          />
        </div>
        <div className="block3 couple">
          <Select
            ref={(mqMin) => { this.mqMin = mqMin; }}
            scope="mqMin"
            label="Dimensioni minime"
            type="single"
            value={this.filters.mqMin}
            values={FILTER_SQUAREMETERS_VALUES}
            defaultValue={DEFAULT_FILTERS_VALUES.mqMin}
            update={this.update}
          />
          <Select
            ref={(mqMax) => { this.mqMax = mqMax; }}
            scope="mqMax"
            label="Dimensioni massime"
            type="single"
            value={this.filters.mqMax}
            values={FILTER_SQUAREMETERS_VALUES}
            defaultValue={DEFAULT_FILTERS_VALUES.mqMax}
            update={this.update}
          />
        </div>
        <div className="block4 triplet">
          <Select
            ref={(numRooms) => { this.numRooms = numRooms; }}
            scope="numRooms"
            label="Locali"
            type="single"
            value={this.filters.numRooms}
            values={FILTER_NUMROOMS_VALUES}
            defaultValue={DEFAULT_FILTERS_VALUES.numRooms}
            update={this.update}
          />
          <Select
            ref={(numBaths) => { this.numBaths = numBaths; }}
            scope="numBaths"
            label="Bagni"
            type="single"
            value={this.filters.numBaths}
            values={FILTER_NUMBATHS_VALUES}
            defaultValue={DEFAULT_FILTERS_VALUES.numBaths}
            update={this.update}
          />
          <Select
            ref={(numParkingSpaces) => { this.numParkingSpaces = numParkingSpaces; }}
            scope="numParkingSpaces"
            label="Box / P. auto"
            type="single"
            value={this.filters.numParkingSpaces}
            values={FILTER_NUMPARKINGSPACES_VALUES}
            defaultValue={DEFAULT_FILTERS_VALUES.numParkingSpaces}
            update={this.update}
          />
        </div>
        <div className="block5 couple">
          <Select
            ref={(garden) => { this.garden = garden; }}
            scope="garden"
            label="Giardino"
            type="single"
            value={this.filters.garden}
            values={FILTER_GARDEN_VALUES}
            defaultValue={DEFAULT_FILTERS_VALUES.garden}
            update={this.update}
          />
          <Select
            ref={(heating) => { this.heating = heating; }}
            scope="heating"
            label="Riscaldamento"
            type="single"
            value={this.filters.heating}
            values={FILTER_HEATING_VALUES}
            defaultValue={DEFAULT_FILTERS_VALUES.heating}
            update={this.update}
          />
        </div>
        <div className="block6 couple">
          <Select
            ref={(sellerType) => { this.sellerType = sellerType; }}
            scope="sellerType"
            label="Solo annunci da"
            type="multiple"
            value={this.filters.sellerType}
            values={FILTER_SELLERTYPE_VALUES}
            defaultValue={DEFAULT_FILTERS_VALUES.sellerType}
            update={this.update}
          />
          <Checkbox
            ref={(photo) => { this.photo = photo; }}
            scope="photo"
            label="Solo ann. con foto"
            value={this.filters.photo}
            update={this.update}
          />
        </div>
        <div className="block7 triplet">
          <Checkbox
            ref={(balcony) => { this.balcony = balcony; }}
            scope="balcony"
            label="Balcone"
            value={this.filters.balcony}
            update={this.update}
          />
          <Checkbox
            ref={(terrace) => { this.terrace = terrace; }}
            scope="terrace"
            label="Terrazzo"
            value={this.filters.terrace}
            update={this.update}
          />
          <Checkbox
            ref={(lift) => { this.lift = lift; }}
            scope="lift"
            label="Ascensore"
            value={this.filters.lift}
            update={this.update}
          />
        </div>
        <div className="block8">
          <Checkbox
            ref={(surrounding) => { this.surrounding = surrounding; }}
            scope="surrounding"
            label="Includi località circostanti"
            value={this.filters.surrounding}
            // disabled
            update={this.update}
          />
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  channel: PropTypes.string,
  filters: PropTypes.instanceOf(Object),
  passNewFilters: PropTypes.func,
};

Filters.defaultProps = {
  channel: 'vendita',
  filters: DEFAULT_FILTERS_VALUES,
  passNewFilters: (obj) => {
    console.warn('parent did not pass any "passNewFilters" function via props: Filters is trying to pass a new set of filters', obj);
  },
};

export default Filters;
