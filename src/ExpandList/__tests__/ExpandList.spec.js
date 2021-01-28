import {shallow, mount, render} from 'enzyme';
import React from 'react';

import ExpandList from '../index.tsx';

const setup = props => {
  const renderItems = item => <div>{item}</div>;
  const wrapper = shallow(
    <ExpandList {...props} fetchListUrl='test' renderItems={renderItems} />
  );
  return {
    wrapper,
    props
  };
};

describe('快照测试', () => {
  it('ExpandList 快照测试', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });
});

describe('ExpandList render 是否正确渲染', () => {
  it('render', () => {
    const {wrapper} = setup();
    expect(wrapper.find('List').exists()).toBe(true);
  });

  it('默认参数是否正确渲染', () => {
    const {wrapper} = setup();
    expect(wrapper.find('List').prop('header')).toEqual('');
  });

  it('传入header', () => {
    const {wrapper} = setup({
      header: 'Test'
    });
    expect(wrapper.find('List').prop('header')).toEqual('Test');
  });
});

describe('方法测试全覆盖', () => {
  it('getInitData 是否正确调用', () => {
    const {wrapper} = setup({
      pageSize: 2
    });
    wrapper.instance().state.current = 1;
    wrapper.instance().state.initLoading = true;
    wrapper.instance().getData = jest.fn();
    wrapper.instance().getInitData();
    expect(wrapper.instance().state.initLoading).toBe(true);
  });

  it.skip('getData 测试回调函数应该能够被调用', () => {
    let mockFn = jest.fn();
    const resp = {data: {data: {}}};
    axios.get.mockResolvedValue(resp);
    const {wrapper} = setup();
    wrapper
      .instance()
      .getData(mockFn)
      .then(data => expect(mockFn(resp)).toBeCalled());
  });

  it('onLoadMore 中 current 是否正确调用', () => {
    const {wrapper} = setup({
      pageSize: 2
    });
    wrapper.instance().state.current = 1;
    wrapper.instance().onLoadMore();
    expect(wrapper.instance().state.current).toEqual(1);
  });

  it('onLoadMore 中 data 是否正确调用', () => {
    const {wrapper} = setup({
      pageSize: 2
    });
    const list = [1, 2, 3, 4, 5];
    const data = [1, 2, 3, 4];
    wrapper.instance().state.list = list;
    wrapper.instance().state.current = 1;
    wrapper.instance().onLoadMore();
    expect(wrapper.instance().state.data).toEqual(data);
  });

  it('onLoadMore 中分页未达到上限时 initLoading 是否正确调用', () => {
    const {wrapper} = setup({
      pageSize: 2
    });
    const list = [1, 2, 3, 4, 5];
    wrapper.instance().state.list = list;
    wrapper.instance().state.current = 1;
    wrapper.instance().state.initLoading = false;
    wrapper.instance().onLoadMore();
    expect(wrapper.instance().state.initLoading).toBe(false);
  });

  it('onLoadMore 中分页达到上限时 initLoading 是否正确调用', () => {
    const {wrapper} = setup({
      pageSize: 2
    });
    const list = [1, 2, 3, 4, 5];
    wrapper.instance().state.list = list;
    wrapper.instance().state.current = 2;
    wrapper.instance().state.initLoading = false;
    wrapper.instance().onLoadMore();
    expect(wrapper.instance().state.initLoading).toBe(true);
  });
});
