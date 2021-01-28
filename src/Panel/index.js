import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Spin} from 'antd';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import Locale from './locale.js';

export default class Panel extends Component {
  renderHeader() {
    let header;
    const {prefixCls, title, extra} = this.props;
    if (title || extra) {
      header = React.createElement(
        'div',
        {className: prefixCls + '-head'},
        React.createElement(
          'div',
          {className: prefixCls + '-head-wrapper'},
          title &&
            React.createElement(
              'div',
              {className: prefixCls + '-head-title'},
              title
            ),
          extra &&
            React.createElement('div', {className: prefixCls + '-extra'}, extra)
        )
      );
    }
    return header;
  }
  renderBody() {
    const {props} = this;
    const {prefixCls} = this.props;
    return React.createElement(
      'div',
      {className: prefixCls + '-body'},
      props.children
    );
  }

  renderFooterButton(locale) {
    const {onOk, onCancel, confirmLoading} = this.props;
    return [
      <Button
        key='submit'
        loading={confirmLoading}
        onClick={onOk}
        type='primary'>
        {locale.okText}
      </Button>,
      <Button key='cancel' onClick={onCancel}>
        {locale.cancelText}
      </Button>
    ];
  }

  renderFooterLocale(locale) {
    const {props} = this;
    return props.footer ? props.footer() : this.renderFooterButton(locale);
  }

  renderFooter(locale) {
    let footer;
    const {props} = this;
    const {prefixCls} = this.props;
    const contextLocale = Object.assign({}, locale, this.props.locale);
    if (props.footer != false) {
      footer = React.createElement(
        'div',
        {className: prefixCls + '-footer'},
        this.renderFooterLocale(contextLocale)
      );
    } else {
      footer = null;
    }
    return footer;
  }
  render() {
    const {prefixCls, loading, className} = this.props;
    return (
      <div className={`${prefixCls}-wrapper ${className}`}>
        <Spin spinning={loading}>
          <div className={`${prefixCls} ${className}`}>
            {this.renderHeader()}
            {this.renderBody()}
            {React.createElement(
              LocaleReceiver,
              {
                componentName: 'Panel',
                defaultLocale: Locale
              },
              this.renderFooter.bind(this)
            )}
          </div>
        </Spin>
      </div>
    );
  }
}

Panel.propTypes = {
  /**
  确定按钮响应事件
  **/
  onOK: PropTypes.func,
  /**
  取消按钮响应事件
  **/
  onCancel: PropTypes.func,
  /**
  panel面板标题
  **/
  title: PropTypes.string,
  /**
  确认按钮文字自定义
  **/
  okText: PropTypes.string,
  /**
  消按钮文字自定义
  **/
  cancelText: PropTypes.string,
  /**
  自定义footer
  **/
  footer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.element,
    PropTypes.func
  ]),
  /**
  二次确认时的loading状态，true时确定操作按钮不可操作
  **/
  confirmLoading: PropTypes.bool,
  /**
  国际化
  **/
  locale: PropTypes.object,
  /**
  整个panel的loading状态，true时整个面板不能操作
  **/
  loading: PropTypes.bool,
  /**
   * Panel 增加自定义 className 名称，支持自定义样式 特殊化 使用
   */
  className: PropTypes.string
};
Panel.defaultProps = {
  prefixCls: 'ant-panel',
  onOk: function() {},
  loading: false,
  onCancel: function() {},
  title: '',
  confirmLoading: false,
  className: ''
};
