import React from 'react';
import {Button} from 'antd';
import {storiesOf} from '@storybook/react';
import Step from '../index';
import Readme from '../README.md';
import {action} from '@storybook/addon-actions';

const stories = storiesOf('Step', module);

stories.addParameters({jest: ['Step.spec.js']});

class First extends React.Component {
  onSubmit() {
    this.props.goToStep(2);
  }
  render() {
    return 'i am First step';
  }
}

class Second extends React.Component {
  onSubmit() {
    this.props.goToStep(3);
  }
  render() {
    return 'i am Second step';
  }
}

class Third extends React.Component {
  onSubmit() {}
  render() {
    return 'i am Third step';
  }
}

const Steps = [
  {
    text: '第一步',
    description: '我是第一步',
    path: 'first',
    component: First
  },
  {
    text: '第二步',
    description: '我是第二步',
    path: 'second',
    component: Second
  },
  {
    text: '第三步',
    description: '我是第三步',
    path: 'third',
    component: Third
  }
];

stories.add(
  '基础用法',
  () => {
    return (
      <React.Fragment>
        这是一个基础的step用法示例
        <Step steps={Steps} showCancel={currentIndex => currentIndex === 0} />
      </React.Fragment>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  '不展示上一步操作',
  () => {
    return (
      <React.Fragment>
        这是一个不展示上一步按钮step用法示例
        <Step steps={Steps} showPrev={false} />
      </React.Fragment>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  '隐藏取消按钮用法',
  () => {
    return (
      <React.Fragment>
        隐藏取消按钮用法
        <Step showCancel={false} steps={Steps} />
      </React.Fragment>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  '取消按钮文字自定义',
  () => {
    return (
      <React.Fragment>
        取消按钮文字自定义
        <Step cancelText={'点击取消'} steps={Steps} />
      </React.Fragment>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  '最后一步完成按钮文字自定义',
  () => {
    return (
      <React.Fragment>
        最后一步完成按钮文字自定义
        <Step finishText={'点击完成'} steps={Steps} />
      </React.Fragment>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  '隐藏最后一步的上一步按钮',
  () => {
    return (
      <React.Fragment>
        隐藏最后一步的上一步按钮
        <Step showFinalLastStep={false} steps={Steps} />
      </React.Fragment>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  '最后一步完成的响应方法名自定义',
  () => {
    return (
      <React.Fragment>
        最后一步完成的响应方法名自定义
        <Step finalSubmitFunctionName={'mysubmit'} steps={Steps} />
      </React.Fragment>
    );
  },
  {notes: {markdown: Readme}}
);

stories.add(
  '取消按钮跳转的路由自定义',
  () => {
    return (
      <React.Fragment>
        取消按钮跳转的路由自定义
        <Step backPath={'/index'} steps={Steps} />
      </React.Fragment>
    );
  },
  {notes: {markdown: Readme}}
);
