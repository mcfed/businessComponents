import React from 'react';
import PropTypes from 'prop-types';

/**
 * 按角色名称权限进行展示
 * @type {Object}
 */

export default class RolePermission extends React.Component {
  static contextTypes = {
    appConfig: PropTypes.object
  };
  static propTypes = {
    /**
     * 角色名称
     */
    roleName: PropTypes.string
  };
  static defaultProps = {
    roleName: 'normal'
  };

  render() {
    let {roleName} = this.props;
    let {appConfig} = this.context;
    if (appConfig == undefined) {
      //throw new TypeError("RolePermission not has context appConfig props");
      return null;
    } else {
      const childrenWithProps =
        roleName === appConfig.auth.authRole
          ? React.Children.map(this.props.children, child =>
              React.cloneElement(child, {})
            )
          : null;
      return childrenWithProps;
    }
  }
}
