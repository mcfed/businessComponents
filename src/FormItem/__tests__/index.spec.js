import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {Input, Select, TreeSelect} from 'antd';

import FormItemRender, {FormItem} from '../index';

const setup = (children, props) => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const defaultProps = {
    formRef: {
      getFieldDecorator(name, item) {
        return function(component) {
          return component;
        };
      }
    },
    formLayout: {
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 18
      }
    }
  };
  const wrapper = shallow(
    <FormItem {...Object.assign({}, defaultProps, props)}>{children}</FormItem>
  );
  return {
    props,
    wrapper
  };
};

describe('formitem base test', () => {
  it('test render', () => {
    const defaultProps = {
      formRef: {
        getFieldDecorator(name, item) {
          return function(component) {
            return component;
          };
        }
      },
      formLayout: {
        labelCol: {
          span: 3
        },
        wrapperCol: {
          span: 18
        }
      }
    };
    const wrapper = render(
      <FormItem {...defaultProps} name='aaa' label='bbb'>
        <Input defaultValue='ccc' />
      </FormItem>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('complete render', () => {
    const wrapper = render(
      <FormItemRender name='aaa' label='bbb'>
        <Input defaultValue='ccc' />
      </FormItemRender>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('method test componentDidMount', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {
      fetch: 'aaa'
    });

    const instance = wrapper.instance();

    instance.fetchData = jest.fn();

    instance.componentDidMount();

    expect(instance.fetchData).toHaveBeenCalled();
  });

  it('method test componentDidMount undefined', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {});
    const instance = wrapper.instance();

    instance.fetchData = jest.fn();

    instance.componentDidMount();

    expect(instance.fetchData).not.toHaveBeenCalled();
  });

  it('method test isObjectJSONSame', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {});
    const instance = wrapper.instance();

    expect(instance.isObjectJSONSame({aaaa: 1}, {bbb: 111})).toEqual(false);
    expect(instance.isObjectJSONSame({aaaa: 1}, {aaaa: 1})).toEqual(true);
  });

  it('method test compileFetchUrl', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {});
    const instance = wrapper.instance();

    expect(instance.compileFetchUrl('aaa', undefined)).toEqual('aaa');
    expect(instance.compileFetchUrl('aaa', {a: 1, b: 2})).toEqual(
      'aaa?a=1&b=2'
    );
    expect(
      instance.compileFetchUrl('aaa', () => {
        return {c: 1, d: 2};
      })
    ).toEqual('aaa?c=1&d=2');
  });

  it('method test defaultSetChildData', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {});
    const instance = wrapper.instance();

    instance.setChildData = jest.fn();
    instance.defaultSetChildData({code: 0, data: {items: [1, 2, 3, 4]}});

    expect(instance.setChildData).toHaveBeenCalled();
  });

  it('method test setChildData', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {});
    const instance = wrapper.instance();
    const array = [1, 32, 4, 5];

    expect(instance.setChildData(undefined)).toEqual(undefined);
    instance.setChildData(array);

    expect(wrapper.state('childData')).toEqual(array);
  });

  it('method test isPropsTrue', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {});
    const instance = wrapper.instance();

    expect(instance.isPropsTrue(true)).toEqual(true);
    expect(instance.isPropsTrue('aaa')).toEqual(true);
    expect(
      instance.isPropsTrue(() => {
        return 123;
      })
    ).toEqual(123);
  });

  it('method test fieldDisabledProp', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {});
    const instance = wrapper.instance();

    expect(instance.fieldDisabledProp(undefined)).toEqual({});
    expect(instance.fieldDisabledProp(true)).toEqual({disabled: true});
  });

  it('method test fieldRenderableProp', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {});
    const instance = wrapper.instance();

    expect(instance.fieldRenderableProp(undefined)).toEqual(true);
    expect(instance.fieldRenderableProp(true)).toEqual(true);
  });

  it('method test renderItem', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {});
    const instance = wrapper.instance();

    expect(instance.renderItem({label: 1, value: 2}, 1)).toEqual(
      <Select.Option key={1} value={2}>
        {1}
      </Select.Option>
    );
  });
  it('method test compileWrapperCols', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {});
    const instance = wrapper.instance();

    expect(instance.compileWrapperCols()).toEqual({
      wrapperCol: {
        span: 24
      }
    });
  });
  it('method test compileWrapperCols else', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {label: 'aaa'});
    const instance = wrapper.instance();

    expect(instance.compileWrapperCols()).toEqual({});
  });

  it('method test compileValue', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {label: 'aaa'});
    const instance = wrapper.instance();

    expect(instance.compileValue({props: {defaultValue: null}})).toEqual(
      undefined
    );
    expect(instance.compileValue({props: {defaultValue: undefined}})).toEqual(
      undefined
    );
    expect(instance.compileValue({props: {defaultValue: 123}})).toEqual(123);
    expect(instance.compileValue({props: {defaultValue: 'str'}})).toEqual(
      'str'
    );
  });

  it('method test renderChildNode', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {
      label: 'aaa',
      loopProp: 'child'
    });
    const instance = wrapper.instance();
    instance.loopRenderTreeNode = jest.fn();
    instance.renderChildNode([]);
    expect(instance.loopRenderTreeNode).toHaveBeenCalled();
  });

  it('method test renderChildNode no looprop & renderitem', () => {
    const {wrapper} = setup(<Input defaultValue='aaa' />, {
      label: 'aaa'
    });
    const instance = wrapper.instance();
    instance.renderItem = jest.fn();
    instance.renderChildNode([{}]);
    expect(instance.renderItem).toHaveBeenCalled();
  });

  it('method test renderChildNode no looprop  has renderitem', () => {
    const jestfn = jest.fn();
    const {wrapper} = setup(<Input defaultValue='aaa' />, {
      label: 'aaa',
      renderItem: jestfn
    });
    const instance = wrapper.instance();
    instance.renderChildNode([{}]);
    expect(jestfn).toHaveBeenCalled();
  });
});
