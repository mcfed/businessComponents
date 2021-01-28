import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Layout extends Component {
  static defaultProps = {
    direction: 'column',
    position: false,
    className: 'layout-default'
  };
  static propTypes = {
    direction: PropTypes.oneOf(['column', 'rows'])
  };

  render() {
    let {children, direction, style, className} = this.props;
    let styles = Object.assign(
      {},
      {
        display: 'flex',
        flex: '1',
        overflow: 'hidden',
        flexDirection: direction
      },
      style
    );
    return (
      <div className={`layout ${className}`} style={styles}>
        {children}
      </div>
    );
  }
}

class Fixed extends Component {
  static defaultProps = {
    direction: 'column'
  };
  static defaultTypes = {};
  render() {
    let {children, style, direction} = this.props;
    let styles = Object.assign(
      {display: 'flex', flexDirection: direction},
      style
    );
    return (
      <div className='layout-fixed' style={styles}>
        {children}
      </div>
    );
  }
}

class Pane extends Component {
  static defaultProps = {
    className: 'layout-pane-default'
  };
  render() {
    let {children, style, className} = this.props;

    let styles = Object.assign(
      {},
      {display: 'flex', flex: '1', position: 'relative'},
      style
    );
    const combineClassName = `layout-pane ${className}`;
    return (
      <div className={combineClassName} style={styles}>
        {children}
      </div>
    );
  }
}

export {Layout, Fixed, Pane};
