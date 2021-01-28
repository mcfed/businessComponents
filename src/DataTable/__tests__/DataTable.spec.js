import React from 'react';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {Table} from 'antd';
import DataTable, {TableMenu} from '../index';
import {config} from 'rxjs';

const setup = props => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<DataTable {...props} />);
  return {
    props,
    wrapper
  };
};

const setupTableMenu = props => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapperTableMenu = shallow(<TableMenu {...props} />);
  return {
    props,
    wrapperTableMenu
  };
};

describe('快照测试', () => {
  it('DataTable 快照测试', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('DataTable 组件是否渲染', () => {
  const {wrapper, props} = setup();
  // case1
  // 通过查找存在 Input,测试组件正常渲染
  it.skip('DataTable Component should be render', () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
    expect(wrapper.find('Table').exists()).toBe(true);
    // expect(toJson(wrapper)).toMatchSnapshot();
  });

  it.skip('DataTable Component should be pagination', () => {
    // expect(wrapper.find('Pagination').exists()).toBe(true);
  });
});

describe('state visible with some methods', () => {
  const {wrapper, props} = setup();

  it('default visible state is false', () => {
    expect(wrapper.state('visible')).toBe(false);
  });

  it('trggier showPopover visible to be true', () => {
    wrapper.instance().showPopover();
    expect(wrapper.state('visible')).toBe(true);
  });

  it('trggier onClosePopup visible to be false', () => {
    wrapper.instance().showPopover();
    wrapper.instance().onClosePopup();
    expect(wrapper.state('visible')).toBe(false);
  });

  it('trggier onPopupVisibleChange to any', () => {
    wrapper.instance().onPopupVisibleChange(true);
    expect(wrapper.state('visible')).toBe(true);
  });
});

describe('defaultSort ', () => {
  const columns = [
      {
        title: 'first',
        key: 1,
        dataIndex: 'first'
      },
      {
        title: 'second',
        key: 2,
        dataIndex: 'second'
      }
    ],
    defaultSort = {
      columnKey: 'first',
      order: 'descend'
    };
  const defaultProps = {
    rowKey: 'id',
    defaultSort: defaultSort,
    dataSource: [
      {
        first: 111,
        second: 222,
        id: 1
      },
      {
        first: 333,
        second: 444,
        id: 2
      }
    ],
    columns: columns
  };

  it('while defaultSort is exist', () => {
    const {wrapper, props} = setup({
      ...defaultProps
    });
    expect(wrapper.state('columns')).toEqual(
      columns.map(it => {
        defaultSort.columnKey == it.dataIndex
          ? (it = Object.assign(it, {defaultSortOrder: defaultSort.order}))
          : null;
        return it;
      })
    );
  });

  it('while defaultSort null', () => {
    const {wrapper, props} = setup({
      ...Object.assign(defaultProps, {defaultSort: {}})
    });
    expect(wrapper.state('columns')).toEqual(columns);
  });
});

describe('DataTable 方法测试全覆盖', () => {
  const columns = [
      {
        title: 'first',
        key: 1,
        dataIndex: 'first'
      },
      {
        title: 'second',
        key: 2,
        dataIndex: 'second',
        type: 'noConfig',
        visible: true
      }
    ],
    defaultSort = {
      columnKey: 'first',
      order: 'descend'
    },
    dataSource = [
      {
        first: 111,
        second: 222,
        id: 1
      },
      {
        first: 333,
        second: 444,
        id: 2
      }
    ];
  const defaultProps = {
    rowKey: 'id',
    defaultSort: defaultSort,
    dataSource: dataSource,
    columns: columns
  };

  it('showPopover 方法调用', () => {
    const {wrapper, props} = setup({
      ...defaultProps
    });
    wrapper.instance().showPopover();
    expect(wrapper.instance().state.visible).toEqual(true);
  });

  it('onClosePopup 方法调用', () => {
    const {wrapper, props} = setup({
      ...defaultProps
    });
    wrapper.instance().onClosePopup();
    expect(wrapper.instance().state.visible).toEqual(false);
  });

  it('onPopupVisibleChange 方法调用', () => {
    const {wrapper, props} = setup({
      ...defaultProps
    });
    wrapper.instance().onClosePopup(false);
    expect(wrapper.instance().state.visible).toEqual(false);
  });

  it('renderTableMenu 方法调用', () => {
    const {wrapper, props} = setup({
      ...defaultProps
    });
    wrapper.instance().state.columns = columns;
    const wrapperTable = wrapper.instance().renderTableMenu();
    expect(wrapperTable.props['columns']).toEqual(columns);
  });

  it('constructor 方法调用', () => {
    const {wrapper, props} = setup({
      ...defaultProps
    });
    wrapper.instance().constructor({columns: columns});
    expect(wrapper.instance().state.columns).toEqual(columns);
  });

  it('onSelectChange 方法调用', () => {
    const columnsExpect = [
      {
        title: 'first',
        key: 1,
        dataIndex: 'first',
        defaultSortOrder: 'descend',
        visible: true
      },
      {
        title: 'second',
        key: 2,
        dataIndex: 'second',
        type: 'noConfig',
        visible: false
      }
    ];
    const {wrapper, props} = setup({
      ...defaultProps
    });
    wrapper.instance().state.columns = columns;
    wrapper.instance().onSelectChange([1]);
    expect(wrapper.instance().state.columns).toEqual(columnsExpect);
  });
});

describe('TableMenu 组件是否渲染', () => {
  const columns = [
    {
      title: 'first',
      key: 1,
      dataIndex: 'first'
    },
    {
      title: 'second',
      key: 2,
      dataIndex: 'second',
      type: 'noConfig',
      visible: true
    }
  ];
  const defaultProps = {
    defaultValue: 1,
    columns: columns
  };
  const {wrapperTableMenu, props} = setupTableMenu({...defaultProps});
  it('wrapperTableMenu 是否render', () => {
    expect(wrapperTableMenu.find('div').exists()).toBe(true);
  });
});

describe('TableMenu 方法测试全覆盖', () => {
  const columns = [
    {
      title: 'first',
      key: 1,
      dataIndex: 'first'
    },
    {
      title: 'second',
      key: 2,
      dataIndex: 'second',
      type: 'noConfig',
      visible: true
    }
  ];
  const defaultProps = {
    defaultValue: 1,
    columns: columns,
    onSelectChange: jest.fn(),
    onClosePopup: jest.fn()
  };

  it('handleChange 方法调用', () => {
    const {wrapperTableMenu, props} = setupTableMenu({
      ...defaultProps
    });
    wrapperTableMenu.instance().state.columns = columns;
    wrapperTableMenu.instance().handleChange(columns);
    expect(wrapperTableMenu.instance().state.columns).toEqual(columns);
  });

  it('handleSubmit 方法调用', () => {
    const {wrapperTableMenu, props} = setupTableMenu({
      ...defaultProps
    });
    wrapperTableMenu.instance().state.columns = columns;
    wrapperTableMenu.instance().handleSubmit(columns);
    expect(wrapperTableMenu.instance().state.columns).toEqual(columns);
  });

  it('saveFormRef 方法调用', () => {
    const {wrapperTableMenu, props} = setupTableMenu({
      ...defaultProps
    });
    const form = {};
    wrapperTableMenu.instance().saveFormRef(form);
    expect(wrapperTableMenu.instance().form).toEqual(form);
  });

  it.skip('handleOk 方法调用', () => {
    const {wrapperTableMenu, props} = setupTableMenu({
      ...defaultProps
    });
    let onSelectChange = jest.fn();
    let onClosePopup = jest.fn();
    wrapperTableMenu.instance().state.onSelectChange = onSelectChange;
    wrapperTableMenu.instance().state.onClosePopup = onClosePopup;
    wrapperTableMenu.instance().handleOk();
    // expect(onSelectChange).toBeCalled();
    expect(onClosePopup).toBeCalled();
  });
});
