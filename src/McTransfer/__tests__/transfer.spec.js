import React from 'react';
import {shallow} from 'enzyme';
import Transfer from '../ts/transfer.tsx';
import * as Tr from '../ts/selectList.tsx';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
jest.mock('rc-util/lib/PureRenderMixin');

function setup(props, options) {
  const defaultProps = {
    render: jest.fn(),
    targetKeys: ['a'],
    selectedKeys: ['b'],
    rowHeight: 1,
    locale: {
      itemsUnit: '',
      notFoundContent: '',
      searchPlaceholder: ''
    },
    dataSource: [
      {
        key: 'a'
      }
    ],
    onSelectChange: jest.fn(() => true),
    onChange: jest.fn(() => true)
  };
  const wrapper = shallow(
    <Transfer {...Object.assign({}, defaultProps, props)} />,
    options
  );

  return {
    wrapper
  };
}

describe('快照测试', () => {
  it('全页快照', () => {
    const props = {
      item: {
        disabled: false
      }
    };
    const {wrapper} = setup(props);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('方法测试全覆盖', () => {
  const props = {
    item: {
      disabled: true
    }
  };

  it('componentWillReceiveProps 生命周期测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    const initStateByPropsSpy = jest.spyOn(instance, 'initStateByProps');
    instance.componentWillReceiveProps({
      dataSource: [{key: 'a'}],
      targetKeys: ['a'],
      selectedKeys: ['b']
    });
    expect(initStateByPropsSpy).not.toHaveBeenCalled();
  });

  it('componentWillReceiveProps branch 测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    const initStateByPropsSpy = jest.spyOn(instance, 'initStateByProps');
    instance.componentWillReceiveProps({
      dataSource: [{key: 'b'}],
      targetKeys: ['b'],
      selectedKeys: ['a']
    });
    expect(initStateByPropsSpy).toHaveBeenCalled();
  });

  it('shouldComponentUpdate 生命周期测试', () => {
    PureRenderMixin.shouldComponentUpdate.apply = jest.fn(() => true);
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.shouldComponentUpdate();
  });

  it('getSelectedKeysName left branch测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.getSelectedKeysName('left');
  });

  it('getSelectedKeysName right branch测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.getSelectedKeysName('right');
  });

  it('initStateByProps selectedKeys 存在 branch 测试', () => {
    props.selectedKeys = ['a'];
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.targetSelectedKeys = ['a'];
    instance.initStateByProps(instance.props, 'true');
  });

  it('initStateByProps selectedKeys 不存在 branch 测试', () => {
    props.selectedKeys = undefined;
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.targetSelectedKeys = ['a'];
    instance.initStateByProps(instance.props, 'true');
  });

  it('initStateByProps selectedKeys 不存在 branch 且存在 rowKey 方法 测试', () => {
    props.selectedKeys = undefined;
    props.rowKey = jest.fn(() => 'a');
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.targetSelectedKeys = ['a'];
    instance.initStateByProps(instance.props, 'true');
  });

  it('initStateByProps selectedKeys 不存在 且 datasource 不包含 targetKeys branch 测试', () => {
    props.selectedKeys = undefined;
    props.targetKeys = ['b'];
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.sourceSelectedKeys = ['a'];
    instance.initStateByProps(instance.props, 'true');
  });

  it('handleSelect left branch 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.handleSelect('left', ['b']);
  });

  it('handleSelect right branch 方法测试', () => {
    props.selectedKeys = undefined;
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.handleSelect('right', ['b']);
  });

  it('moveTo left branch 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.targetSelectedKeys = ['a'];
    instance.moveTo('left');
  });

  it('moveTo left datasource 不包括target 方法测试', () => {
    props.dataSource = [
      {
        key: 'a',
        disabled: true
      }
    ];
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.targetSelectedKeys = ['b'];
    instance.moveTo('left');
  });

  it('moveTo right branch 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.sourceSelectedKeys = ['a'];
    instance.moveTo('right');
  });

  it('moveTo right onChange 不存在 branch 测试', () => {
    props.onChange = undefined;
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.sourceSelectedKeys = ['a'];
    instance.moveTo('right');
  });

  it('moveToLeft 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    const moveToSpy = jest.spyOn(instance, 'moveTo');
    instance.moveToLeft();
    expect(moveToSpy).toHaveBeenCalled();
    expect(moveToSpy).toHaveBeenCalledWith('left');
  });

  it('moveToRight 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    const moveToSpy = jest.spyOn(instance, 'moveTo');
    instance.moveToRight();
    expect(moveToSpy).toHaveBeenCalled();
    expect(moveToSpy).toHaveBeenCalledWith('right');
  });

  it('SelectList handleSelect 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    wrapper
      .find('SelectList')
      .first()
      .prop('handleSelect')([]);
    wrapper
      .find('SelectList')
      .last()
      .prop('handleSelect')([]);
  });

  it('noop 方法测试', () => {
    Tr.noop();
  });
});
