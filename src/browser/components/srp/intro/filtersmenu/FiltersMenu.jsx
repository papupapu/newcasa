import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_FILTERS_UI_NAMES } from '../../../../constants/filters/Filters';

export function computeButtonText(filterName, filterValue) {
  let buttonText;
  switch (filterName) {
    case 'heating':
    case 'garden':
      buttonText = `${DEFAULT_FILTERS_UI_NAMES[filterName]} ${filterValue}`;
      break;
    case 'balcony':
    case 'lift':
    case 'photo':
    case 'terrace':
      buttonText = `${DEFAULT_FILTERS_UI_NAMES[filterName]}`;
      break;
    case 'sellerType':
      if (filterValue.length > 1) {
        buttonText = `${DEFAULT_FILTERS_UI_NAMES[filterName]} ${filterValue.join(', ')}`;
      } else {
        buttonText = `${DEFAULT_FILTERS_UI_NAMES[filterName]} ${filterValue}`;
      }
      break;
    case 'propertyTypes':
      if (filterValue.length > 1) {
        buttonText = `${filterValue.length} Tipologia imm.`;
      } else {
        buttonText = `${DEFAULT_FILTERS_UI_NAMES[filterName]}: ${filterValue}`;
      }
      break;
    default:
      buttonText = `${filterValue} ${DEFAULT_FILTERS_UI_NAMES[filterName]}`;
  }
  return buttonText;
}

class FiltersMenu extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (
      Object.keys(nextProps.filtersCount).lenght !== Object.keys(this.props.filtersCount).length
    ) {
      return true;
    }
    return false;
  }

  createFiltersButtons() {
    const { activeFilters } = this.props;
    const filtersButtons = [];
    let priceFlag = false;
    let mqFlag = false;
    const activeFiltersKeys = Object.keys(activeFilters);
    activeFiltersKeys.forEach(
      (el, index) => {
        const ind = index;
        const filterName = el;
        const filterValue = activeFilters[el];
        let buttonText;
        let button;
        if (filterName.indexOf('price') !== -1) {
          if (filterName === 'priceMin' && !priceFlag) {
            const checkForMax = Object.keys(activeFilters).indexOf('priceMax') === -1;
            button = checkForMax ?
              (
                <button
                  key={`clearFilter-${ind}`}
                  className="clearFilter"
                  title={"Rimuovi il filtro 'Prezzo'"}
                  onClick={() => { this.props.clearOneFilter(filterName); }}
                >
                  da {filterValue}&euro;
                </button>
              )
            :
              (
                <button
                  key={`clearFilter-${ind}`}
                  className="clearFilter"
                  title={"Rimuovi il filtro 'Prezzo'"}
                  onClick={() => {
                    this.props.clearOneFilter(filterName);
                    this.props.clearOneFilter('priceMax');
                  }}
                >
                  da {filterValue}&euro; a {activeFilters.priceMax}&euro;
                </button>
              );
            priceFlag = true;
          } else if (!priceFlag) {
            const checkForMin = Object.keys(activeFilters).indexOf('priceMin') === -1;
            button = checkForMin ?
              (
                <button
                  key={`clearFilter-${ind}`}
                  className="clearFilter"
                  title={"Rimuovi il filtro 'Prezzo'"}
                  onClick={() => { this.props.clearOneFilter(filterName); }}
                >
                  fino a {filterValue}&euro;
                </button>
              )
            :
              (
                <button
                  key={`clearFilter-${ind}`}
                  className="clearFilter"
                  title={"Rimuovi il filtro 'Prezzo'"}
                  onClick={() => {
                    this.props.clearOneFilter(filterName);
                    this.props.clearOneFilter('priceMin');
                  }}
                >
                  da {activeFilters.priceMin}&euro; a {filterValue}&euro;
                </button>
              );
            priceFlag = true;
          }
        } else if (filterName.indexOf('mq') !== -1) {
          if (filterName === 'mqMin' && !mqFlag) {
            const checkForMax = Object.keys(activeFilters).indexOf('mqMax') === -1;
            button = checkForMax ?
              (
                <button
                  key={`clearFilter-${ind}`}
                  className="clearFilter"
                  title={"Rimuovi il filtro 'Dimensioni'"}
                  onClick={() => { this.props.clearOneFilter(filterName); }}
                >
                  da {filterValue}mq
                </button>
              )
            :
              (
                <button
                  key={`clearFilter-${ind}`}
                  className="clearFilter"
                  title={"Rimuovi il filtro 'Dimesioni'"}
                  onClick={() => {
                    this.props.clearOneFilter(filterName);
                    this.props.clearOneFilter('mqMax');
                  }}
                >
                  da {filterValue}mq a {activeFilters.mqMax}mq
                </button>
              );
            mqFlag = true;
          } else if (!mqFlag) {
            const checkForMin = Object.keys(activeFilters).indexOf('mqMin') === -1;
            button = checkForMin ?
              (
                <button
                  key={`clearFilter-${ind}`}
                  className="clearFilter"
                  title={"Rimuovi il filtro 'Dimensioni'"}
                  onClick={() => { this.props.clearOneFilter(filterName); }}
                >
                  fino a {filterValue}mq
                </button>
              )
            :
              (
                <button
                  key={`clearFilter-${ind}`}
                  className="clearFilter"
                  title={"Rimuovi il filtro 'Dimensioni'"}
                  onClick={() => {
                    this.props.clearOneFilter(filterName);
                    this.props.clearOneFilter('mqMin');
                  }}
                >
                  da {activeFilters.mqMin}mq a {filterValue}mq
                </button>
              );
            mqFlag = true;
          }
        } else if (filterName !== 'category') {
          buttonText = computeButtonText(filterName, filterValue);
          button = (
            <button
              key={`clearFilter-${ind}`}
              className="clearFilter"
              title={`Rimuovi il filtro '${DEFAULT_FILTERS_UI_NAMES[filterName]}'`}
              onClick={() => { this.props.clearOneFilter(filterName); }}
            >
              {buttonText}
            </button>
          );
        }
        filtersButtons.push(button);
      },
    );
    const clearAllButton = (
      <button
        key={'clearAllFilters'}
        className="clearAllFilters"
        title="Cancella tutti i filtri"
        onClick={this.props.clearAllFilters}
      >
        Cancella tutti
      </button>
    );
    filtersButtons.push(clearAllButton);
    return filtersButtons;
  }

  render() {
    const filtersButtons = this.props.filtersCount > 0 ?
                            this.createFiltersButtons() : null;
    return (
      <menu>
        {filtersButtons}
      </menu>
    );
  }
}

FiltersMenu.propTypes = {
  filtersCount: PropTypes.number,
  activeFilters: PropTypes.instanceOf(Object),
  clearOneFilter: PropTypes.func,
  clearAllFilters: PropTypes.func,
};

FiltersMenu.defaultProps = {
  filtersCount: 0,
  activeFilters: {},
  clearOneFilter: () => {},
  clearAllFilters: () => {},
};

export default FiltersMenu;
