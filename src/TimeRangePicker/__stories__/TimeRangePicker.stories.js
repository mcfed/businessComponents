import React from 'react';
import {message} from 'antd';
import {storiesOf} from '@storybook/react';
import TimeRangePicker from '../index';
import CustomButton from '../../ButtonGroups/Button';
import ButtonGroups from '../../ButtonGroups';
const stories = storiesOf('TimeRangePicker', module);

stories.add('基础用法', () => {
  return (
    <div>
      <TimeRangePicker
        onChange={value => {
          message.info(`你选择的时间为：${value}`);
        }}></TimeRangePicker>
    </div>
  );
});
