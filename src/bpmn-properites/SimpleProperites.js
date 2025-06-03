import React from 'react';
import {FormItem} from '@mcfed/components';
import {Select} from 'antd';

export function SimpleProperite(props) {
  return (
    <>
      {/* <FormItem label='节点Id'>
        <Input name='handler'></Input>
      </FormItem> */}
      <FormItem
        label='审批类型'
        options={[
          {label: '或签', value: '1'},
          {label: '会签', value: '2'}
        ]}>
        <Select name='approvalType'></Select>
      </FormItem>
    </>
  );
}
