import React from 'react';
import {shallow} from 'enzyme';
import {ExtraColumnForTest} from '../index';

function setup(props, options) {
  const defaultProps = {
    item: {},
    form: {
      getFieldDecorator: () => jest.fn(),
      setFieldsValue: () => jest.fn()
    },
    data: ['192.168.1.1', '-', '192.168.1.10'],
    onChange: jest.fn()
  };
  const wrapper = shallow(
    <ExtraColumnForTest {...Object.assign({}, defaultProps, props)} />,
    options
  );

  return {
    wrapper
  };
}

describe('快照测试', () => {
  it('全页快照', () => {
    const {wrapper} = setup();

    expect(wrapper).toMatchSnapshot();
  });
});

describe('方法测试全覆盖', () => {
  it('DatePicker 类型渲染测试', () => {
    const props = {
      type: 'DatePicker'
    };
    const {wrapper} = setup(props);
    expect(wrapper.text()).toBe('this is DatePickerDom');
  });

  it('componentWillReceiveProps 生命周期测试', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const nextprops = {
      value: ['192.168.1.2', '-', '192.168.1.20']
    };
    instance.componentWillReceiveProps(nextprops);
    const expectState = {
      data: ['192.168.1.2', '-', '192.168.1.20'],
      start: '192.168.1.2',
      end: '192.168.1.20'
    };
    expect(instance.state).toEqual(expectState);
  });

  it('data [] branch 测试', () => {
    const props = {
      data: false
    };
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    const expectState = {
      data: '',
      start: undefined,
      end: undefined
    };
    expect(instance.state).toEqual(expectState);
  });

  it('editConfig array branch 测试', () => {
    const props = {
      editConfig: []
    };
    setup(props);
  });

  it('editConfig object branch 测试', () => {
    const props = {
      editConfig: {}
    };
    setup(props);
  });

  it('changeStart 方法测试', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const e = {
      target: {
        value: ''
      }
    };
    instance.changeStart(e);
    expect(instance.props.onChange).toHaveBeenCalled();
    expect(instance.state.start).toBe(instance.props.data[0]);
  });

  it('changeStart 方法测试 value 不为空', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const e = {
      target: {
        value: '192.168.100.1'
      }
    };
    instance.changeStart(e);
    expect(instance.props.onChange).toHaveBeenCalled();
  });

  it('changeEnd 方法测试', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const e = {
      target: {
        value: ''
      }
    };
    instance.changeEnd(e);
    expect(instance.props.onChange).toHaveBeenCalled();
    expect(instance.state.end).toBe(instance.props.data[2]);
  });

  it('changeEnd 方法测试 value 不为空', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const e = {
      target: {
        value: '192.168.100.1'
      }
    };
    instance.changeEnd(e);
    expect(instance.props.onChange).toHaveBeenCalled();
  });
});
