import React from 'react';
import {storiesOf} from '@storybook/react';
import Properites from '../properites';
import {FormItem, Panel} from '@mcfed/components';
import {Input} from 'antd';

const stories = storiesOf('bpmn-properites', module);

function simpleProperite() {
  return (
    <Panel>
      <FormItem label='节点Id'>
        <Input name='node'></Input>
      </FormItem>
      <FormItem label='审批类型'>
        <Select
          options={[
            {label: '或签', value: '0'},
            {label: '会签', value: '1'}
          ]}></Select>
      </FormItem>
      <FormItem label='审批人员'>
        <Select
          options={[
            {label: '或签', value: '0'},
            {label: '会签', value: '1'}
          ]}></Select>
      </FormItem>
    </Panel>
  );
}

stories.add('基础使用', () => {
  return (
    <Properites title='属性面板'>
      <simpleProperite></simpleProperite>
    </Properites>
  );
});
