import React from 'react';
import PropTypes from 'prop-types';

class Permission extends React.Component {
  render() {
    let {expression} = this.props;
    const childrenWithProps = expression
      ? React.Children.map(this.props.children, child =>
          React.cloneElement(child, {})
        )
      : null;
    return childrenWithProps;
  }
}

Permission.propTypes = {
  expression: PropTypes.any
};
Permission.defaultProps = {
  /**
   * 表达式结果为真渲染子组件可见，否则，不可见
   */
  expression: true
};

export default Permission;
