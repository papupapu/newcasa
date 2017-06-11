import React from 'react';
import PropTypes from 'prop-types';

import './Overlayer.css';

const Overlayer = ({ action }) => (
  <area
    href="#"
    className="overlayer"
    onClick={e => action(e)}
  />
);

Overlayer.propTypes = {
  action: PropTypes.func,
};

Overlayer.defaultProps = {
  action: () => {},
};

export default Overlayer;
