import React from 'react';
import {shallow, mount, render} from 'enzyme';

import {Input, Select, Tree} from 'antd';
import TreeView, {TreeSelectPicker, TrewViewPanel} from '../index';

const TreeNode = Tree.TreeNode;

const setup = (props = {}) => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = mount(<TreeView {...props} />);

  return {
    props,
    wrapper
  };
};

const tPickerSetup = (props = {}) => {
  const wrapper = shallow(<TreeSelectPicker {...props} />);
  return {
    props,
    wrapper
  };
};

const tViewPanelSetup = (props = {}) => {
  const wrapper = shallow(<TrewViewPanel {...props} />);
  return {
    props,
    wrapper
  };
};

const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          {title: '0-0-0-0', key: '0-0-0-0'},
          {title: '0-0-0-1', key: '0-0-0-1'},
          {title: '0-0-0-2', key: '0-0-0-2'}
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          {title: '0-0-1-0', key: '0-0-1-0'},
          {title: '0-0-1-1', key: '0-0-1-1'},
          {title: '0-0-1-2', key: '0-0-1-2'}
        ]
      },
      {
        title: '0-0-2',
        key: '0-0-2',
        children: [
          {title: '0-0-2-0', key: '0-0-2-0'},
          {title: '0-0-2-1', key: '0-0-2-1'}
        ]
      },
      {
        title: '0-0-3',
        key: '0-0-3'
      }
    ]
  },
  {
    title: undefined,
    key: '0-1',
    children: [
      {title: '0-1-0-0', key: '0-1-0-0'},
      {title: '0-1-0-1', key: '0-1-0-1'},
      {title: '0-1-0-2', key: '0-1-0-2'}
    ]
  },
  {
    title: '0-2',
    key: '0-2'
  },
  {
    title: undefined,
    key: '0-3'
  }
];

const renderItem = item => {
  return <TreeNode title={item.title} key={item.key} dataRef={item}></TreeNode>;
};

describe('TreeView 是否渲染', () => {
  it('TreeView children TreeNode rendered', () => {
    const {wrapper, props} = setup({
      treeData,
      renderItem,
      checkedKeys: ['0-2']
    });
    expect(wrapper.find('ul').children().length).toBe(treeData.length);
  });

  it('TreeView render in modal', () => {
    const {wrapper, props} = setup({
      treeData,
      renderItem,
      checkedKeys: ['0-2'],
      isTreeInModal: true
    });
    expect(wrapper.find('.tree-in-modal').exists()).toBe(true);
  });
});

describe('TreeView 限制滚动的高度', () => {
  const {wrapper, props} = setup({treeData, renderItem, scrollHeight: 100});
  it('TreeView Scroll height is 100px', () => {
    expect(wrapper.find('.ant-tree-view').prop('style')).toEqual({
      border: '1px solid #d9d9d9',
      maxHeight: 100,
      overflowY: 'auto'
    });
  });
});

describe('TreeView events handle', () => {
  const checkedKeys = ['0-0-0'];
  const selectedKeys = ['key1', 'key2'];
  const expandedKeys = ['0-0-0', '0-0-1'];
  const {wrapper, props} = setup({
    treeData,
    renderItem,
    onSelect: jest.fn(),
    onChange: jest.fn()
  });
  it('componentWillReceiveProps change checkedKeys', () => {
    wrapper.instance().componentWillReceiveProps({value: checkedKeys});
    expect(wrapper.state().checkedKeys).toEqual(checkedKeys);
  });
  it('componentWillReceiveProps canot change checkedKeys', () => {
    wrapper.instance().componentWillReceiveProps({value: undefined});
    expect(wrapper.state().checkedKeys).toEqual(checkedKeys);
  });
  it('select event', () => {
    wrapper.instance().onSelect(selectedKeys, {node: {props: {}}});
    expect(wrapper.state().selectedKeys).toEqual(selectedKeys);
  });
  it('select event without onSelect prop', () => {
    const {wrapper, props} = setup({treeData, renderItem, onChange: jest.fn()});
    wrapper.instance().onSelect(selectedKeys);
    expect(wrapper.state().selectedKeys).toEqual(selectedKeys);
  });
  it('expand event', () => {
    wrapper.instance().onExpand(expandedKeys);
    expect(wrapper.state().expandedKeys).toEqual(expandedKeys);
  });
  it('check event', () => {
    wrapper.instance().onCheck(checkedKeys);
    expect(wrapper.state().checkedKeys).toEqual(checkedKeys);
  });
});

describe.skip('TreeView shallow render', () => {
  it('render without params', done => {
    const {wrapper, props} = setup();
    expect(wrapper.find('.ant-tree-view').exists()).toBe(true);
    done();
  });

  it('tree default render ', () => {
    const {wrapper, props} = setup({
      treeData: [
        {
          value: 'abc',
          children: [
            {
              value: 'efg'
            },
            {
              value: 'hij'
            }
          ]
        }
      ],
      renderItem: ita => {
        console.log(ita);
      }
    });
    expect(wrapper.instance()).toBeInstanceOf(TreeView);
  });
});

describe('TreeSelectPicker render', () => {
  it('TreeSelectPicker rendered allowClear is true', () => {
    const {wrapper, props} = tPickerSetup({treeData, allowClear: true});
    // console.log(wrapper.instance());
  });
  it('TreeSelectPicker rendered allowClear is false', () => {
    const {wrapper, props} = tPickerSetup({treeData, allowClear: false});
    // console.log(wrapper.html());
  });
});

describe('TreeSelectPicker event handle', () => {
  it('TreeSelect change event', () => {
    const {wrapper, props} = tPickerSetup({treeData, onChange: jest.fn()});
    wrapper.instance().onChange('test');
    expect(wrapper.state().value).toBe('test');
  });
});

describe('TrewViewPanel render', () => {
  it('TrewViewPanel rendered inside is true', () => {
    const {wrapper, props} = tViewPanelSetup({
      treeDataSource: treeData,
      inside: true
    });
    wrapper.setState({inside: true});
    expect(wrapper.state().inside).toBe(true);
  });
  it('TrewViewPanel rendered inside is false', () => {
    const {wrapper, props} = tViewPanelSetup({treeDataSource: treeData});
    expect(wrapper.state().inside).toBe(false);
  });
});

describe('TrevViewPanel event handle', () => {
  const {wrapper, props} = tViewPanelSetup({treeDataSource: treeData});
  it('Button click event 触发 onMouseHandler without label', () => {
    wrapper.instance().onMouseHandler(false);
    expect(wrapper.state().inside).toBe(false);
  });
  it('select node', () => {
    wrapper.instance().onSelect({props: {title: 'parent 1', value: '0-0'}});
    expect(wrapper.state().label).toBe('parent 1');
    expect(wrapper.state().value).toBe('0-0');
  });
  it('Button click event 触发 onMouseHandler', () => {
    wrapper.instance().onMouseHandler(false);
    expect(wrapper.state().inside).toBe(true);
  });
  it('trigger search event', () => {
    wrapper.instance().onSearch('0-1');
    expect(wrapper.state().key).toBe('0-1');
  });
});
