import React from 'react';
import PropTypes from 'prop-types';

import { isChildOf } from '../../../helpers/DOMHelpers';

import './Select.css';

class Select extends React.Component {

  constructor(props) {
    super(props);
    this.value = props.value;
    this.updateFlag = false;
    this.outerClick = this.outerClick.bind(this);
  }

  shouldComponentUpdate() {
    // seriously... there is no need to update the component
    return false;
  }

  toggle() {
    const doc = document.body;
    if (this.select.classList.contains('open')) {
      this.select.classList.remove('open');
      this.handle.innerText = this.computeHandleText();
      if (this.updateFlag) {
        const choice = { [this.props.scope]: this.value };
        this.props.update(choice);
        this.updateFlag = false;
      }
      doc.removeEventListener('click', this.outerClick);
    } else {
      this.select.classList.add('open');
      doc.addEventListener('click', this.outerClick);
    }
  }

  outerClick(e) {
    if (
      e.target !== this.handle &&
      e.target !== this.label &&
      e.target.className !== 'confirm' &&
      !isChildOf(e.target, this.optionList)
    ) {
      this.toggle();
    }
  }

  computeHandleText() {
    const { type, values } = this.props;
    let text;
    if (type === 'single') {
      text = this.value === 'all' ? values[0] : this.value;
    } else {
      text = this.value.length > 1 ? '>1 - translation needed' : this.value[0];
      text = text === 'all' ? values[0] : text;
    }
    return text;
  }

  computeOptionsList() {
    const { scope, type, values } = this.props;
    const options = [];
    values.forEach(
      (el, index) => {
        let cssClassName;
        if (type === 'multiple') {
          cssClassName = this.value.indexOf(el) > -1 ? 'selected' : '';
          if (index === 0 && this.value[0] === 'all') {
            cssClassName = 'selected';
          }
        } else {
          cssClassName = el === this.value || (this.value === 'all' && index === 0) ? 'selected' : '';
        }
        const ind = index;
        const option = (
          <li key={`${scope}-${ind}`}>
            <a
              href=""
              title={el}
              className={cssClassName}
              onClick={(e) => { e.preventDefault(); this.actionProxy(el, e); }}
            >
              {el}
            </a>
          </li>
        );
        options.push(option);
      },
    );
    return options;
  }

  actionProxy(el, e) {
    const { type, values, defaultValue } = this.props;
    const clicked = e.target;
    let value = el;
    if (type === 'single') {
      if ( // click on selected option
        value === this.value &&
        value !== values[0]
      ) {
        value = defaultValue;
        const defaultOption = this.optionList.querySelectorAll('li')[0].firstChild;
        defaultOption.classList.add('selected');
        clicked.classList.remove('selected');
      } else {
        if ( // click on default/reset option
          value === values[0]
        ) {
          value = defaultValue;
        }
        const previousOption = this.optionList.querySelector('.selected');
        previousOption.classList.remove('selected');
        clicked.classList.add('selected');
      }
      // if the filter value changed
      if (this.value !== value) {
        this.updateFlag = true;
        this.value = value; // store new filter value
      }
      this.toggle();
      // multiple choices
    } else if ( // remove an already selected option
        value !== values[0] &&
        this.value.indexOf(value) > -1
    ) {
      this.value.splice(this.value.indexOf(value), 1);
      clicked.classList.remove('selected');
      if (this.value.length === 0) { // no selected options: reset select value
        this.value = ['all'];
        const defaultOption = this.optionList.querySelectorAll('li')[0].firstChild;
        defaultOption.classList.add('selected');
      }
      this.updateFlag = true;
    } else if (
        value !== values[0] &&
        this.value.indexOf(value) === -1
    ) { // add a new option
      this.value.push(value);
      const def = this.value.indexOf('all');
      if (def > -1) {
        this.value.splice(def, 1);
        const defaultOption = this.optionList.querySelectorAll('li')[0].firstChild;
        defaultOption.classList.remove('selected');
      }
      clicked.classList.add('selected');
      this.updateFlag = true;
    } else { // reset to default value
      this.value = ['all'];
      const previousOptions = this.optionList.querySelectorAll('.selected');
      previousOptions.forEach(
        (previous) => {
          previous.classList.remove('selected');
        },
      );
      clicked.classList.add('selected');
      this.updateFlag = true;
    }
  }

  reset(value) {
    this.value = value;
    // manipulate the DOM in order to reflect the user choice
    const previousChoices = this.optionList.querySelectorAll('.selected');
    previousChoices.forEach(
        (el) => {
          el.classList.remove('selected');
        },
      );
    const defaultChoice = this.optionList.querySelectorAll('li')[0].firstChild;
    defaultChoice.classList.add('selected');

    // manipulate the DOM in order to reflect the user choice
    this.handle.innerText = this.computeHandleText();
  }

  render() {
    const handleText = this.computeHandleText();
    const options = this.computeOptionsList();
    let confirm = null;
    if (this.props.type === 'multiple') {
      const confirmTop = this.props.values.length < 6 ? `${(this.props.values.length * 35) + 35}px` : '245px';
      confirm = (
        <a
          href=""
          title="Conferma la tua scelta"
          className="confirm"
          style={{ top: confirmTop }}
          onClick={(e) => { e.preventDefault(); this.toggle(); }}
        >
          OK
        </a>
      );
    }
    return (
      <div className="select" ref={(select) => { this.select = select; }}>
        <p>
          <a
            ref={(label) => { this.label = label; }}
            href=""
            title={this.props.label}
            onClick={(e) => { e.preventDefault(); this.toggle(); }}
          >
            {this.props.label}
          </a>
        </p>
        <a
          ref={(handle) => { this.handle = handle; }}
          href=""
          className="handle"
          title={handleText}
          onClick={(e) => { e.preventDefault(); this.toggle(); }}
        >
          {handleText}
        </a>
        <ul ref={(optionList) => { this.optionList = optionList; }}>
          {options}
        </ul>
        {confirm}
      </div>
    );
  }
}

Select.propTypes = {
  scope: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]),
  values: PropTypes.instanceOf(Array),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]),
  update: PropTypes.func,
};

Select.defaultProps = {
  scope: '',
  label: '',
  type: 'single',
  value: '',
  values: [],
  defaultValue: '',
  update: (el) => {
    console.warn('parent did not pass any "update" function via props: Select is trying to pass a new value', el);
  },
};

export default Select;
