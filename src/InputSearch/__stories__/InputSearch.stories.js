import React from 'react';
import {storiesOf} from '@storybook/react';
import {Select} from 'antd';
import InputSearch from '../index';
import HeadSearchBar from '../../HeadSearchBar';
import FormItem from '../../FormItem';
import {actions} from '@storybook/addon-actions';

const stories = storiesOf('InputSearch', module);
const eventsFromNames = actions('onClick', 'onMouseOver');

function handleFilter(val) {
  console.log(val, 123);
}

stories.add('基础用法', () => (
  <HeadSearchBar showSearchButton={false} filterSubmitHandler={handleFilter}>
    <FormItem name='name' label='姓名'>
      <InputSearch enterButton />
    </FormItem>
    <FormItem
      name='status'
      label='abc'
      options={[
        {label: 1, value: 1},
        {label: 3, value: 3}
      ]}>
      <Select allowClear></Select>
    </FormItem>
  </HeadSearchBar>
));
