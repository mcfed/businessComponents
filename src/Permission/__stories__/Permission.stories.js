import React from 'react';
import {InputNumber, Input, Button} from 'antd';
import {storiesOf} from '@storybook/react';
import Permission from '../index';
import FormItem from '../../FormItem/index';
import BaseForm from '../../BaseForm/index';
const stories = storiesOf('Permission', module);
import Readme from '../index.md';

stories.add(
  '基础用法',
  () => {
    const canClick = () => {
      alert('当expression为true的时候，你才能看见我这个按钮啊');
    };
    const canNotClick = () => {
      alert('点击2');
    };
    return (
      <div>
        <Permission expression={true}>
          <Button type='primary' onClick={canClick}>
            可以点击的按钮事件
          </Button>
        </Permission>
        <Permission expression={false}>
          <Button type='primary' onClick={canNotClick}>
            看不见点击的按钮事件
          </Button>
        </Permission>
      </div>
    );
  },
  {notes: {markdown: Readme}}
);
