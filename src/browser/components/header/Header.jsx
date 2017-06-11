import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

import Hamburger from '../common/icons/Hamburger';
import Avatar from '../common/icons/Avatar';

const Header = ({ channel, isHome, pageTitle, navLinksData }) => {
  const logo = isHome ? (
    <h1 className="logo">
      <a href="/" title={pageTitle}>{pageTitle}</a>
    </h1>
  ) : (
    <div className="logo">
      <a href="/" title={pageTitle}>{pageTitle}</a>
    </div>
  );

  const navLinks = [];
  Object.keys(navLinksData).forEach(
    (el, index) => {
      const ind = index;
      const linkData = navLinksData[el];
      const cssClassName = el === channel ? 'current' : null;
      const link = (
        <li key={`nav-link-${ind}`} itemProp="name">
          <a
            itemProp="url"
            className={cssClassName}
            href={linkData.url}
            title={linkData.title}
          >
            {linkData.text}
          </a>
        </li>
      );
      navLinks.push(link);
    },
  );

  return (
    <header id="header">
      <div className="sw">
        {logo}
        <nav id="sitenav" className="noTransition">
          <ul itemScope itemType="http://www.schema.org/SiteNavigationElement">
            {navLinks}
          </ul>
        </nav>

        <menu id="sitemenu">
          <ul>
            <li>
              <a className="menu" href="" title="Menu">
                {Hamburger()}
              </a>
            </li>
            <li>
              <a
                className="pubblica-annunci"
                href="/pubblica-annunci/"
                title="Area riservata"
              >
                Area riservata
              </a>
            </li>
            <li>
              <a className="mycasa" href="" title="Accedi a MyCasa">
                {Avatar({ isAuthenticated: false })}
              </a>
            </li>
          </ul>
        </menu>
        <div id="top-ad" className="leaderboard" />
      </div>
    </header>
  );
};

Header.propTypes = {
  channel: PropTypes.string,
  isHome: PropTypes.bool,
  pageTitle: PropTypes.string,
  navLinksData: PropTypes.instanceOf(Object),
};

Header.defaultProps = {
  channel: 'vendita',
  isHome: false,
  pageTitle: 'Case e appartamenti in vendita – Annunci immobiliari - Casa.it',
  navLinksData: {},
};

export default Header;
