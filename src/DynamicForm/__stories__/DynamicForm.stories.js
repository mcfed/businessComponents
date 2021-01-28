import React, {PropTypes} from 'react';
import {storiesOf} from '@storybook/react';
import {Select, Input, Radio} from 'antd';
import './index.less';
// import md from "../README.md";

import DynamicForm from '../index';

const stories = storiesOf('DynamicForm', module);
stories.addParameters({jest: ['DynamicForm.spec.js']});

const formData = [
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
  },
  {
    name: 'select1',
    component: Select,
    label: 'select1',
    disabled: true,
    rules: [
      {
        required: true,
        message: '必填select1'
      }
    ],
    renderItem: (item, idx) => {
      return (
        <Select.Option key={idx} value={item.value}>
          {item.label}
        </Select.Option>
      );
    },
    options: [
      {label: '1', value: '1'},
      {label: '2', value: '2'},
      {label: '3', value: '3'}
    ],
    defaultValue: '3',
    placeholder: '请选择select1',
    onChange: e => {
      console.log('select1:' + e);
    }
  },
  {
    name: 'select2',
    component: Select,
    label: 'select2',
    rules: [
      {
        required: true,
        message: '必填select2'
      }
    ],
    renderItem: (item, idx) => {
      return (
        <Select.Option key={idx} value={item.value}>
          {item.label}
        </Select.Option>
      );
    },
    options: [
      {label: '1', value: '1'},
      {label: '2', value: '2'},
      {label: '3', value: '3'}
    ],
    // defaultValue: '1',
    placeholder: '请选择select2',
    onChange: e => {
      console.log('select2:' + e);
    }
  },
  {
    name: 'select3',
    component: Select,
    label: 'select3',
    rules: [
      {
        required: true,
        message: '必填select3'
      }
    ],
    renderItem: (item, idx) => {
      return (
        <Select.Option key={idx} value={item.value}>
          {item.label}
        </Select.Option>
      );
    },
    options: [
      {label: '1', value: '1'},
      {label: '2', value: '2'},
      {label: '3', value: '3'}
    ],
    // defaultValue: '1',
    placeholder: '请选择select3',
    onChange: e => {
      console.log('select3:' + e);
    },
    renderable: form => form.getFieldValue('select2') === '2'
  },
  {
    name: 'radio1',
    component: Radio.Group,
    label: '增加',
    defaultValue: 0,
    rules: [
      {
        required: true,
        message: '必填radio1'
      }
    ],
    options: [
      {
        label: '授权访问',
        value: 0
      },
      {
        label: '允许访问',
        value: 1
      },
      {
        label: '拒绝访问',
        value: 2,
        disabled: true
      }
    ]
  }
];

stories.add(
  '基础使用',
  () => {
    return <DynamicForm formData={formData} />;
  }
  //   { notes: { markdown: md } }
);
