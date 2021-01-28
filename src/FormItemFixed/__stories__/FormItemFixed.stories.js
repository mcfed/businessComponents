import React from 'react';
import {InputNumber, Input} from 'antd';
import {storiesOf} from '@storybook/react';
import FormItemFixed from '../index';
import FormItem from '../../FormItem/index';
import BaseForm from '../../BaseForm/index';
const stories = storiesOf('FormItemFixed', module);
stories.addParameters({jest: ['index.spec.js']});

stories.add('基础用法', () => {
  return (
    <BaseForm>
      <FormItem label='第一个输入框' name='input1' defaultValue='默认值填入'>
        <FormItemFixed style={{color: 'red'}} isResetCss={false}>
          <InputNumber /> <span>厘米</span>
        </FormItemFixed>
      </FormItem>
    </BaseForm>
  );
});
