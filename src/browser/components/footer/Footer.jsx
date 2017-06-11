import React from 'react';
import PropTypes from 'prop-types';

import './Footer.css';

const Footer = ({ siteLinksData, socialLinksData, internationalLinksData, companyData }) => {
  const siteLinks = [];
  Object.keys(siteLinksData).forEach(
    (el, index) => {
      const ind = index;
      const linkData = siteLinksData[el];
      const cssClassName = linkData.cssClassName !== '' ? linkData.cssClassName : null;
      const link = (
        <li key={`site-link-${ind}`} className={cssClassName}>
          <a
            href={linkData.url}
            title={linkData.text}
          >
            {linkData.text}
          </a>
        </li>
      );
      siteLinks.push(link);
    },
  );

  const socialLinks = [];
  Object.keys(socialLinksData).forEach(
    (el, index) => {
      const ind = index;
      const linkData = socialLinksData[el];
      const link = (
        <li key={`social-link-${ind}`}>
          <a
            href={linkData.url}
            title={linkData.title}
          >
            {linkData.text}
          </a>
        </li>
      );
      socialLinks.push(link);
    },
  );

  const internationalLinks = [];
  Object.keys(internationalLinksData).forEach(
    (el, index) => {
      const ind = index;
      const linkData = internationalLinksData[el];
      const link = (
        <a
          key={`intl-link-${ind}`}
          href={linkData.url}
          title={linkData.text}
        >
          {linkData.text}
        </a>
      );
      internationalLinks.push(link);
    },
  );

  return (
    <footer id="footer">
      <div className="sw">
        <ul className="footer-links">
          {siteLinks}
        </ul>
        <ul className="social-links">
          {socialLinks}
        </ul>
      </div>
      <div className="intl">
        <div className="sw">
          <p>
            <strong>International sites:</strong>
            {internationalLinks}
          </p>
        </div>
      </div>
      <div className="sw legal">
        {companyData}
      </div>
    </footer>
  );
};

Footer.propTypes = {
  siteLinksData: PropTypes.instanceOf(Object),
  socialLinksData: PropTypes.instanceOf(Object),
  internationalLinksData: PropTypes.instanceOf(Object),
  companyData: PropTypes.string,
};

Footer.defaultProps = {
  siteLinksData: {},
  socialLinksData: {},
  internationalLinksData: {},
  companyData: '',
};

export default Footer;
