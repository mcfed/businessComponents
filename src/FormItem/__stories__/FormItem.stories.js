import React from 'react';
import {storiesOf} from '@storybook/react';
import FormItem from '../index';
import BaseForm from '../../BaseForm/index';
import { Input, Select, Button } from 'antd';

const stories = storiesOf('FormItem', module);
stories.addParameters({jest: ['index.spec.js']});

stories.add('基础使用', () => (
  <BaseForm>
    <FormItem label='第一个输入框' name='input1' defaultValue='默认值填入'>
      <Input />
    </FormItem>
    <FormItem label='第二个输入框' name='input2'>
      <Input placeholder='这里没有默认值' />
    </FormItem>
    <FormItem label='第三个输入框' name='input3' disabled >
      <Input placeholder='这里禁止触碰'/>
    </FormItem>
    <FormItem label='第四个子项' 
      name='section1' 
      defaultValue={2}
      options={[{value: 1, label: '第一个标签'}, {value: 2, label: '第二个标签'}, {value: 3, label: '第三个标签'}]} 
      renderItem={(item, index) => (
        <Select.Option value={item.value}>{item.label} </Select.Option>
      )}
    >
      <Select></Select>
    </FormItem>
    <FormItem label='第五个下拉框' name='select1' defaultValue={2}>
      <Select>
        <Select.Option value={1}>第一项</Select.Option>
        <Select.Option value={2}>第二项</Select.Option>
      </Select>
    </FormItem>
    <FormItem name='btn1' wrapperCol={{offset: 6}}>
      <Button type='primary'>一个没啥事件的常规按钮</Button>
    </FormItem>
  </BaseForm>
))