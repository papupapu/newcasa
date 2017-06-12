import React from 'react';
import PropTypes from 'prop-types';

import './style/srp.css';

import Intro from './components/srp/intro/Intro';
import ArticlePlatinum from './components/srp/article/ArticlePlatinum';
import ArticleGold from './components/srp/article/ArticleGold';
import ArticleSilver from './components/srp/article/ArticleSilver';
import Article from './components/srp/article/Article';
import Filters from './components/common/filters/Filters';

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

  shouldComponentUpdate(nextProps) {
    const device = nextProps.device !== '' && nextProps.device !== this.props.device;
    const viewport = nextProps.viewport.width !== '' && nextProps.viewport.width !== this.props.viewport.width;
    if (device || viewport) {
      return true;
    }
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
          {
            ArticlePlatinum({
              device: this.props.device,
              viewport: this.props.viewport,
              openModal: this.props.openModal,
            })
          }
          {
            ArticleGold({
              device: this.props.device,
              viewport: this.props.viewport,
              openModal: this.props.openModal,
            })
          }
          {
            ArticleSilver({
              device: this.props.device,
              viewport: this.props.viewport,
              openModal: this.props.openModal,
            })
          }
          {
            Article({
              device: this.props.device,
              viewport: this.props.viewport,
              openModal: this.props.openModal,
            })
          }
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
  device: PropTypes.string,
  viewport: PropTypes.instanceOf(Object),
  channel: PropTypes.string,
  updateSearchUrl: PropTypes.func,
  openModal: PropTypes.func,
};

ListingPage.defaultProps = {
  device: '',
  viewport: { width: '', height: '' },
  channel: 'vendita',
  updateSearchUrl: () => {},
  openModal: () => {},
};

export default ListingPage;
