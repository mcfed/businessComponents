import React from 'react';
import {shallow, render, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {Button} from 'antd';
import Panel from '../index';
import Locale from '../locale.js';

const setup = props => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<Panel {...props}>abc</Panel>);
  return {
    props,
    wrapper
  };
};

describe('Panel 组件是否渲染 default props', () => {
  // case1
  // 通过查找存在 Input,测试组件正常渲染
  it.skip('Panel Component should be render', () => {
    const {wrapper, props} = setup({});
    expect(wrapper.find('.ant-panel-head').exists()).toBe(false);
    expect(wrapper.find('.ant-panel-body').exists()).toBe(true);
    expect(wrapper.find('.ant-panel-footer').exists()).toBe(true);
  });

  it('Panel Component should be with {title=title} render ', () => {
    const {wrapper, props} = setup({title: 'title'});
    expect(wrapper.find('.ant-panel-head').exists()).toBe(true);
    expect(wrapper.find('.ant-panel-head-title').prop('children')).toBe(
      'title'
    );
  });

  it('Panel Component should be with {footer=false} render ', () => {
    const {wrapper, props} = setup({footer: false});
    expect(wrapper.find('.ant-panel-footer').exists()).toBe(false);
  });
  it('Panel Component should be with extra render ', () => {
    const {wrapper, props} = setup({extra: '123'});
    expect(wrapper.find('.ant-panel-extra').exists()).toBe(true);
  });

  it('Panel Component should be with {loading=true} render ', () => {
    const {wrapper, props} = setup({loading: true});
    expect(wrapper.find('Spin').prop('spinning')).toBe(true);
  });

  it.skip('Panel Component should be with {confirmLoading=true} render ', () => {
    const {wrapper, props} = setup({confirmLoading: true});
    expect(wrapper.find('Button[type="primary"]').prop('loading')).toBe(true);
  });

  it('Panel Component LocaleReceiver must exist', done => {
    const {wrapper, props} = setup();
    expect(wrapper.find('LocaleReceiver').exists()).toBe(true);
    expect(wrapper.find('LocaleReceiver').prop('componentName')).toBe('Panel');
    expect(wrapper.find('LocaleReceiver').prop('defaultLocale')).toEqual(
      Locale
    );
    // expect(wrapper.find('LocaleReceiver').prop('children')(Locale)).toBe(wrapper.instance().renderFooter.call(wrapper.instance(),Locale))
    done();
  });

  it('Panel instace renderFooterButton ', done => {
    const {wrapper, props} = setup();
    // console.log(Locale)
    const locale = {
      cancelText: 'cancelText',
      okText: 'okText'
    };
    const footer = wrapper.instance().renderFooterButton(locale);
    expect(footer[0].props.children).toBe(locale.okText);
    expect(footer[1].props.children).toBe(locale.cancelText);
    done();
  });

  it('Panel instace render no footer', () => {
    const {wrapper, props} = setup({
      footer: false
    });
    const locale = {
      cancelText: 'cancelText',
      okText: 'okText'
    };
    const footer = wrapper.instance().renderFooter();
    expect(footer).toBe(null);
  });

  it('Panel instance renderFooterButton', () => {
    const footerFn = jest.fn();
    const {wrapper, props} = setup({
      footer: footerFn
    });
    const locale = {
      cancelText: 'cancelText',
      okText: 'okText'
    };
    const footer = wrapper.instance().renderFooterLocale(locale);
    expect(footerFn.mock.calls.length).toBe(1);
  });

  it('Panel Component has no locale', done => {
    const {wrapper, props} = setup();
    expect(wrapper.find('LocaleReceiver').prop('defaultLocale')).toEqual(
      Locale
    );
    done();
  });
});

describe('panel 组件设置locale参数后返回值的验证 mount方式', () => {
  it('locale传入okText时希望返回覆盖okText缺省值', done => {
    const wrapperDom = mount(<Panel locale={{okText: '测试'}}>abc</Panel>);
    const localeTest = Object.assign({}, Locale, {okText: '测试'});
    expect(wrapperDom.find('Button').get(0).props.children).toEqual(
      localeTest.okText
    );
    expect(wrapperDom.find('Button').get(1).props.children).toEqual(
      localeTest.cancelText
    );
    done();
  });
});
