import React from 'react';
import {shallow} from 'enzyme';
import FieldSet from '../index.tsx';

const setup = props => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(
    <FieldSet {...props}>
      <div className='child'>abc</div>
    </FieldSet>
  );
  return {
    props,
    wrapper
  };
};

describe('fieldset render', () => {
  it('props title hide', () => {
    const {wrapper, props} = setup({
      title: 'hide'
    });
    expect(wrapper.find('.child').exists()).toBe(true);
  });
});
