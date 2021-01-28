import React from 'react';
import {shallow, mount} from 'enzyme';
import DataTable from '../index';

const setup = props => {
  const wrapper = shallow(<DataTable {...props} />);
  return {
    wrapper,
    props
  };
};

describe('快照测试', () => {
  it('datatable ', () => {
    const {wrapper} = setup();

    expect(wrapper).toMatchSnapshot();
  });
});

describe('datatable method test', () => {
  it('component', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();
    const columns = [{dataIndex: 1}, {dataIndex: 2}];
    instance.componentWillReceiveProps({columns: columns});
    expect(wrapper.state('columns')).toEqual(columns);
  });

  it('render method test ', () => {
    const wrapper = setup({
      columns: [
        {
          aa: 1,
          key: 1,
          bb: 3,
          visible: undefined
        },
        {aa: 2, key: 2, bb: 4, visible: false},
        {
          aa: 3,
          key: 3,
          bb: 6,
          visible: true
        }
      ]
    });
    expect(wrapper.prop('columns')).toEqual([
      {
        aa: 1,
        key: 1,
        bb: 3,
        visible: undefined
      },
      {
        aa: 3,
        key: 3,
        bb: 6,
        visible: true
      }
    ]);
  });

  it.only('render method test defaultSort', () => {
    const {wrapper} = setup({
      defaultSort: {columnKey: 'a', order: 'ascend'},
      columns: [
        {
          aa: 1,
          key: 1,
          dataIndex: 'a',
          bb: 3,
          visible: undefined
        },
        {aa: 2, key: 2, bb: 4, dataIndex: 'b', visible: false},
        {
          aa: 3,
          key: 3,
          bb: 6,
          dataIndex: 'c',
          visible: true
        }
      ]
    });
    expect(wrapper.prop('columns')).toEqual([
      {
        aa: 1,
        key: 1,
        dataIndex: 'a',
        bb: 3,
        visible: undefined,
        defaultSortOrder: 'ascend'
      },
      {aa: 3, key: 3, bb: 6, dataIndex: 'c', visible: true}
    ]);
  });
});
