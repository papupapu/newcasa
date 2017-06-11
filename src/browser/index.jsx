import React from 'react';
import ReactDOM from 'react-dom';

import './style/casa.css';
import './style/srp.css';

import { testOverlayer } from './helpers/DOMHelpers';
import { computeSearchUrl } from './helpers/search/Search';
import { computeActiveFilters } from './helpers/filters/Filters';

import { HEADER_NAV_LINKS } from './constants/header/Header';
import {
  FOOTER_SITE_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_INTERNATIONAL_LINKS,
  FOOTER_COMPANY_INFOS,
} from './constants/footer/Footer';

import Header from './components/header/Header';
import ListingPage from './ListingPage';
import Footer from './components/footer/Footer';
import Overlayer from './components/common/overlayer/Overlayer';

class Test extends React.Component {

  constructor(props) {
    super(props);

    this.channel = 'vendita';
    this.updateSearchUrl = this.updateSearchUrl.bind(this);
  }

  updateSearchUrl(filters) {
    const activeFilters = computeActiveFilters(filters);
    const searchUrl = computeSearchUrl(this.channel, activeFilters[0]);
    this.listingPageComponent.updateSearchUrl(searchUrl);
  }

  render() {
    return (
      <div className="casait srp">
        {
          Header(
            {
              channel: this.channel,
              isHome: false,
              pageTitle: 'Case e appartamenti in vendita in Certosa/ Quarto Oggiaro/ Villa Pizzone (Milano) – Annunci immobiliari - Casa.it',
              navLinksData: HEADER_NAV_LINKS,
            },
          )
        }
        <ListingPage
          ref={(listingPageComponent) => { this.listingPageComponent = listingPageComponent; }}
          channel={this.channel}
          updateSearchUrl={this.updateSearchUrl}
        />
        {
          Footer(
            {
              siteLinksData: FOOTER_SITE_LINKS,
              socialLinksData: FOOTER_SOCIAL_LINKS,
              internationalLinksData: FOOTER_INTERNATIONAL_LINKS,
              companyData: FOOTER_COMPANY_INFOS,
            },
          )
        }
        {
          Overlayer(
            {
              action: testOverlayer,
            },
          )
        }
      </div>
    );
  }
}

ReactDOM.render(
  <Test />,
  document.querySelector('#app'),
);
