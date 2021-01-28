import React from 'react';
import {shallow} from 'enzyme';
import Search from '../ts/search.tsx';

function setup(props, options) {
  const defaultProps = {
    placeholder: '',
    value: '',
    prefixCls: '',
    searchRender: '',
    handleClear: jest.fn(),
    onChange: jest.fn()
  };
  const wrapper = shallow(
    <Search {...Object.assign({}, defaultProps, props)} />,
    options
  );

  return {
    wrapper
  };
}

describe('快照测试', () => {
  it('全页快照', () => {
    const props = {
      item: {}
    };
    const {wrapper} = setup(props);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('方法测试全覆盖', () => {
  const props = {
    item: {
      disabled: false
    }
  };
  it('handleChange 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    instance.handleChange();
  });
});
