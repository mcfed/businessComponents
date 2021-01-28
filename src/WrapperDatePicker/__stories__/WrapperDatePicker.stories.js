import React from 'react';
import { storiesOf } from '@storybook/react';
import WrapperDatePicker from '../index';
import { DatePicker, message, RangePicker } from 'antd';

const stories = storiesOf('WrapperDatePicker', module);
stories.addParameters({ jest: ['index.spec.js'] });

stories.add('基础使用', () => (
  <WrapperDatePicker
    format='YYYY-MM-DD'
    timeRange={false}
    timeRangeType='day'
    onChange={value => { message.info(`你选择的时间为：${value}`); }}>
    <DatePicker
      format='YYYY-MM-DD'
      allowClear
    />
  </WrapperDatePicker>
));