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
import Modal from './components/common/modal/Modal';
import Overlayer from './components/common/overlayer/Overlayer';

class Test extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };

    this.channel = 'vendita';

    this.modalType = '';
    this.modalData = null;
    this.uiHiddenComponents = ['menu', 'modal'];

    this.prepareModal = this.prepareModal.bind(this);
    this.toggleSiteHiddenComponents = this.toggleSiteHiddenComponents.bind(this);
    this.updateSearchUrl = this.updateSearchUrl.bind(this);
  }

  componentDidMount() {
    /*
    const ui = userDevice();
    this.setUiInfos(ui);
    window.addEventListener('resize', () => {
      const updatedUi = userDevice();
      this.setUiInfos(updatedUi);
    });
    */
    this.doc = document.body;
  }

  toggleSiteHiddenComponents(evt, obj) {
    if (this.doc !== null) {
      const docClass = this.doc.classList;
      let action = evt.target.className;
      let updateModalState = false;
      if (action.indexOf('_handle') > -1) {
        action = action.replace('_handle', '_open');
        updateModalState = action === 'modal_open';
        if (docClass.contains(action)) {
          docClass.remove(action);
          docClass.add('closing');
          setTimeout(() => { docClass.remove('closing'); }, 305);
          // enableScroll();
        } else {
          this.uiHiddenComponents.forEach(
            (component) => {
              const oldaction = `${component}_open`;
              if (docClass.contains(oldaction) && oldaction !== action) {
                docClass.remove(oldaction);
                updateModalState = oldaction === 'modal_open';
              }
            },
          );
          docClass.add(action);
          // disableScroll();
        }
        if (updateModalState) {
          this.modalType = !this.state.modal ? evt.target.getAttribute('data-action') : '';
          this.modalData = !this.state.modal && obj !== null ? obj : null;
          this.setState({ modal: !this.state.modal });
        }
      } else { // overlayer
        this.uiHiddenComponents.forEach(
          (component) => {
            const oldaction = `${component}_open`;
            if (docClass.contains(oldaction)) {
              docClass.remove(oldaction);
              docClass.add('closing');
              setTimeout(() => { docClass.remove('closing'); }, 305);
              // enableScroll();
            }
          },
        );
        if (this.state.modal) {
          this.modalType = '';
          this.modalData = null;
          this.setState({ modal: false });
        }
      }
    }
  }

  updateSearchUrl(filters) {
    const activeFilters = computeActiveFilters(filters);
    const searchUrl = computeSearchUrl(this.channel, activeFilters[0]);
    this.listingPageComponent.updateSearchUrl(searchUrl);
  }

  prepareModal() {
    return (
      <Modal
        type={this.modalType}
        data={this.modalData}
        close={this.toggleSiteHiddenComponents}
      />
    );
  }

  render() {
    const modal = this.state.modal ? this.prepareModal() : null;
    return (
      <div className="casait srp">
        {
          Header(
            {
              channel: this.channel,
              isHome: false,
              pageTitle: 'Case e appartamenti in vendita in Certosa/ Quarto Oggiaro/ Villa Pizzone (Milano) – Annunci immobiliari - Casa.it',
              navLinksData: HEADER_NAV_LINKS,
              openModal: this.toggleSiteHiddenComponents,
              toggleSiteNavigation: this.toggleSiteHiddenComponents,
            },
          )
        }
        <ListingPage
          ref={(listingPageComponent) => { this.listingPageComponent = listingPageComponent; }}
          channel={this.channel}
          openModal={this.toggleSiteHiddenComponents}
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
        {modal}
        {
          Overlayer(
            {
              action: this.toggleSiteHiddenComponents,
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
