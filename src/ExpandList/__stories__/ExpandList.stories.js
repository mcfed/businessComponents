import React from 'react';
import {storiesOf} from '@storybook/react';
import {Input, message, Button} from 'antd';

import ExpandList from '../index';

const stories = storiesOf('ExpandList', module);
stories.addParameters({jest: ['ExpandList.spec.js']});

const renderItems = item => {
  return <div style={{paddingLeft: 20}}>{item.name}</div>;
};

stories.add('基础使用', () => (
  <ExpandList
    header={<div style={{paddingLeft: 20}}>姓名</div>}
    pageSize={10}
    fetchListUrl='https://guostz.github.io/Tuan/data.json'
    renderItems={renderItems}
  />
));

stories.add('加载更多', () => (
  <ExpandList
    header={<div style={{paddingLeft: 20}}>姓名</div>}
    pageSize={1}
    fetchListUrl='https://guostz.github.io/Tuan/data.json'
    renderItems={renderItems}
  />
));
