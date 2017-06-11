import React from 'react';
import PropTypes from 'prop-types';

import StarIcon from '../../common/icons/StarIcon';

const Article = ({ openModal }) => (
  <article className="platinum" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
    <meta itemProp="position" content="1" />
    <link itemProp="url" href="/immobile-appartamento-veneto-este-33119605/" />
    <div itemScope itemType="http://schema.org/SingleFamilyResidence">
      <h1 itemProp="address" itemScope="" itemType="http://schema.org/PostalAddress">
        <a itemProp="url" href="/immobile-appartamento-veneto-este-33119605/">
          <span itemProp="streetAddress">Via Casella 10</span>,{' '}
          <span itemProp="addressLocality">Milano (MI)</span>
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
        MM Portello/Via Casella in stabile epoca trilocale ultimo piano
          composto da ingresso, soggiorno con angolo...
      </p>
      <figure>
        <a itemProp="url" href="/immobile-appartamento-veneto-este-33119605/">
          <img itemProp="photo" src="http://images-1.casa.it/360x265/listing/62e3d282ae75cf24efe91c752c42602c" alt="" />
          <span>Platinum</span>
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
              onClick={(evt) => { evt.preventDefault(); openModal(evt, { title: 'Via Casella 10, Milano (MI)', subtitle: 'Appartamento - 10.000.000 euro' }); }}
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
