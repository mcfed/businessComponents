import React from 'react';
import {storiesOf} from '@storybook/react';
import {Input, message, Button} from 'antd';

import BaseForm from '../index';
import FormItem from '../../FormItem/index';

const stories = storiesOf('BaseForm', module);
stories.addParameters({jest: ['index.spec.js']});

stories.add('基础使用', () => (
  <BaseForm
    itemLayout={{
      labelCol: {span: 3},
      wrapperCol: {span: 21}
    }}
    onSubmit={e => {
      e.preventDefault();
    }}>
    <FormItem label='测试1' name='test1' defaultValue='666666'>
      <Input />
    </FormItem>
    <FormItem label='test2' name='test2'>
      <Input />
    </FormItem>
    <FormItem label='test3' name='test3'>
      <Input />
    </FormItem>
    <FormItem name='btn' wrapperCol={{offset: 3}}>
      <Button htmlType='submit'>提交</Button>
    </FormItem>
  </BaseForm>
));
