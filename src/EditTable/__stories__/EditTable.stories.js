import React, {PropTypes} from 'react';
import {storiesOf} from '@storybook/react';
import {Button, Input, Select, InputNumber} from 'antd';
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import {actions} from '@storybook/addon-actions';
import {withSmartKnobs} from 'storybook-addon-smart-knobs';
import md from '../README.md';

import EditTable from '../index';

const ButtonGroup = Button.Group;
const Option = Select.Option;
const stories = storiesOf('EditTable', module);
stories.addParameters({jest: ['EditTable.spec.js']});

const tableConf = {
  onChange: data => {
    console.log('onchange', data);
  },
  data: [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      sex: '1',
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      sex: '1',
      address: '西湖区湖底公园1号'
    },
    {
      key: '3',
      name: '胡彦黑',
      age: 92,
      sex: '1',
      address: '西湖区湖底公园1号'
    },
    {
      key: '4',
      name: '胡彦哈',
      age: 22,
      sex: '1',
      address: '西湖区湖底公园1号'
    },
    {
      key: '5',
      name: '胡彦额',
      age: 45,
      sex: '1',
      address: '西湖区湖底公园1号'
    }
  ],
  columns: [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      editComponent: () => <Input />,
      editConfig: {
        rules: [
          {
            required: true
          }
        ]
      }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      editComponent: () => (
        <Select>
          <Option value='1'>男</Option>
          <Option value='2'>女</Option>
        </Select>
      ),
      render: (text, row) => {
        if (text === '1') {
          return '男';
        } else if (text === '2') {
          return '女';
        }
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      editComponent: (text, row, instance, form) => {
        if (form.getFieldValue('sex') === '2') {
          return <InputNumber />;
        } else {
          return <Input />;
        }
      },
      editConfig: {}
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '操作',
      dataIndex: '操作',
      editComponent: (text, row, instance, form) => {
        return (
          <ButtonGroup>
            <Button onClick={() => instance.save(form, row.key)}>save</Button>
            <Button onClick={() => instance.cancel(form, row.key)}>
              cancel
            </Button>
          </ButtonGroup>
        );
      },
      render: (text, row, instance, form) => {
        return (
          <ButtonGroup>
            <Button onClick={() => instance.edit(row.key)}>edit</Button>
            <Button onClick={() => instance.delete(row.key)}>delete</Button>
          </ButtonGroup>
        );
      }
    }
  ]
};

stories.add(
  '基础使用',
  () => {
    return <EditTable {...tableConf} />;
  },
  {notes: {markdown: md}}
);

stories.add(
  '全编辑表格',
  () => {
    return <EditTable {...tableConf} mode={'full'} />;
  },
  {notes: {markdown: md}}
);
