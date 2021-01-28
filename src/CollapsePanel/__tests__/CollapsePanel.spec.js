import React from 'react';
import {shallow} from 'enzyme';
import {CollapsePanelClass as CollapsePanel} from '../index';
import {Switch, Select} from 'antd';
import FormItem from '../../FormItem/index';

const setup = (props, control) => {
  const wrapper = shallow(
    <CollapsePanel
      title='测试一发'
      formRef={{
        getFieldValue(name, item) {
          return function(component) {
            return component;
          };
        }
      }}
      control={control || <Switch name='test' />}
      closeValues={[]}
      {...props}>
      <div>123123</div>
    </CollapsePanel>
  );

  return {
    wrapper
  };
};

describe('CollapsePanel 组件方法测试', () => {
  it('componentDidMount 测试', () => {
    const {wrapper} = setup();
    console.log(wrapper.children());
    wrapper.instance().setActiveStatus = jest.fn();
    wrapper.instance().componentDidMount();

    expect(wrapper.instance().setActiveStatus).toHaveBeenCalled();
  });
  it('componentWillReceiveProps 测试', () => {
    const {wrapper} = setup();
    wrapper.instance().setActiveStatus = jest.fn();
    wrapper.instance().componentWillReceiveProps();

    expect(wrapper.instance().setActiveStatus).toHaveBeenCalled();
  });

  it('isExtraIsReactDom 测试', () => {
    const {wrapper} = setup();
    const dom = <div>123</div>;
    expect(wrapper.instance().isExtraIsReactDom(213)).toEqual(false);
    expect(wrapper.instance().isExtraIsReactDom(dom)).toEqual(true);
  });

  it('renderExtra 测试 control为dom时', () => {
    const {wrapper} = setup();
    expect(wrapper.instance().renderExtra()).toEqual(
      <FormItem>
        <Switch name='test' />
      </FormItem>
    );
  });

  it('renderExtra 测试 control为text时', () => {
    const {wrapper} = setup({
      control: 123
    });
    expect(wrapper.instance().renderExtra()).toEqual(123);
  });

  it('setActiveStatus 测试 调用isExtraIsReactDom', () => {
    const {wrapper} = setup();
    wrapper.instance().isExtraIsReactDom = jest.fn();
    wrapper.instance().setActiveStatus();

    expect(wrapper.state('active')).toEqual(true);
    expect(wrapper.instance().isExtraIsReactDom).toHaveBeenCalled();
  });

  it('setActiveStatus 测试调用fieldValueChange', () => {
    const {wrapper} = setup();
    wrapper.instance().fieldValueChange = jest.fn();
    wrapper.instance().setActiveStatus();

    expect(wrapper.instance().fieldValueChange).toHaveBeenCalled();
  });

  it('setActiveStatus 文本时 默认为true', () => {
    const {wrapper} = setup({}, '123');
    wrapper.instance().setActiveStatus();
    expect(wrapper.state('active')).toEqual(true);
  });

  it('fieldValueChange 测试', () => {
    const {wrapper} = setup();

    expect(wrapper.instance().fieldValueChange()).toEqual(true);
  });
  it.skip('fieldValueChange closeValues 测试 关闭', () => {
    const {wrapper} = setup(
      {
        closeValues: [0, 2]
      },
      <Select name='test' defaultValue={0}>
        <Select.Option value={0}>关</Select.Option>
        <Select.Option value={1}>开</Select.Option>
        <Select.Option value={2}>关</Select.Option>
      </Select>
    );
    wrapper.instance().fieldValueChange();
    expect(wrapper.state('active')).toEqual(false);
  });
  it('fieldValueChange closeValues 测试 开启', () => {
    const {wrapper} = setup(
      {
        closeValues: [0, 2]
      },
      <Select name='test' defaultValue={1}>
        <Select.Option value={0}>关</Select.Option>
        <Select.Option value={1}>开</Select.Option>
        <Select.Option value={2}>关</Select.Option>
      </Select>
    );
    wrapper.instance().fieldValueChange();
    expect(wrapper.state('active')).toEqual(true);
  });

  it('renderable 属性测试 renderable=false', () => {
    const {wrapper} = setup({
      renderable: false
    });
    // expect(wrapper).toEqual(null);
    expect(wrapper.find('CollapsePanel').length).toEqual(0);
  });
  it('renderable 属性测试 renderable=true', () => {
    const {wrapper} = setup({
      renderable: true
    });
    // expect(wrapper).toEqual(null);
    expect(wrapper.find('CollapsePanel').length).toEqual(1);
  });
  it('renderable 属性测试 函数返回true', () => {
    const {wrapper} = setup({
      renderable: () => true
    });
    // expect(wrapper).toEqual(null);
    expect(wrapper.find('CollapsePanel').length).toEqual(1);
  });

  it('renderable 属性测试 renderable=false', () => {
    const {wrapper} = setup({
      renderable: false
    });
    // expect(wrapper).toEqual(null);
    expect(wrapper.find('CollapsePanel').length).toEqual(0);
  });
  it('renderable 属性测试 renderable=true', () => {
    const {wrapper} = setup({
      renderable: true
    });
    // expect(wrapper).toEqual(null);
    expect(wrapper.find('CollapsePanel').length).toEqual(1);
  });
  it('renderable 属性测试 函数返回true', () => {
    const {wrapper} = setup({
      renderable: () => true
    });
    // expect(wrapper).toEqual(null);
    expect(wrapper.find('CollapsePanel').length).toEqual(1);
  });
});
