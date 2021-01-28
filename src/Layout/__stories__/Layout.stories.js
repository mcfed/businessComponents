import React from 'react';
import {Input} from 'antd';
import {storiesOf} from '@storybook/react';
import Layout, {Fixed, Pane} from '../index';

const stories = storiesOf('Layout', module);
stories.addParameters({jest: ['index.spec.js']});

const layoutStyle = {
  border: '1px solid',
  padding: 10
};

const columnStyle = {
  marginTop: 10
};

const rowStyle = {
  marginLeft: 10
};

stories.add('基础用法', () => (
  <Layout style={layoutStyle}>
    <Input style={columnStyle} placeholder='第一个输入框' />
    <Input style={columnStyle} placeholder='第二个输入框' />
    <Input style={columnStyle} placeholder='第三个输入框' />
  </Layout>
));

stories.add('垂直排列', () => (
  <Layout direction='row' style={layoutStyle}>
    <Input style={rowStyle} placeholder='第一个输入框' />
    <Input style={rowStyle} placeholder='第二个输入框' />
    <Input style={rowStyle} placeholder='第三个输入框' />
    <Input style={rowStyle} placeholder='第四个输入框' />
    <Input style={rowStyle} placeholder='第五个输入框' />
    <Input style={rowStyle} placeholder='第六个输入框' />
    <Input style={rowStyle} placeholder='第七个输入框' />
    <Input style={rowStyle} placeholder='第八个输入框' />
    <Input style={rowStyle} placeholder='第九个输入框' />
    <Input style={rowStyle} placeholder='第十个输入框' />
  </Layout>
));

stories.add('Fixed', () => (
  <Fixed style={layoutStyle}>
    <Input style={columnStyle} placeholder='第一个输入框' />
    <Input style={columnStyle} placeholder='第二个输入框' />
    <Input style={columnStyle} placeholder='第三个输入框' />
    <Input style={columnStyle} placeholder='第四个输入框' />
    <Input style={columnStyle} placeholder='第五个输入框' />
  </Fixed>
));

stories.add('Pane 绝对定位排列', () => (
  <Pane>
    <Input
      style={{position: 'absolute', left: 10, top: 0}}
      placeholder='第一个输入框'
    />
    <Input
      style={{position: 'absolute', left: 10, top: 40}}
      placeholder='第二个输入框'
    />
    <Input
      style={{position: 'absolute', left: 10, top: 80}}
      placeholder='第三个输入框'
    />
    <Input
      style={{position: 'absolute', left: 10, top: 120}}
      placeholder='第四个输入框'
    />
    <Input
      style={{position: 'absolute', left: 10, top: 160}}
      placeholder='第五个输入框'
    />
  </Pane>
));
