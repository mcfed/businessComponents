import React from 'react';
import {Button} from 'antd';
import {storiesOf} from '@storybook/react';
import Panel from '../index';
import Readme from '../README.md';
import {action} from '@storybook/addon-actions';

const stories = storiesOf('Panel', module);

stories.addParameters({jest: ['Panel.spec.js']});

stories.add(
  '基础用法',
  () => {
    return (
      <Panel title={'基础panel用法示例'}>这是一个基础的panel用法示例</Panel>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  'footer自定义用法',
  () => {
    return (
      <Panel
        title={'footer自定义用法示例'}
        footer={() => (
          <Button type='primary' onClick={action('handleCancel')}>
            返回
          </Button>
        )}>
        添加自定义的footer用法示例
      </Panel>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  'confirmLoading用法',
  () => {
    return (
      <Panel title={'confirmLoading用法示例'} confirmLoading={true}>
        添加自定义的footer用法示例,loading时不允许点击确定进行提交操作
      </Panel>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  '按钮事件自定义用法',
  () => {
    return (
      <Panel
        title={'按钮事件自定义用法示例'}
        onOK={action('onOK')}
        onCancel={action('onCancel')}>
        添加自定义的onOK和onCancel按钮事件自定义用法示例,点击确定和取消时响应自定义的事件
      </Panel>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  'loading加载时用法',
  () => {
    return (
      <Panel title={'loading加载时用法示例'} loading={true}>
        loading设置为true时，整个面板处于loading状态，全部不能操作
      </Panel>
    );
  },
  {notes: {markdown: Readme}}
);
