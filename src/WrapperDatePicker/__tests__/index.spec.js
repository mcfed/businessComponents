import React from 'react';
import {shallow} from 'enzyme';
import {DatePicker} from 'antd';
import moment from 'moment';
import WrapperDatePicker from '../index';

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

const setup = props => {
  // 模拟 props

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<WrapperDatePicker {...props} />);
  return {
    props,
    wrapper
  };
};

describe('wrapperdatepicker test', () => {
  it('test', () => {
    expect(true).toBe(true);
  });
});
