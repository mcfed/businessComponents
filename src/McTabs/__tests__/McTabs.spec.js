import {shallow} from 'enzyme';
import React from 'react';
import {Input} from 'antd';
import FormItem from '../../FormItem';
import BaseForm from '../../BaseForm';

import McTabs from '../index.tsx';

class Form1 extends React.Component {
  saveFormRef(form) {
    this.form = form;
  }
  render() {
    return (
      <BaseForm ref={this.saveFormRef.bind(this)} name='tab1'>
        <FormItem>
          <Input
            label='form1'
            name='form1'
            defaultValue=''
            rules={[
              {
                required: true,
                message: '必填1'
              }
            ]}
          />
        </FormItem>
        <FormItem>
          <Input
            label='form2'
            name='form2'
            defaultValue=''
            rules={[
              {
                required: true,
                message: '必填2'
              }
            ]}
          />
        </FormItem>
      </BaseForm>
    );
  }
}
class Form2 extends React.Component {
  saveFormRef(form) {
    this.form = form;
  }
  render() {
    return (
      <BaseForm ref={this.saveFormRef.bind(this)} name='tab2'>
        <FormItem>
          <Input
            label='form2'
            name='form2'
            defaultValue=''
            rules={[
              {
                required: true,
                message: '必填2'
              }
            ]}
          />
        </FormItem>
      </BaseForm>
    );
  }
}
class Form3 extends React.Component {
  saveFormRef(form) {
    this.form = form;
  }
  render() {
    return (
      <BaseForm ref={this.saveFormRef.bind(this)} name='tab3'>
        <FormItem>
          <Input
            label='form3'
            name='form3'
            defaultValue=''
            rules={[
              {
                required: true,
                message: '必填3'
              }
            ]}
          />
        </FormItem>
      </BaseForm>
    );
  }
}

const setup = props => {
  const wrapper = shallow(<McTabs {...props} />);

  return {
    wrapper,
    props
  };
};

describe('快照测试', () => {
  it('全页快照', () => {
    const props = {
      defaultActiveKey: 'tab3',
      tabsData: [
        {
          text: '泰波一',
          name: 'tab1',
          component: Form1
          // disabled: true
        },
        {
          text: '泰波二',
          name: 'tab2',
          // disabled: true,
          component: Form2
        },
        {
          text: '泰波三',
          name: 'tab3',
          disabled: true,
          component: Form3
        }
      ]
    };
    const {wrapper} = setup(props);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('全方法测试', () => {
  const props = {
    defaultActiveKey: 'tab3',
    tabsData: [
      {
        text: '泰波一',
        name: 'tab1',
        component: Form1
        // disabled: true
      },
      {
        text: '泰波二',
        name: 'tab2',
        // disabled: true,
        component: Form2
      },
      {
        text: '泰波三',
        name: 'tab3',
        disabled: true,
        component: Form3
      }
    ],
    onChange: jest.fn(),
    handleSubmit: jest.fn()
  };
  it('setActiveKey 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    instance.setActiveKey();
    expect(instance.state.activeTabIndex).toBe('tab1');
  });
  it('setActiveKey defaultActiveKey 为空 branch 测试', () => {
    const {wrapper} = setup({
      tabsData: [
        {
          text: '泰波一',
          name: 'tab110',
          component: Form1
        }
      ]
    });
    const instance = wrapper.instance();
    instance.setActiveKey();
    expect(instance.state.activeTabIndex).toBe('tab110');
  });
  it('onChange 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    let key = 'tab2';
    instance.onChange(key);
    expect(instance.state.activeTabIndex).toBe(key);
  });
  it('handleSubmit 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    let key = 'tab2';
    instance.onChange(key);
    expect(instance.state.activeTabIndex).toBe(key);
    instance.myRef = [
      {
        ref: {
          current: {
            form: {
              validateFieldsAndScroll: jest.fn(({}, cb) => {
                cb(true, null);
              }),
              props: {
                name: 'tab1'
              }
            }
          }
        }
      }
    ];
    instance.handleSubmit();
    expect(instance.state.activeTabIndex).toBe('tab1');
  });
  it('handleSubmit error为空 branch 测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    let key = 'tab2';
    instance.onChange(key);
    expect(instance.state.activeTabIndex).toBe(key);
    instance.myRef = [
      {
        ref: {
          current: {
            form: {
              validateFieldsAndScroll: jest.fn(({}, cb) => {
                cb(false, null);
              }),
              props: {
                name: 'tab1'
              }
            }
          }
        }
      }
    ];
    instance.handleSubmit();
    expect(instance.state.activeTabIndex).toBe('tab2');
  });
  it('getTabPane 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    let item = {
      text: '',
      name: '',
      disabled: '',
      component: ''
    };
    instance.getTabPane(item, {});
  });
});
