import React from 'react';
import {Input} from 'antd';
import {storiesOf} from '@storybook/react';
import FieldSet from '../index';
import Readme from '../README.md';
const stories = storiesOf('FieldSet', module);
stories.addParameters({jest: ['index.spec.js']});

stories.add(
  '基础用法',
  () => {
    return (
      <div>
        <FieldSet title='分组标题1'>
          <Input placeholder='Username' />
        </FieldSet>
        <FieldSet title='分组标题2'>
          <Input placeholder='value' />
        </FieldSet>
      </div>
    );
  },
  {notes: {markdown: Readme}}
);
