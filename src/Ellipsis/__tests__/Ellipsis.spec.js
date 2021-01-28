import {shallow, mount, render} from 'enzyme';
import React from 'react';

import Ellipsis from '../index.tsx';

const setup = props => {
  const wrapper = shallow(<Ellipsis {...props} />);

  return {
    wrapper,
    props
  };
};

describe('Ellipsis render 是否正确渲染', () => {
  it("默认的tooltiptext为text 的默认值 ''", () => {
    const {wrapper, props} = setup({});

    expect(wrapper.find('Tooltip').prop('title')).toBe('');
  });

  it('若tooltiptext 为undefined text不传，则title默认值为Ellipsis', () => {
    const {wrapper, props} = setup({
      tooltiptext: undefined
    });
    expect(wrapper.find('Tooltip').prop('title')).toBe('');
  });

  it('tooltip 为被渲染的节点 ', () => {
    const {wrapper, props} = setup({});

    expect(wrapper.find('Tooltip').exists()).toBe(true);
  });

  it('tooltiptext最终传值给 tooltip的title', () => {
    const {wrapper, props} = setup({
      tooltiptext: 'aa123'
    });
    expect(wrapper.find('Tooltip').prop('title')).toBe(props.tooltiptext);
  });

  it('若tooltiptext值为undefined，则tooltip的title为传入的text', () => {
    const {wrapper, props} = setup({
      text: 'aa123',
      tooltiptext: undefined
    });
    expect(wrapper.find('Tooltip').prop('title')).toBe(props.text);
  });
});
