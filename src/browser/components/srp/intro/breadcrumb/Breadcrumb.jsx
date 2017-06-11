import React from 'react';

const Breadcrumb = () => (
  <nav>
    <ol itemScope itemType="http://schema.org/BreadcrumbList">
      <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
        <a itemProp="item" href="" title="Lombardia">
          <span itemProp="name">Lombardia</span>
        </a>
        <span itemProp="position" content="1">&gt;</span>
      </li>
      <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
        <a itemProp="item" href="" title="Milano (provincia)">
          <span itemProp="name">Milano (provincia)</span>
        </a>
        <span itemProp="position" content="2">&gt;</span>
      </li>
      <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
        <a itemProp="item" href="" title="Milano (MI)">
          <span itemProp="name">Milano (MI)</span>
        </a>
        <span itemProp="position" content="3">&gt;</span>
      </li>
      <li itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
        <a itemProp="item" href="" title="Certosa/ Quarto Oggiaro/ Villa Pizzone">
          <span itemProp="name">Certosa/ Quarto Oggiaro/ Villa Pizzone</span>
        </a>
        <span itemProp="position" content="4" />
      </li>
    </ol>
  </nav>
);

export default Breadcrumb;
