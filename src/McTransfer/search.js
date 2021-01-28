import React from 'react';
import PropTypes from 'prop-types';

export default class Search extends React.Component {
  handleChange = e => {
    const onChange = this.props.onChange;
    /* istanbul ignore else */
    if (onChange) {
      onChange(e);
    }
  };

  render() {
    const {placeholder, value, prefixCls, searchRender} = this.props;

    return (
      <div className={`${prefixCls}-wapper`}>
        {React.cloneElement(searchRender, {
          placeholder: placeholder,
          className: prefixCls,
          value: value,
          onChange: this.handleChange
        })}
      </div>
    );
  }
}

Search.defaultProps = {
  placeholder: ''
};

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  prefixCls: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired
};
