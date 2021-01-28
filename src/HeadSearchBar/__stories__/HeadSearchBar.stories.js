import React from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker, Select } from 'antd';
import HeadSearchBar from '../index';
import FormItem from '../../FormItem/index';
import WrapperDatePicker from '../../WrapperDatePicker/index';
import InputSearch from '../../InputSearch/index'

const stories = storiesOf('HeadSearchBar', module);
stories.addParameters({ jest: ['index.spec.js'] });

stories.add('基础使用', () => (
  <HeadSearchBar showSearchButton={false}>
    <FormItem name='inputSearch' label='搜索框'>
      <InputSearch enterButton />
    </FormItem>
    <FormItem name='begin' label='开始日期'>
      <WrapperDatePicker format='YYYY-MM-DD'>
        <DatePicker
          format='YYYY-MM-DD'
          allowClear
        />
      </WrapperDatePicker>
    </FormItem>
    <FormItem name='end' label='结束日期'>
      <WrapperDatePicker format='YYYY-MM-DD'>
        <DatePicker
          format='YYYY-MM-DD'
          allowClear
        />
      </WrapperDatePicker>
    </FormItem>
    <FormItem
      name='select'
      label='下拉框'
      options={[{value: 1, label: '第一个标签'}, {value: 2, label: '第二个标签'}, {value: 3, label: '第三个标签'}]}>
      <Select
        defaultValue={2}
        allowClear></Select>
    </FormItem>
  </HeadSearchBar>
))
