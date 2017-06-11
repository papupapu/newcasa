import React from 'react';
import PropTypes from 'prop-types';

import './Checkbox.css';

class Checkbox extends React.Component {

  constructor(props) {
    super(props);
    this.value = props.disabled ? false : props.value;
  }

  shouldComponentUpdate() {
    // seriously... there is no need to update the component
    return false;
  }

  toggle() {
    const { scope, disabled, update } = this.props;
    if (!disabled) {
      if (!this.value) {
        this.checkbox.classList.add('checked');
        this.value = true;
      } else {
        this.checkbox.classList.remove('checked');
        this.value = false;
      }
      const choice = { [scope]: this.value };
      update(choice);
    }
  }

  reset(value) {
    this.value = value;
    // manipulate the DOM in order to reflect the user choice
    if (this.value) {
      this.checkbox.classList.add('checked');
    } else {
      this.checkbox.classList.remove('checked');
    }
  }

  render() {
    const checkboxCssClassName = this.props.disabled ? 'checkbox disabled' : 'checkbox';
    const checkCssClassName = this.value ? 'check checked' : 'check';
    return (
      <a
        href=""
        className={checkboxCssClassName}
        title="Scegli se visualizzare solo annunci con foto"
        onClick={(e) => { e.preventDefault(); this.toggle(); }}
      >
        <span
          ref={(checkbox) => { this.checkbox = checkbox; }}
          className={checkCssClassName}
        />
        {this.props.label}
      </a>
    );
  }
}

Checkbox.propTypes = {
  scope: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  update: PropTypes.func,
};

Checkbox.defaultProps = {
  scope: '',
  label: '',
  value: false,
  disabled: false,
  update: (el) => {
    console.warn('parent did not pass any "update" function via props: Checkbox is trying to pass a new value', el);
  },
};

export default Checkbox;
