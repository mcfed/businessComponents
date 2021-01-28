import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class FormItemFixed extends Component {
  render() {
    const firstChildType = React.Children.toArray(this.props.children).length
      ? typeof React.Children.toArray(this.props.children)[0]
      : 'string';
    const isResetCss = this.props.isResetCss;
    return (
      <div
        className={classNames({
          'element-text-box': isResetCss,
          'element-noreset': !isResetCss,
          isBeteen: firstChildType === 'string'
        })}
        style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

FormItemFixed.propsTypes = {
  /**
   * 是否应用className为element-text-box的样式
   */
  isResetCss: PropTypes.bool
};
FormItemFixed.defaultProps = {
  isResetCss: true
};
