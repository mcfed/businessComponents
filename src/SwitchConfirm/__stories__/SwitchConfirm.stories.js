import React from 'react';
import {storiesOf} from '@storybook/react';
import SwitchConfirm from '../index';

import md from '../README.md';

const stories = storiesOf('SwitchConfirm', module);
stories.addParameters({jest: ['SwitchConfirm.spec.js']});

stories.add(
  '基础使用',
  () => {
    let onConfirm = function(status, callback) {
      console.log(status);
      callback();
    };
    return (
      <SwitchConfirm
        uncheckedOption='OFF'
        checkedOption='ON'
        checkedChildren='ON'
        unCheckedChildren='OFF'
        currentOption={status}
        modalConfirmProps={{
          title: '这是一个简单的开关确认弹窗',
          content: '点击确认，改变窗口状态；点击取消，那就取消了',
          okText: '确认',
          cancelText: '取消'
        }}
        onConfirm={onConfirm}
      />
    );
  },
  {notes: {markdown: md}}
);
