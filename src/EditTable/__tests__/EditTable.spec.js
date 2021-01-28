import {shallow} from 'enzyme';
import React from 'react';
import {Button} from 'antd';

import EditTable from '../index.tsx';

const setup = props => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    }
  ];
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }
  ];

  const defaultProps = {
    onChange: jest.fn()
  };

  const wrapper = shallow(
    <EditTable
      data={dataSource}
      columns={columns}
      {...Object.assign({}, defaultProps, props)}
    />
  );

  return {
    wrapper,
    props,
    dataSource,
    columns
  };
};

describe.skip('edittable base test', () => {
  it('render ', () => {
    const {wrapper, props} = setup();
    // console.log(wrapper)
    expect(wrapper.find('Table').exists()).toBe(true);
  });

  it('默认state', () => {
    const {wrapper, props} = setup({
      data: undefined
    });

    expect(wrapper.state('data')).toEqual([]);
    expect(wrapper.state('editingKey')).toBe('');
  });

  it('传值后的state', () => {
    const {wrapper, props, dataSource} = setup();

    expect(wrapper.state('data')).toEqual(dataSource);
  });

  it('render 的columns 是重新加工过的', () => {
    const {wrapper, props, dataSource, columns} = setup();

    expect(wrapper.find('Table').prop('columns')).toEqual(
      wrapper.state('columns').map(col => {
        if (!col.editComponent) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            editConfig: col.editConfig,
            editDom: col.editComponent,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record)
          })
        };
      })
    );
  });

  it.skip('render footer', () => {
    const {wrapper, props} = setup();
    expect(wrapper.find('Table').prop('footer')()).toEqual(
      <Button
        icon='plus'
        onClick={wrapper.instance().addNew}
        style={{width: '100%'}}>
        新增
      </Button>
    );
  });
});

describe.skip('editable method ', () => {
  it('isEditing 默认为空，传入key为123 返回false', () => {
    const {wrapper, props} = setup();
    const record = {
      key: 123
    };
    expect(wrapper.instance().isEditing(record)).toBe(false);
  });

  it('isEditing 默认为空，传入key为空 返回true', () => {
    const {wrapper, props} = setup();
    const record = {
      key: ''
    };
    expect(wrapper.instance().isEditing(record)).toBe(true);
  });

  it('edit 方法调用,若key 为空，则返回false', () => {
    const {wrapper, props} = setup();
    const key = '';

    expect(wrapper.instance().edit(key)).toBe(undefined);
  });

  it('edit 方法调用，若key不为空，则 state 改变', () => {
    const {wrapper, props} = setup();

    const key = '123';
    wrapper.instance().edit(key);
    expect(wrapper.state('editingKey')).toBe('123');
  });

  it('delete 方法调用', () => {
    const onchangeFn = jest.fn();
    const {wrapper, props, dataSource} = setup({
      onChange: onchangeFn
    });
    const key = '1';
    let oldData = wrapper.state('data');
    wrapper.instance().delete(key);
    expect(wrapper.state('data')).toEqual(oldData.filter(c => c.key !== key));
    expect(onchangeFn.mock.calls.length).toBe(1);
  });

  it('addNew 方法调用,若当前editingkey不为空则返回false', () => {
    const {wrapper, props} = setup();
    wrapper.instance().edit('1');
    expect(wrapper.instance().addNew()).toBe(false);
  });

  it('addNew 方法调用', () => {
    const {wrapper, props, dataSource} = setup();
    wrapper.instance().addNew();
    expect(wrapper.state('data').length).toBe(dataSource.length + 1);
  });

  it.skip('cancel 方法调用', () => {
    const {wrapper, props} = setup();
    const params = {
      form: undefined,
      key: '1'
    };
    wrapper.instance().cancel(params);
    //判断 是否删除 逻辑？
  });

  it.skip('editable true branch 测试', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const render = instance.state.columns.filter(
      item => item.dataIndex === '操作'
    )[0].render;
    const record = {
      key: '1'
    };
    instance.save = jest.fn();
    instance.isEditing = jest.fn(() => true);
    const renderWrapper = render('', record);
    // dom 点击事件覆盖
    renderWrapper.props.children.props.children[0].props
      .children()
      .props.onClick();
    renderWrapper.props.children.props.children[1].props
      .children()
      .props.onConfirm();
  });

  it.skip('editable false branch 测试', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const render = instance.state.columns.filter(
      item => item.dataIndex === '操作'
    )[0].render;
    const record = {
      key: '1'
    };
    const renderWrapper = render('', record);
    // dom 点击事件覆盖
    renderWrapper.props.children.props.children[0].props.onClick();
    renderWrapper.props.children.props.children[1].props.onConfirm();
  });

  it('UNSAFE_componentWillReceiveProps 生命周期测试', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const nextprops = {
      data: [
        {
          key: '3',
          name: '胡彦组',
          age: 32,
          address: '西湖区湖底公园1号'
        }
      ]
    };
    instance.UNSAFE_componentWillReceiveProps(nextprops);
  });

  it('edit 方法测试,editingKey已存在branch', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const editingKey = '1';
    instance.state.editingKey = '5';
    const activeStatusSpy = jest.spyOn(instance, 'activeStatus');
    instance.edit(editingKey);
    expect(instance.state.editingKey).toBe('5');
    expect(activeStatusSpy).not.toHaveBeenCalledWith();
  });

  it('editColumn 方法测试', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const editingKey = 1;
    instance.editColumn(editingKey);
    expect(instance.state.editingKey).toBe(editingKey);
  });

  it('editColumn 方法测试,editingKey已存在branch', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const editingKey = '1';
    instance.state.editingKey = '5';
    instance.editColumn(editingKey);
    expect(instance.state.editingKey).not.toBe(editingKey);
  });

  // it('changeColumnEditStatus 方法测试', () => {
  //   const {wrapper} = setup();
  //   const instance = wrapper.instance();
  //   const record = {
  //     key: 1
  //   };
  //   const tdObject = {
  //     dataIndex: 'name'
  //   };
  //   const editColumnSpy = jest.spyOn(instance, 'editColumn');
  //   instance.changeColumnEditStatus(record, tdObject);
  //   expect(editColumnSpy).toHaveBeenCalledWith(record.key);
  //   expect(
  //     instance.state.columns.filter(
  //       item => item.dataIndex === tdObject.dataIndex
  //     )[0].editingStatus
  //   ).toBeTruthy();
  // });

  it('revertStatus 方法测试', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    instance.revertStatus();
    instance.state.columns.map(item => {
      expect(item.editingStatus).toBeFalsy();
    });
  });

  it('activeStatus 方法测试', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    instance.activeStatus();
    instance.state.columns.map(item => {
      expect(item.editingStatus).toBeTruthy();
    });
  });

  it('save 方法测试', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const form = {
      validateFields: jest.fn(cb => {
        cb(false, null);
      }),
      getFieldInstance: jest.fn().mockReturnValue({
        validateFields: jest.fn(cb => {
          cb(false, null);
        })
      })
    };
    const key1 = '1';
    const key2 = '110';
    // 编辑保存
    instance.save(form, key1);
    // 保存新增项branch
    instance.save(form, key2);
  });

  it('save 方法测试,第一个验证方法未通过branch', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const form = {
      validateFields: jest.fn(cb => {
        cb(true, null);
      })
    };
    const key = '1';
    instance.save(form, key);
  });

  it('save 方法测试,第二个验证方法未通过branch', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const form = {
      validateFields: jest.fn(cb => {
        cb(false, null);
      }),
      getFieldInstance: jest.fn().mockReturnValue({
        validateFields: jest.fn(cb => {
          cb(true, null);
        })
      })
    };
    const key = '1';
    instance.save(form, key);
  });

  it('cancel 方法测试, 取消table的数据行branch', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const deleteSpy = jest.spyOn(instance, 'delete');
    const revertStatusSpy = jest.spyOn(instance, 'revertStatus');
    instance.cancel({}, '1');
    expect(deleteSpy).not.toBeCalledWith('1');
    expect(instance.state.editingKey).toBe('');
    expect(revertStatusSpy).toBeCalled();
  });

  it('cancel 方法测试, 取消新增的数据行branch', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const deleteSpy = jest.spyOn(instance, 'delete');
    const revertStatusSpy = jest.spyOn(instance, 'revertStatus');
    instance.state.data.push({
      key: '3',
      name: '',
      age: '',
      address: ''
    });
    instance.cancel({}, '3');
    expect(deleteSpy).toBeCalledWith('3');
    expect(instance.state.editingKey).toBe('');
    expect(revertStatusSpy).toBeCalled();
  });

  it('editComponent 存在情况测试', () => {
    const props = {
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name545555',
          editComponent: <div></div>
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address'
        }
      ]
    };
    setup(props);
  });
});

describe('快照测试', () => {
  it('Editable全页快照', () => {
    const {wrapper} = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
