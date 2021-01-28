import React from 'react';
import moment from 'moment';
import {shallow} from 'enzyme';
import {TimePicker} from 'antd';
import TimeRangePicker from '../index';

jest.mock('moment', () => {
  return jest.fn(() => {
    return {
      format: function() {
        return '05/31/2019';
      },
      subtract: function() {
        return {
          startOf: function() {
            return '05/31/2019';
          }
        };
      },
      endOf: function() {
        return '05/31/2019';
      }
    };
  });
});

const setup = props => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<TimeRangePicker {...props} />);
  return {
    props,
    wrapper
  };
};

describe('是否正确渲染', () => {
  it('base on TimePicker', () => {
    const {wrapper} = setup();
    expect(wrapper.find('TimePicker').exists()).toBe(true);
  });
});

describe('方法测试', () => {
  it('如果没传value 则默认为空', () => {
    const {wrapper} = setup();
    expect(wrapper.state('startTime')).toBe('');
    expect(wrapper.state('endTime')).toBe('');
  });

  it('传入value 为数组  ', () => {
    const {wrapper, props} = setup({
      value: ['2019-05-20', '2019-05-21']
    });
    expect(JSON.stringify(wrapper.state('startTime'))).toEqual(
      JSON.stringify(moment(props.value[0]))
    );
    expect(JSON.stringify(wrapper.state('endTime'))).toEqual(
      JSON.stringify(moment(props.value[1]))
    );
  });

  it('formatTime 方法测试', () => {
    const {wrapper, props} = setup({
      format: 'YYYY-MM-DD'
    });
    expect(wrapper.instance().formatTime('2019-05-20')).toEqual(
      moment('2019-05-20').format(props.format)
    );
  });

  it('hanldeChange 方法 type 为start时', () => {
    const {wrapper, props} = setup({
      onChange: jest.fn()
    });
    wrapper.instance().hanldeChange('start', '2019-05-20');
    expect(wrapper.state('startTime')).toEqual('2019-05-20');
    expect(props.onChange.mock.calls.length).toBe(1);
  });

  it('hanldeChange 方法 type 为end时', () => {
    const {wrapper, props} = setup({
      onChange: jest.fn()
    });
    wrapper.instance().hanldeChange('end', '2019-05-20');
    expect(wrapper.state('endTime')).toEqual('2019-05-20');
    expect(props.onChange.mock.calls.length).toBe(1);
  });

  it('hanldeChange 方法 type 为start时', () => {
    const {wrapper, props} = setup({
      onChange: jest.fn()
    });
    wrapper.instance().hanldeChange('start', '');
    expect(wrapper.state('startTime')).toEqual('');
    expect(props.onChange.mock.calls.length).toBe(1);
  });

  it('hanldeChange 方法 type 为end时', () => {
    const {wrapper, props} = setup({
      onChange: jest.fn()
    });
    wrapper.instance().hanldeChange('end', '');
    expect(wrapper.state('endTime')).toEqual('');
    expect(props.onChange.mock.calls.length).toBe(1);
  });
  it('hanldeChange 方法 type 为undefined时', () => {
    const {wrapper, props} = setup({
      onChange: jest.fn()
    });
    wrapper.instance().hanldeChange('undefined', '');
    expect(wrapper.state('endTime')).toEqual('');
    expect(props.onChange.mock.calls.length).toBe(0);
  });

  it('componentWillReceiveProps 测试 ', () => {
    const {wrapper} = setup({
      value: ['2019-05-31', '2019-07-31']
    });
    const value = ['2019-06-31', '2019-07-31'];
    expect(
      wrapper.instance().componentWillReceiveProps({
        value: value
      })
    );
    expect(JSON.stringify(wrapper.state('startTime'))).toEqual(
      JSON.stringify(moment(value[0]))
    );
    expect(JSON.stringify(wrapper.state('endTime'))).toEqual(
      JSON.stringify(moment(value[1]))
    );
  });
  it('componentWillReceiveProps 测试 分支', () => {
    const {wrapper} = setup({
      value: ['2019-05-31', '2019-07-31']
    });
    const value = ['2019-05-31', '2019-07-31'];
    expect(
      wrapper.instance().componentWillReceiveProps({
        value: value
      })
    );
    expect(JSON.stringify(wrapper.state('startTime'))).toEqual(
      JSON.stringify(moment(value[0]))
    );
    expect(JSON.stringify(wrapper.state('endTime'))).toEqual(
      JSON.stringify(moment(value[1]))
    );
  });
});
