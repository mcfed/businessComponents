import {shallow} from 'enzyme';
import React from 'react';
import {Input} from 'antd';

import DynamicForm from '../index.tsx';

const setup = props => {
  const wrapper = shallow(<DynamicForm {...props} />);

  return {
    wrapper,
    props
  };
};

describe('快照测试', () => {
  it('全页快照', () => {
    const props = {
      formData: [
        {
          name: 'input1',
          component: Input,
          label: 'input1',
          rules: [
            {
              required: true,
              message: '必填input1'
            }
          ],
          defaultValue: 'input1',
          formItemLayout: {
            labelCol: {span: 4},
            wrapperCol: {span: 8}
          }
        }
      ]
    };
    const {wrapper} = setup(props);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('全方法测试', () => {
  const props = {
    formData: [
      {
        name: 'input1',
        component: Input,
        label: 'input1',
        rules: [
          {
            required: true,
            message: '必填input1'
          }
        ],
        defaultValue: 'input1',
        formItemLayout: {
          labelCol: {span: 4},
          wrapperCol: {span: 8}
        }
      }
    ]
  };
  it('saveFormRef 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    instance.saveFormRef('123');
    expect(instance.form).toBe('123');
  });
});
