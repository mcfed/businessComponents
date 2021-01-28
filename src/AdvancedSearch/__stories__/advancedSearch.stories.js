import React from 'react';
import {Input, Select} from 'antd';
import {storiesOf} from '@storybook/react';
import AdvancedSearch from '../index';
import {actions} from '@storybook/addon-actions';
import Readme from '../README.md';

const stories = storiesOf('AdvancedSearch', module);
const eventsFromNames = actions('onClick', 'onMouseOver');

stories.addParameters({jest: ['AdvancedSearch.spec.js']});

stories.add(
  '基础用法',
  () => (
    <AdvancedSearch {...eventsFromNames}>
      <Input name='name' label='姓名' />
    </AdvancedSearch>
  ),
  {notes: {markdown: Readme}}
);
stories.add(
  '更多查询项时出现扩展',
  () => (
    <AdvancedSearch {...eventsFromNames}>
      <Input name='name' label='姓名' />
      <Select name='type' label='类型' />
      <Select name='level' label='级别' />
      <Select name='sex' label='性别' />
    </AdvancedSearch>
  ),
  {notes: {markdown: Readme}}
);
