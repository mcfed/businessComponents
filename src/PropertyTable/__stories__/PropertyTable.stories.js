import React from 'react';
import {storiesOf} from '@storybook/react';
import PropertyTable from '../index';

const stories = storiesOf('PropertyTable', module);
stories.addParameters({jest: ['index.spec.js']});

const dataSource = [
  {label: '属性一', value: 1},
  {label: '属性二', value: 2},
  {label: '属性三', value: 3},
  {label: '属性四', value: 4},
  {label: '属性五', value: 5},
  {label: '属性六', value: 6}
];
stories.add('基础用法', () => <PropertyTable dataSource={dataSource} />);
