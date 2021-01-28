import React from 'react';
import {storiesOf} from '@storybook/react';
import {Input} from 'antd';

import ErrorBoundary from '../index';

const stories = storiesOf('ErrorBoundary', module);
stories.addParameters({jest: ['index.spec.js']});

stories.add('基础使用', () => (
  <ErrorBoundary>
    <Input>-</Input>
  </ErrorBoundary>
));

stories.add('不抛错', () => (
  <ErrorBoundary>
    <Input placeholder='这是一个输入框' />
  </ErrorBoundary>
));
