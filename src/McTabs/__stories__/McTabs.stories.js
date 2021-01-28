import React, {PropTypes} from 'react';
import {storiesOf} from '@storybook/react';
import {Input, Button} from 'antd';
import BaseForm from '../../BaseForm';
import FormItem from '../../FormItem';
import Panel from '../../Panel';
// import md from "../README.md";

import McTabs from '../index';

const stories = storiesOf('McTabs', module);
stories.addParameters({jest: ['McTabs.spec.js']});

class Form1 extends React.Component {
  saveFormRef(form) {
    this.form = form;
  }
  render() {
    return (
      <BaseForm ref={this.saveFormRef.bind(this)} name='tab1'>
        <FormItem
          label='form1'
          name='form1'
          defaultValue=''
          rules={[
            {
              required: true,
              message: '必填1'
            }
          ]}>
          <Input />
        </FormItem>
        <FormItem
          label='form2'
          name='form2'
          defaultValue=''
          rules={[
            {
              required: true,
              message: '必填2'
            }
          ]}>
          <Input />
        </FormItem>
      </BaseForm>
    );
  }
}
class Form2 extends React.Component {
  saveFormRef(form) {
    this.form = form;
  }
  render() {
    return (
      <BaseForm ref={this.saveFormRef.bind(this)} name='tab2'>
        <FormItem
          label='form2'
          name='form2'
          defaultValue=''
          rules={[
            {
              required: true,
              message: '必填2'
            }
          ]}>
          <Input />
        </FormItem>
      </BaseForm>
    );
  }
}
class Form3 extends React.Component {
  saveFormRef(form) {
    this.form = form;
  }
  render() {
    return (
      <BaseForm ref={this.saveFormRef.bind(this)} name='tab3'>
        <FormItem
          label='form3'
          name='form3'
          defaultValue=''
          rules={[
            {
              required: true,
              message: '必填3'
            }
          ]}>
          <Input />
        </FormItem>
      </BaseForm>
    );
  }
}

const defaultActiveKey = 'tab3';
const tabsData = [
  {
    text: '泰波一',
    name: 'tab1',
    component: Form1
    // disabled: true
  },
  {
    text: '泰波二',
    name: 'tab2',
    // disabled: true,
    component: Form2
  },
  {
    text: '泰波三',
    name: 'tab3',
    disabled: true,
    component: Form3
  }
];

// class Dom extends React.Component {
//   constructor() {
//     super();
//     this.myRef = React.createRef();
//   }
//   handleCancel() {
//     // this.props.history.push('/')
//     console.log("cancel");
//   }
//   handleGonext() {
//     // this.props.goRoutes('/')
//     console.log("gonext");
//   }
//   callback(e) {
//     console.log("切换到了" + e);
//   }
//   handleSubmit(values) {
//     console.log(values);
//   }
//   renderFooter() {
//     return (
//       <React.Fragment>
//         <Button
//           type="primary"
//           onClick={() => this.myRef.current.handleSubmit()}
//         >
//           保存
//         </Button>
//         <Button type="primary" onClick={this.handleGonext.bind(this)}>
//           下一步
//         </Button>
//         <Button onClick={this.handleCancel.bind(this)}>取消</Button>
//       </React.Fragment>
//     );
//   }
//   render() {
//     return (
//       <Panel footer={this.renderFooter.bind(this)}>
//         <McTabs
//           defaultActiveKey={defaultActiveKey} // 可以识别name和index
//           onChange={this.callback.bind(this)}
//           tabsData={tabsData}
//           handleSubmit={this.handleSubmit.bind(this)}
//           ref={this.myRef}
//         />
//       </Panel>
//     );
//   }
// }

stories.add(
  '基础使用',
  () => {
    const myRef = React.createRef();
    const handleCancel = () => {
      // this.props.history.push('/')
      console.log('cancel');
    };
    const handleGonext = () => {
      // this.props.goRoutes('/')
      console.log('gonext');
    };
    const callback = e => {
      console.log('切换到了' + e);
    };
    const handleSubmit = values => {
      console.log(values);
    };
    const renderFooter = () => {
      return (
        <React.Fragment>
          <Button type='primary' onClick={() => myRef.current.handleSubmit()}>
            保存
          </Button>
          <Button type='primary' onClick={handleGonext}>
            下一步
          </Button>
          <Button onClick={handleCancel}>取消</Button>
        </React.Fragment>
      );
    };
    return (
      <Panel footer={renderFooter}>
        <McTabs
          defaultActiveKey={defaultActiveKey} // 可以识别name和index
          onChange={callback}
          tabsData={tabsData}
          handleSubmit={handleSubmit}
          ref={myRef}
        />
      </Panel>
    );
  }
  //   { notes: { markdown: md } }
);
