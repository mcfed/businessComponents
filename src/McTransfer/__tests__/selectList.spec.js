import React from 'react';
import {shallow} from 'enzyme';
import SelectList from '../ts/selectList.tsx';
import * as Sl from '../ts/selectList.tsx';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
jest.mock('rc-util/lib/PureRenderMixin');

function setup(props, options) {
  const defaultProps = {
    selectedKeys: ['a'],
    dataSource: [
      {
        key: 'a'
      }
    ],
    render: jest.fn(() => {
      return {
        test: 'string'
      };
    }),
    handleSelect: jest.fn(),
    rowHeight: 1,
    rowKey: jest.fn().mockImplementation(name => true),
    filterOption: undefined,
    showSearch: true,
    showHeader: true,
    footerDom: true,
    footer: jest.fn(() => true),
    notFoundContent: ''
  };
  const wrapper = shallow(
    <SelectList {...Object.assign({}, defaultProps, props)} />,
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
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    expect(wrapper).toMatchSnapshot();
  });
});

describe('方法测试全覆盖', () => {
  const props = {
    dataSource: []
  };

  it('componentWillMount 生命周期测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.componentWillMount();
  });

  it('componentWillReceiveProps filter 为空 生命周期测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.handleFilter = jest.fn();
    instance.state.filter = '';
    instance.componentWillReceiveProps({dataSource: [{key: 'a'}]});
  });

  it('componentWillReceiveProps filter 不为空 生命周期测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.handleFilter = jest.fn();
    instance.state.filter = '1';
    instance.componentWillReceiveProps({dataSource: [{key: 'a'}]});
    const handleFilterSpy = jest.spyOn(instance, 'handleFilter');
    expect(handleFilterSpy).toHaveBeenCalled();
  });

  it('shouldComponentUpdate true branch 生命周期测试', () => {
    PureRenderMixin.shouldComponentUpdate.apply = jest.fn(() => true);
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.shouldComponentUpdate();
  });

  it('shouldComponentUpdate false branch 生命周期测试', () => {
    PureRenderMixin.shouldComponentUpdate.apply = jest.fn(() => false);
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.shouldComponentUpdate();
  });

  it('componentDidUpdate 生命周期测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.list = {
      forceUpdateGrid: jest.fn()
    };
    instance.componentDidUpdate();
  });

  it('getCheckStatus selectedKeys 不为空 branch测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.getCheckStatus();
  });

  it('getCheckStatus selectedKeys 为空 branch测试', () => {
    props.selectedKeys = [];
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.getCheckStatus();
  });

  it('handleSelect index 大于-1 branch测试', () => {
    props.selectedKeys = ['a'];
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.handleSelect({key: 'a'});
    expect(instance.props.handleSelect).toHaveBeenCalled();
  });

  it('handleSelect index 小于-1 branch测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.handleSelect({key: 'b'});
    expect(instance.props.handleSelect).toHaveBeenCalled();
  });

  it('getCheckStatus 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.dataSource = [
      {
        key: 'b'
      }
    ];
    instance.getCheckStatus();
  });

  it('handleSelectAll true branch测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.dataSource = [
      {
        key: 'a'
      }
    ];
    instance.handleSelectAll(true);
    expect(instance.props.handleSelect).toHaveBeenCalled();
  });

  it('handleSelectAll false branch测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.dataSource = [
      {
        key: 'b'
      }
    ];
    instance.handleSelectAll(false);
    expect(instance.props.handleSelect).toHaveBeenCalled();
  });

  it('handleFilterWapper 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    const handleFilterWithDebounceSpy = jest.spyOn(
      instance,
      'handleFilterWithDebounce'
    );
    instance.handleFilterWapper();
    expect(handleFilterWithDebounceSpy).toHaveBeenCalled();
  });

  it('matchFilter filterOption true branch测试', () => {
    props.filterOption = jest.fn(() => true);
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.matchFilter('', '');
  });

  it('matchFilter filterOption false branch测试', () => {
    props.filterOption = undefined;
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.renderItem = jest.fn(name => {
      return {
        renderedText: '',
        renderedEl: ''
      };
    });
    instance.matchFilter('', '');
  });

  it('handleFilter matchFilter true branch测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.list = {
      scrollToRow: jest.fn()
    };
    instance.matchFilter = jest.fn().mockImplementation(() => true);
    instance.handleFilter([''], '');
  });

  it('handleFilter matchFilter false branch测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.list = {
      scrollToRow: jest.fn()
    };
    instance.matchFilter = jest.fn().mockImplementation(() => false);
    instance.handleFilter([''], '');
  });

  it('handleClear 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.handleClear();
  });

  it('rowRenderer 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.state.dataSource = [
      {
        key: ''
      }
    ];
    instance.renderItem = jest.fn().mockImplementation(name => {
      return {
        renderedText: '',
        renderedEl: ''
      };
    });
    instance.rowRenderer({
      _key: '',
      index: 0,
      _isScrolling: '',
      _isVisible: '',
      _parent: '',
      style: {}
    });
  });

  it('renderItem 方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.renderItem();
  });

  it('renderItem branch 方法测试', () => {
    props.render = jest.fn(() => true);
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    instance.renderItem();
  });

  it('noop 方法测试', () => {
    Sl.noop();
  });

  it('isRenderResultPlainObject 方法测试', () => {
    Sl.isRenderResultPlainObject(true);
    Sl.isRenderResultPlainObject(false);
  });

  it('showSearch 和 showHeader 等 false branch 测试', () => {
    props.showHeader = false;
    props.showSearch = false;
    props.footerDom = false;
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
    props.showHeader = true;
    props.showSearch = true;
    props.footerDom = true;
  });

  it('Checkbox onChange方法测试', () => {
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    wrapper
      .find('Checkbox')
      .props()
      .onChange();
  });

  it('bodyHeight branch and dataSource length 大于1 测试', () => {
    props.footer = jest.fn(() => false);
    const {wrapper} = setup(props, {disableLifecycleMethods: true});
    const instance = wrapper.instance();
  });
});
