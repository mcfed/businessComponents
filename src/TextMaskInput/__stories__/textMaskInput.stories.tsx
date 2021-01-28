import React from 'react';
import {storiesOf} from '@storybook/react';
import TextMaskInput from '../index';
import HeadSearchBar from '../../HeadSearchBar';
import FormItem from '../../FormItem';
import Readme from '../README.md';
import {action} from '@storybook/addon-actions';

const stories = storiesOf('TextMaskInput', module);

function handleFilter(value) {
  console.log(value);
}

stories.addParameters({jest: ['TextMaskInput.spec.js']});

stories.add('基本用法', () => {
  return (
    <HeadSearchBar showSearchButton={false} filterSubmitHandler={handleFilter}>
      <FormItem name='phone' label='数字'>
        <TextMaskInput
          maskType='phone'
          onChange={e =>
            console.log(e.target.value, 'onchange-console-phone')
          }></TextMaskInput>
      </FormItem>
      <FormItem name='email' label='邮件'>
        <TextMaskInput
          maskType='email'
          onChange={e =>
            console.log(e.target.value, 'onchange-console-email')
          }></TextMaskInput>
      </FormItem>
      <FormItem name='date' label='日期'>
        <TextMaskInput
          maskType='date'
          onChange={e =>
            console.log(e.target.value, 'onchange-console-date')
          }></TextMaskInput>
      </FormItem>
      <FormItem name='ip' label='ip'>
        <TextMaskInput
          maskType='ip'
          onChange={e =>
            console.log(e.target.value, 'onchange-console-date')
          }></TextMaskInput>
      </FormItem>
    </HeadSearchBar>
  );
});
