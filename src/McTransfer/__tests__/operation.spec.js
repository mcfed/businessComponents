import React from 'react';
import {shallow} from 'enzyme';
import Operation from '../operation';
import * as Op from '../ts/operation.tsx';

function setup(props, options) {
  const defaultProps = {
    moveToLeft: jest.fn(),
    moveToRight: jest.fn(),
    leftArrowText: '',
    rightArrowText: '',
    leftActive: true,
    rightActive: true,
    className: ''
  };
  const wrapper = shallow(
    <Operation {...Object.assign({}, defaultProps, props)} />,
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
  it('noop 方法测试', () => {
    Op.noop();
  });
});
