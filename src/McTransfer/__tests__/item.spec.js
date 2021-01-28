import React from 'react';
import {shallow} from 'enzyme';
import Item from '../ts/item.tsx';

function setup(props, options) {
  const defaultProps = {
    item: {
      disabled: false
    },
    renderedText: '',
    renderedEl: '',
    style: {},
    checked: true,
    onClick: jest.fn(),
    prefixCls: ''
  };
  const wrapper = shallow(
    <Item {...Object.assign({}, defaultProps, props)} />,
    options
  );

  return {
    wrapper
  };
}

describe('快照测试', () => {
  it('全页快照', () => {
    const props = {
      item: {
        disabled: false
      }
    };
    const {wrapper} = setup(props);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('方法测试全覆盖', () => {
  const props = {
    item: {
      disabled: true
    }
  };
  it('shouldComponentUpdate 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    instance.shouldComponentUpdate();
  });
  it('li onClick 方法测试', () => {
    props.item.disabled = false;
    const {wrapper} = setup(props);
    wrapper
      .find('li')
      .props()
      .onClick();
  });
});
