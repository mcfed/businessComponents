import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
// import Panel from '../Panel'
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;

export default class TabsPanel extends PureComponent {
  stringifyURL(str, options) {
    if (!str) {
      return str;
    }
    return str.replace(/:(\w+)/gi, function(match, p1) {
      var replacement = options[p1];
      if (!replacement) {
        throw new Error(
          'Could not find url parameter ' + p1 + ' in passed options object'
        );
      }
      return replacement;
    });
    // return str
  }
  onChange(activeKey) {
    const {
      history,
      match: {path, params},
      paramName
    } = this.props;
    history.push(
      this.stringifyURL(
        path,
        Object.assign({}, params, {[paramName]: activeKey})
      )
    );
  }
  renderModule(child) {
    const {children, ...otherProps} = this.props;
    const childProps = child.props;
    return React.createElement(
      TabPane,
      {tab: childProps.title, key: childProps.path},
      typeof childProps.children === 'function'
        ? React.createElement(childProps.children, otherProps)
        : React.cloneElement(childProps.children, otherProps)
    );
  }
  renderPanes() {
    const {children} = this.props;
    return [].concat(children).map(child => this.renderModule(child));
  }

  render() {
    const {
      match: {params},
      defaultPath,
      paramName
    } = this.props;
    // console.log(params[paramName],Object.assign({},params,{[paramName]:1}))
    return (
      <Tabs
        activeKey={params[paramName] || defaultPath}
        animated={false}
        onChange={this.onChange.bind(this)}>
        {this.renderPanes()}
      </Tabs>
    );
  }
}

TabsPanel.propTypes = {
  /**
   * 自定义url路径参数
   */
  paramName: PropTypes.string,
  /**
   * 默认url路径参数
   */
  defaultPath: PropTypes.string,
  /**
   * 当前窗口的浏览历史
   */
  history: PropTypes.object
};

TabsPanel.defaultProps = {
  paramName: 'type',
  defaultPath: undefined
};
