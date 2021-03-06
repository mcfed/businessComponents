import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {storiesOf} from '@storybook/react';
import {Button} from 'antd';
import {diagramXML} from '../sources/xml';
import McBpmn from '../index';
import {Properites} from '../../bpmn-properites/properites';
import {SimpleProperite} from '../../bpmn-properites/SimpleProperites';

import '../style/index';
const stories = storiesOf('Bpmn', module);

let Modeler = null;

stories.add('基础使用', () => {
  function initPanel(bpmnModeler, container) {
    Modeler = bpmnModeler;
    bpmnModeler.on('selection.changed', e => {
      if (e.newSelection && e.newSelection.length) {
        let element = e.newSelection[0];
        let values = [];
        if (e.newSelection[0].businessObject.extensionElements) {
          let extensionElementsVal =
            e.newSelection[0].businessObject.extensionElements.values[0].values;
          values = extensionElementsVal;
        }
        ReactDOM.render(
          <Properites
            element={element}
            bpmnModeler={bpmnModeler}
            values={values}>
            <SimpleProperite></SimpleProperite>
          </Properites>,
          container
        );
      } else {
        ReactDOM.render(<span></span>, container);
      }
    });
  }

  function submit() {
    Modeler.saveXML({format: true}, (err, data) => {
      console.log(data);
    });
  }
  return (
    <div>
      <McBpmn
        xmlData={null}
        initPanel={initPanel}
        width={'100%'}
        height={'100vh'}
      />
      <Button type='primary' onClick={submit}>
        提交
      </Button>
    </div>
  );
});

stories.add('只读查看模式', () => {
  function initPanel(bpmnModeler, container) {
    Modeler = bpmnModeler;
    bpmnModeler.on('selection.changed', e => {
      if (e.newSelection && e.newSelection.length) {
        let element = e.newSelection[0];
        let values = [];
        if (e.newSelection[0].businessObject.extensionElements) {
          let extensionElementsVal =
            e.newSelection[0].businessObject.extensionElements.values[0].values;
          values = extensionElementsVal;
        }
        ReactDOM.render(
          <Properites
            element={element}
            bpmnModeler={bpmnModeler}
            values={values}>
            <SimpleProperite></SimpleProperite>
          </Properites>,
          container
        );
      } else {
        ReactDOM.render(<span></span>, container);
      }
    });
  }

  return (
    <McBpmn
      xmlData={diagramXML}
      initPanel={initPanel}
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
      runState: 'PENDING'
    },
    {
      id: 'Activity_0irvtx6',
      runState: 'APPROVAL'
    },
    {
      id: 'Activity_1obf0qd',
      runState: 'FORWARD'
    },
    {
      id: 'Activity_1hqlmun',
      runState: 'REJECT'
    },
    {
      id: 'Event_1s0mtxb',
      runState: 'REFUSED'
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

  return (
    <McBpmn
      xmlData={diagramXML}
      initPanel={initPanel}
      runNodes={runNodes}
      readonly={true}
      width={'100%'}
      height={'100vh'}
    />
  );
});
