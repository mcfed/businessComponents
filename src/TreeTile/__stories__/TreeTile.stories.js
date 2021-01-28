import React from 'react';
import {storiesOf} from '@storybook/react';
import Readme from '../README.md';
import TreeTile from '../index.tsx';
const stories = storiesOf('TreeTile', module);

stories.addParameters({jest: ['TreeTile.spec.js']});

const treeData = [
  {
    title: '基本信息',
    key: 'baseInfo',
    children: [
      {title: '姓名', key: '1name'},
      {title: '性别', key: '2sex'},
      {title: '年龄', key: '3age'},
      {title: '姓名', key: '4name'},
      {title: '性别', key: '5sex'},
      {title: '年龄', key: '6age'},
      {title: '姓名', key: '7name'},
      {title: '性别', key: '8sex'},
      {title: '年龄', key: '9age'},
      {title: '姓名', key: '10name'},
      {title: '性别', key: '11sex'},
      {title: '年龄', key: '12age'},
      {title: '姓名', key: '13name'},
      {title: '性别', key: '14sex'},
      {title: '年龄', key: '15age'},
      {title: '姓名', key: '16name'},
      {title: '性别', key: '17sex'},
      {title: '年龄', key: '18age'},
      {title: '姓名', key: '19name'},
      {title: '性别', key: '20sex'},
      {title: '年龄', key: '21age'},
      {title: '姓名', key: '22name'},
      {title: '性别', key: '23sex'},
      {title: '年龄', key: '24age'}
    ]
  },
  {
    title: '证件信息',
    key: 'cardInfo',
    children: [
      {title: '身份证', key: 'idCard'},
      {title: '医保卡', key: 'uIdCard'},
      {title: '护照', key: 'passCard'}
    ]
  }
];

stories.add(
  '基础用法',
  () => {
    return <TreeTile dataSource={treeData} title={'请选择XXXX'} />;
  },
  {notes: {markdown: Readme}}
);
