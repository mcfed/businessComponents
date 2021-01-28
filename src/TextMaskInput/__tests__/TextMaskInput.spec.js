import React from 'react';
import {shallow} from 'enzyme';
import {Form} from 'antd';
import TextMaskInput from '../index';

const Mask = props => {
  <Form>
    <FormItem label='email'>
      {props.form.getFieldDecorator('email')(<TextMaskInput {...props} />)}
    </FormItem>
  </Form>;
};

const Demo = Form.create()(Mask);

const setup = props => {
  const wrapper = shallow(<Demo {...props} />);

  return {
    wrapper,
    props
  };
};

describe('快照测试', () => {
  it('全页快照', () => {
    const props = {
      maskType: 'email'
    };
    const {wrapper} = setup(props);
    expect(wrapper).toMatchSnapshot();
  });
});
