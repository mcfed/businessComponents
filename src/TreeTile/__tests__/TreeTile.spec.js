import {shallow, mount, render} from 'enzyme';
import React from 'react';
import TreeTile from '../index.tsx';

const setup = props => {
  const onChange = item => <div>{item}</div>;
  const wrapper = shallow(<TreeTile {...props} />);
  return {
    wrapper,
    props
  };
};

describe('快照测试', () => {
  it('TreeTile 快照测试', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

describe.skip('TreeTile render 是否正确渲染', () => {
  const treeData = [
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-0',
            key: '0-0-0'
          }
        ]
      },
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
          {
            title: 'Child Node3',
            value: '0-1-0',
            key: '0-1-0'
          },
          {
            title: 'Child Node4',
            value: '0-1-1',
            key: '0-1-1'
          },
          {
            title: 'Child Node5',
            value: '0-1-2',
            key: '0-1-2'
          }
        ]
      }
    ],
    checkedKeys = ['0-1-2'];
  const defaultProps = {
    title: '测试用例',
    checkedKeys: checkedKeys,
    dataSource: treeData
  };
  it('TreeTile 不传 title 参数时渲染是否正确', () => {
    const {wrapper, props} = setup({});
    expect(wrapper.find('Card').prop('title')).toBe('请选择');
  });

  it('TreeTile 不传 dataSource 时渲染是否正确', () => {
    const {wrapper, props} = setup({});
    expect(wrapper.find('Tree').length).toBe(0);
  });

  it('TreeTile 不传 checkedKeys 时渲染是否正确', () => {
    const {wrapper, props} = setup({});
    expect(wrapper.instance().state.checkedKeys).toEqual([]);
  });

  it('TreeTile 传入 title 参数时渲染是否正确', () => {
    const {wrapper, props} = setup({...defaultProps});
    expect(wrapper.find('Card').prop('title')).toBe('测试用例');
  });

  it('TreeTile 传入 dataSource 参数时渲染是否正确', () => {
    const {wrapper, props} = setup({...defaultProps});
    expect(wrapper.find('Tree').length).toBe(1);
  });

  it('TreeTile 传入 dataSource 参数后节点个数渲染是否正确', () => {
    const {wrapper, props} = setup({...defaultProps});
    expect(wrapper.find('TreeNode').length).toBe(6);
  });

  it('TreeTile 传入 checkedKeys 参数后选中状态渲染是否正确', () => {
    const {wrapper, props} = setup({...defaultProps});
    expect(wrapper.instance().state.checkedKeys).toEqual(checkedKeys);
  });
});

describe.skip('TreeTile 方法测试', () => {
  const treeData = [
      {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
          {
            title: 'Child Node1',
            value: '0-0-0',
            key: '0-0-0'
          }
        ]
      },
      {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
          {
            title: 'Child Node3',
            value: '0-1-0',
            key: '0-1-0'
          },
          {
            title: 'Child Node4',
            value: '0-1-1',
            key: '0-1-1'
          },
          {
            title: 'Child Node5',
            value: '0-1-2',
            key: '0-1-2'
          }
        ]
      }
    ],
    checkedKeys = [];
  const onChange = jest.fn();
  const defaultProps = {
    title: '测试用例',
    checkedKeys: checkedKeys,
    dataSource: treeData,
    onChange: onChange
  };

  it('getKeysFromMap 方法调用', () => {
    const {wrapper, props} = setup({...defaultProps});
    wrapper.instance().getKeysFromMap(treeData, checkedKeys);
    expect(wrapper.instance().state.dataSourceKeys).toEqual(checkedKeys);
  });

  it('renderTreeNodes 方法调用', () => {
    const {wrapper, props} = setup({...defaultProps});
    wrapper.instance().renderTreeNodes(treeData);
    expect(wrapper.find('TreeNode').length).toBe(6);
  });

  it('onCheckAll 方法调用', () => {
    const {wrapper, props} = setup({...defaultProps});
    const e = {target: {checked: true}};
    wrapper.instance().onCheckAll(e);
    expect(wrapper.instance().state.checkedKeys).toEqual(checkedKeys);
    expect(wrapper.instance().state.indeterminate).toEqual(false);
    expect(onChange).toBeCalled();
  });

  it('onCheck 方法调用', () => {
    const {wrapper, props} = setup({...defaultProps});
    wrapper.instance().onCheck(checkedKeys);
    wrapper.instance().state.dataSourceKeys = checkedKeys;
    expect(wrapper.instance().state.checkedKeys).toEqual(checkedKeys);
    expect(wrapper.instance().state.indeterminate).toEqual(false);
    expect(wrapper.instance().state.checkAll).toEqual(true);
    expect(onChange).toBeCalled();
  });
});
