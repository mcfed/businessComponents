import React from 'react';
import {storiesOf} from '@storybook/react';
import Ellipsis from '../index';
import Readme from '../README.md';
import {action} from '@storybook/addon-actions';

const stories = storiesOf('Ellipsis', module);

stories.addParameters({jest: ['Ellipsis.spec.js']});

stories.add(
  '基础用法',
  () => {
    return <Ellipsis text={'这是一个Ellipsis基础用法接收的text'} />;
  },
  {notes: {markdown: Readme}}
);

stories.add(
  'text值与鼠标移上时不同',
  () => {
    return (
      <Ellipsis
        text={'这是一个Ellipsis基础用法接收的text'}
        tooltiptext={'这是一个tooltiptext扩展用法自定义的tooltiptext值'}
      />
    );
  },
  {notes: {markdown: Readme}}
);
