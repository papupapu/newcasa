import React from 'react';
import PropTypes from 'prop-types';

import StarIcon from '../../common/icons/StarIcon';

const Article = ({ openModal }) => (
  <article className="gold" itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
    <meta itemProp="position" content="2" />
    <link itemProp="url" href="/immobile-villetta%20a%20schiera-veneto-este-31911976/" />
    <div itemScope itemType="http://schema.org/SingleFamilyResidence">
      <h1 itemProp="address" itemScope="" itemType="http://schema.org/PostalAddress">
        <a href="/immobile-villetta%20a%20schiera-veneto-este-31911976/">
          <span itemProp="streetAddress">VIA CASELLA 14</span>, <span itemProp="addressLocality">Milano (MI)</span>
          <meta itemProp="addressRegion" content="Lombardia" />
        </a>
      </h1>
      <p itemProp="name" className="propertyType">
        <span>Certosa/ Quarto Oggiaro/ Villa Pizzone</span>
        Nuova costruzione
      </p>
      <ul className="infos">
        <li className="price">&euro; 10.000.000</li>
        <li className="numParkingSpaces">5 <span>p. auto</span></li>
        <li className="numRooms">10 <span>locali</span></li>
        <li className="mq">1.000 <span>mq</span></li>
      </ul>
      <p itemProp="description" className="desc">
        Trilocale (4° piano)-Il progetto edilizio prevede la realizzazione di un edificio di 5 piani fuori terra...
      </p>
      <figure>
        <a itemProp="url" href="/immobile-villetta%20a%20schiera-veneto-este-31911976/">
          <img itemProp="photo" src="http://images-1.casa.it/360x265/listing/e89009aab59ef173af63311466e0d8be" alt="" />
          <span>Gold</span>
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
              onClick={(evt) => { evt.preventDefault(); openModal(evt, { title: 'VIA CASELLA 14, Milano (MI)', subtitle: 'Nuova costruzione - 10.000.000 euro' }); }}
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
