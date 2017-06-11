import React from 'react';
import PropTypes from 'prop-types';

import './style/srp.css';

import Intro from './components/srp/intro/Intro';
import ArticlePlatinum from './components/srp/article/ArticlePlatinum';
import ArticleGold from './components/srp/article/ArticleGold';
import ArticleSilver from './components/srp/article/ArticleSilver';
import Article from './components/srp/article/Article';
import Filters from './components/filters/Filters';

class ListingPage extends React.Component {

  constructor(props) {
    super(props);

    this.filters = {
      balcony: false,
      category: 'residenziale',
      garden: 'all',
      heating: 'all',
      lift: false,
      mqMax: 'all',
      mqMin: 'all',
      numBaths: 'all',
      numParkingSpaces: 'all',
      numRooms: 'all',
      photo: false,
      priceMax: 'all',
      priceMin: 'all',
      propertyTypes: ['all'],
      sellerType: ['all'],
      sortType: 'relevance',
      surrounding: true,
      terrace: false,
      zones: 'all',
    };

    this.clearOneFilter = this.clearOneFilter.bind(this);
    this.clearAllFilters = this.clearAllFilters.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  clearOneFilter(scope) {
    this.filtersComponent.clearOneFilter(scope);
  }

  clearAllFilters() {
    this.filtersComponent.clearAllFilters();
  }

  updateFilters(newFilters) {
    this.props.updateSearchUrl(newFilters);
    this.introComponent.updateFiltersData(newFilters);
    this.filters = newFilters;
  }

  updateSearchUrl(searchUrl) {
    this.introComponent.updateSearchUrl(searchUrl);
  }

  render() {
    return (
      <section itemScope itemType="http://schema.org/ItemList">
        <Intro
          ref={(introComponent) => { this.introComponent = introComponent; }}
          channel={this.channel}
          filters={this.filters}
          openModal={this.props.openModal}
          clearOneFilter={this.clearOneFilter}
          clearAllFilters={this.clearAllFilters}
        />
        <div className="sw">
          {ArticlePlatinum({ openModal: this.props.openModal })}
          {ArticleGold({ openModal: this.props.openModal })}
          {ArticleSilver({ openModal: this.props.openModal })}
          {Article({ openModal: this.props.openModal })}
          <aside>
            <Filters
              ref={(filtersComponent) => { this.filtersComponent = filtersComponent; }}
              channel={this.props.channel}
              filters={this.filters}
              passNewFilters={this.updateFilters}
            />
          </aside>
        </div>
      </section>
    );
  }
}

ListingPage.propTypes = {
  channel: PropTypes.string,
  updateSearchUrl: PropTypes.func,
  openModal: PropTypes.func,
};

ListingPage.defaultProps = {
  channel: 'vendita',
  updateSearchUrl: () => {},
  openModal: () => {},
};

export default ListingPage;
