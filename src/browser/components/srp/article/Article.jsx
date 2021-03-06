import React from 'react';
import PropTypes from 'prop-types';

import StarIcon from '../../common/icons/StarIcon';

const Article = ({ openModal }) => (
  <article className="standard" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
    <meta itemProp="position" content="4" />
    <link itemProp="url" href="/immobile-appartamento-lombardia-milano-31760864" />
    <div itemScope itemType="http://schema.org/SingleFamilyResidence">
      <h1 itemProp="address" itemScope="" itemType="http://schema.org/PostalAddress">
        <a href="/immobile-appartamento-lombardia-milano-31760864">
          <span itemProp="streetAddress">Via Pico della mirandola</span>, <span itemProp="addressLocality">Milano (MI)</span>
          <meta itemProp="addressRegion" content="Lombardia" />
        </a>
      </h1>
      <p itemProp="name" className="propertyType">
        <span>Certosa/ Quarto Oggiaro/ Villa Pizzone</span>
        Appartamento
      </p>
      <ul className="infos">
        <li className="price">&euro; 10.000.000</li>
        <li className="numParkingSpaces">5 <span>p. auto</span></li>
        <li className="numRooms">10 <span>locali</span></li>
        <li className="mq">1.000 <span>mq</span></li>
      </ul>
      <p itemProp="description" className="desc">
        Adiacenze P.zza Accursio in via tranquilla proponiamo appartamento di 135 mq, piano alto, tripla esposizione....
      </p>
      <figure>
        <a itemProp="url" href="/immobile-appartamento-lombardia-milano-31760864">
          <img itemProp="photo" src="http://images-1.casa.it/360x265/listing/cc38627c02cd5ff2cb4b050eae01642d" alt="" />
        </a>
      </figure>
      <menu>
        <ul>
          <li>
            <a className="agency" href="" title="">
              <img src="http://images-1.casa.it/logo/3b2d25b825a3682f98206ca4461319eb" alt="" />
            </a>
          </li>
          <li className="bookmark">
            <a
              href=""
              data-action="sendMail"
              className="modal_handle"
              onClick={(evt) => { evt.preventDefault(); openModal(evt, { title: 'Via Pico della mirandola, Milano (MI)', subtitle: 'Appartamento - 10.000.000 euro' }); }}
            >
              {StarIcon()}
            </a>
          </li>
        </ul>
      </menu>
    </div>
  </article>
);

Article.propTypes = {
  openModal: PropTypes.func,
};

Article.defaultProps = {
  openModal: () => {},
};

export default Article;
