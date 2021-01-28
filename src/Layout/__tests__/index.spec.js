import React from 'react';
import {shallow} from 'enzyme';
import {Fixed, Pane, Layout} from '../index';

const setupLayout = props => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const defaultele = <div className='child'>abc</div>;
  const wrapper = shallow(
    <Layout {...props}>{(props && props.element) || defaultele}</Layout>
  );
  return {
    props,
    wrapper
  };
};

const setupFixed = props => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const defaultele = <div className='child'>abc</div>;
  const wrapper = shallow(
    <Fixed {...props}>{(props && props.element) || defaultele}</Fixed>
  );
  return {
    props,
    wrapper
  };
};

const setupPane = props => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const defaultele = <div className='child'>abc</div>;
  const wrapper = shallow(
    <Pane {...props}>{(props && props.element) || defaultele}</Pane>
  );
  return {
    props,
    wrapper
  };
};

describe('layout 组件测试', () => {
  it('default render', () => {
    const {wrapper} = setupLayout();
    expect(wrapper.contains(<div className='child'>abc</div>)).toEqual(true);
    expect(wrapper.prop('className')).toEqual('layout layout-default');
    expect(wrapper.prop('style')).toEqual({
      display: 'flex',
      flex: '1',
      overflow: 'hidden',
      flexDirection: 'column'
    });
  });

  it('layout classname style direction 配置', () => {
    const {wrapper} = setupLayout({
      element: <div>123</div>,
      className: 'aaa bbb',
      style: {
        width: 100,
        height: 200
      },
      direction: 'rows'
    });
    expect(wrapper.contains(<div>123</div>)).toEqual(true);
    expect(wrapper.prop('className')).toEqual('layout aaa bbb');
    expect(wrapper.prop('style')).toEqual({
      display: 'flex',
      flex: '1',
      overflow: 'hidden',
      flexDirection: 'rows',
      width: 100,
      height: 200
    });
  });
});

describe('Fixed 测试', () => {
  it('default render', () => {
    const {wrapper} = setupFixed();

    expect(wrapper.contains(<div className='child'>abc</div>)).toEqual(true);
    expect(wrapper.prop('className')).toEqual('layout-fixed');
    expect(wrapper.prop('style')).toEqual({
      display: 'flex',
      flexDirection: 'column'
    });
  });

  it('fixed 特殊配制', () => {
    const {wrapper} = setupFixed({
      element: <div>123</div>,
      direction: 'rows',
      style: {
        width: 200,
        height: 200
      }
    });
    expect(wrapper.contains(<div>123</div>)).toEqual(true);
    expect(wrapper.prop('style')).toEqual({
      width: 200,
      height: 200,
      display: 'flex',
      flexDirection: 'rows'
    });
  });
});

describe('Pane 测试', () => {
  it('default render', () => {
    const {wrapper} = setupPane();

    expect(wrapper.contains(<div className='child'>abc</div>)).toEqual(true);
    expect(wrapper.prop('className')).toEqual(
      'layout-pane layout-pane-default'
    );
    expect(wrapper.prop('style')).toEqual({
      display: 'flex',
      flex: '1',
      position: 'relative'
    });
  });

  it('fixed 特殊配制', () => {
    const {wrapper} = setupPane({
      element: <div>123</div>,
      className: 'aaa bbb',
      direction: 'rows',
      style: {
        width: 200,
        height: 200
      }
    });
    expect(wrapper.contains(<div>123</div>)).toEqual(true);
    expect(wrapper.prop('className')).toEqual('layout-pane aaa bbb');
    expect(wrapper.prop('style')).toEqual({
      width: 200,
      height: 200,
      display: 'flex',
      flex: '1',
      position: 'relative'
    });
  });
});
