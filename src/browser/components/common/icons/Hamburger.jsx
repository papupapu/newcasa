import React from 'react';

import './Hamburger.css';

const Hamburger = () => (
  <svg className="hamburger" height="24" width="24" viewBox="0 0 24 24">
    <path className="x" fillRule="evenodd" d="M 0 11 L 24 11 L 24 13 L 0 13 L 0 11 Z M 0 11" />
    <path className="y" fillRule="evenodd" d="M 0 11 L 24 11 L 24 13 L 0 13 L 0 11 Z M 0 11" />
    <path className="a" fillRule="evenodd" d="M 0 19 L 24 19 L 24 21 L 0 21 L 0 19 Z M 0 19" />
    <path className="b" fillRule="evenodd" d="M 0 3 L 24 3 L 24 5 L 0 5 L 0 3 Z M 0 3" />
  </svg>
);

export default Hamburger;
