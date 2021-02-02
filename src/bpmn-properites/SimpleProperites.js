import React, {useMemo} from 'react';
import {FormItem} from '@mcfed/components';
import {Input, Select} from 'antd';
import 'antd/dist/antd.css';

export function SimpleProperite(props) {
  return (
    <>
      <FormItem label='节点Id'>
        <Input name='handler'></Input>
      </FormItem>
      <FormItem
        label='审批类型'
        options={[
          {label: '或签', value: '1'},
          {label: '会签', value: '2'}
        ]}>
        <Select name='approvalType'></Select>
      </FormItem>
      {/* <FormItem
        label='审批人员'
        options={[
          {label: '或签', value: '0'},
          {label: '会签', value: '1'}
        ]}>
        <Select name='user'></Select>
      </FormItem> */}
    </>
  );
}
