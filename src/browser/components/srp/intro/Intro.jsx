import React from 'react';
import PropTypes from 'prop-types';

import { computeActiveFilters } from '../../../helpers/filters/Filters';
import { testOverlayer } from '../../../helpers/DOMHelpers';

import Breadcrumb from './breadcrumb/Breadcrumb';
import FiltersMenu from './filtersmenu/FiltersMenu';
import Search from '../../search/Search';
import StarIcon from '../../common/icons/StarIcon';

import './Intro.css';

class Intro extends React.Component {

  constructor(props) {
    super(props);

    /*
      BIG DOUBT:
      is this approach compatible with server rendering?
      should we set the values of the component state in a
      componentWillMount method???
      works fine on the client, could be pernicious on the server
    */
    const filtersState = computeActiveFilters(props.filters);
    this.state = {
      activeFilters: filtersState[0],
      filtersCount: filtersState[1],
    };

    this.updateFiltersData = this.updateFiltersData.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // seriously... there is no need to update the component unless we have to create
    // or remove UI buttons
    if (
      Object.keys(nextState.activeFilters).length !== Object.keys(this.state.activeFilters).length
    ) {
      return true;
    }
    return false;
  }

  updateFiltersData(filters) {
    const newFiltersState = computeActiveFilters(filters);
    this.setState({
      activeFilters: newFiltersState[0],
      filtersCount: newFiltersState[1],
    });
  }

  updateSearchUrl(searchUrl) {
    this.searchComponent.updateSearchUrl(searchUrl);
  }

  render() {
    return (
      <header id="intro">
        <div className="sw">

          <Breadcrumb
            ref={(breadcrumbComponent) => { this.breadcrumbComponent = breadcrumbComponent; }}
          />

          <h1 itemProp="name">
            <span>651.428 Annunci immobiliari:</span>{' '}
            <a href="" title="">Case in vendita Certosa/ Quarto Oggiaro/ Villa Pizzone (Milano)</a>
          </h1>

          <FiltersMenu
            ref={(filtersMenuComponent) => { this.filtersMenuComponent = filtersMenuComponent; }}
            channel={this.props.channel}
            filtersCount={this.state.filtersCount}
            activeFilters={this.state.activeFilters}
            clearOneFilter={this.props.clearOneFilter}
            clearAllFilters={this.props.clearAllFilters}
          />

          <Search
            ref={(searchComponent) => { this.searchComponent = searchComponent; }}
            channel={this.props.channel}
          />

          <div className="srp-user-actions">
            <a className="bookmark" href="" onClick={e => testOverlayer(e)}>
              {StarIcon()}
            </a>
            <a className="genericlead" href="" onClick={e => testOverlayer(e)}>
              {StarIcon()}
            </a>
          </div>

          <div className="list-view-options">
            <a className="tabler-filters-trigger" href="">Imposta filtri <em>Impostati 0</em></a>
            <span className="ghost">|</span>
            <a href="">Ordina</a>
            <span>|</span>
            <a href="">Risultati su mappa</a>
          </div>

        </div>
      </header>
    );
  }
}

Intro.propTypes = {
  channel: PropTypes.string,
  filters: PropTypes.instanceOf(Object),
  clearOneFilter: PropTypes.func,
  clearAllFilters: PropTypes.func,
};

Intro.defaultProps = {
  channel: 'vendita',
  filters: {},
  clearOneFilter: () => {},
  clearAllFilters: () => {},
};

export default Intro;
