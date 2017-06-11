import React from 'react';
import PropTypes from 'prop-types';

import './Search.css';

class Search extends React.Component {

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  updateSearchUrl(searchUrl) {
    this.formElement.setAttribute('action', `http://www.casa.it/${searchUrl}`);
  }

  render() {
    return (
      <div className="search">
        <form
          ref={(formElement) => { this.formElement = formElement; }}
          action="/"
        >
          <div className="qscontainer">
            <input
              id="qs"
              type="text"
              value=""
              placeholder="Es. Milano o 20121 o Via Mercato, Milano"
            />
            <button className="close">Chiudi</button>
            <div className="suggestions" />
          </div>
          <div className="searchsubmitCont">
            <input id="searchsubmit" type="submit" value="Cerca" />
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
