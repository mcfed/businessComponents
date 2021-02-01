import React from 'react';
import ReactDOM from 'react-dom';
import {storiesOf} from '@storybook/react';

import {diagramXML} from '../sources/xml';
import McBpmn from '../index';
import {Properites} from '../../bpmn-properites/properites';
import {SimpleProperite} from '../../bpmn-properites/SimpleProperites';

const stories = storiesOf('Bpmn', module);

stories.add('基础使用', () => {
  function initPanel(bpmnModeler, container) {
    ReactDOM.render(
      <Properites title='属性面板'>
        <SimpleProperite></SimpleProperite>
      </Properites>,
      container
    );
  }
  function elementChange(value) {
    console.log(value);
  }

  return (
    <McBpmn
      xmlData={diagramXML}
      initPanel={initPanel}
      elementChange={elementChange}
      // getBpmn={this.getBpmn.bind(this)}
      // readonly={readonly}
      width={'100%'}
      height={'100vh'}
    />
  );
});

stories.add('只读查看模式', () => {
  function initPanel(bpmnModeler, container) {
    ReactDOM.render(
      <Properites title='属性面板'>
        <SimpleProperite></SimpleProperite>
      </Properites>,
      container
    );
  }
  function elementChange(value) {
    console.log(value);
  }

  return (
    <McBpmn
      xmlData={diagramXML}
      initPanel={initPanel}
      elementChange={elementChange}
      // getBpmn={this.getBpmn.bind(this)}
      readonly={true}
      width={'100%'}
      height={'100vh'}
    />
  );
});

stories.add('运行中模式', () => {
  const runNodes = [
    {
      id: 'Gateway_1b6xc5z',
      runState: 3
    },
    {
      id: 'Activity_0irvtx6',
      runState: 1
    },
    {
      id: 'Activity_1obf0qd',
      runState: 2
    },
    {
      id: 'Activity_1hqlmun',
      runState: 2
    }
  ];
  function initPanel(bpmnModeler, container) {
    ReactDOM.render(
      <Properites title='属性面板'>
        <SimpleProperite></SimpleProperite>
      </Properites>,
      container
    );
  }
  function elementChange(value) {
    console.log(value);
  }

  return (
    <McBpmn
      xmlData={diagramXML}
      initPanel={initPanel}
      runNodes={runNodes}
      elementChange={elementChange}
      // getBpmn={this.getBpmn.bind(this)}
      readonly={true}
      width={'100%'}
      height={'100vh'}
    />
  );
});
