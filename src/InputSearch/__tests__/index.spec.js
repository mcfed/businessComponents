import {shallow, mount, render} from 'enzyme';
import React from 'react';
import InputSearch from '../index';

const setup = props => {
  const wrapper = shallow(<InputSearch {...props} />);

  return {
    wrapper,
    props
  };
};

describe('InputSearch test', () => {
  const props = {
    onSearch: jest.fn(),
    onChange: jest.fn()
  };
  it('onSearchHandler 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    instance.onSearchHandler(1);
    expect(instance.props.onSearch).toHaveBeenCalled();
    expect(instance.props.onSearch).toHaveBeenCalledWith(1);
    expect(instance.props.onChange).toHaveBeenCalled();
    expect(instance.props.onChange).toHaveBeenCalledWith(1);
  });
  it('onChange 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    instance.onChange({target: {value: 1}});
    expect(instance.state.value).toBe(1);
  });
  it.skip('onBlur 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    instance.state.value = 5;
    instance.onBlur();
    expect(instance.props.onChange).toHaveBeenCalled();
    expect(instance.props.onChange).toHaveBeenCalledWith(5);
  });
});
