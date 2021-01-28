import React from 'react';
import {shallow, mount, render} from 'enzyme';
import PropertyTable from '../index';

const setup = children => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const context = {};
  const props = {
    dataSource: [
      {
        label: 'label',
        value: 'value'
      }
    ]
  };
  const wrapper = shallow(<PropertyTable {...props} />, {context});

  return {
    props,
    wrapper
  };
};

describe('PropertyTable shallow render', () => {
  const {wrapper, props} = setup();
  it('PropertyTable render', done => {
    expect(wrapper.find('table').exists()).toBe(true);
    //    expect(wrapper.prop("label")).toBe("test")
    done();
  });
});
