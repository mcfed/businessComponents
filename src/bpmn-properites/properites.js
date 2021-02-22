import React, {useEffect, useRef, useCallback} from 'react';
import {BaseForm, Panel} from '@mcfed/components';
import {Button, message} from 'antd';
import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';

export function Properites(props) {
  const formRef = useRef();
  const {values, bpmnModeler, element} = props;

  useEffect(
    function() {
      if (values) {
        for (var i in values) {
          const obj = {[i]: values[i]};
          formRef.current && formRef.current.setFieldsValue(obj);
        }
      }
    },
    [props.values]
  );

  const handlerOK = function(props) {
    formRef.current.validateFieldsAndScroll({force: true}, (err, data) => {
      if (err) {
        return;
      }
      const modeling = bpmnModeler.get('modeling');
      const moddle = bpmnModeler.get('moddle');
      const bpmnFactory = bpmnModeler.get('bpmnFactory');

      if (element.type === 'bpmn:UserTask') {
        let elementId = element.id;
        const loopCharacteristics = moddle.create(
          'bpmn:MultiInstanceLoopCharacteristics'
        );
        let typeText = null;
        if (data.approvalType == 1) {
          //或签
          typeText = '${nrOfCompletedInstances/nrOfInstances > 0 }';
        }
        if (data.approvalType == 2) {
          //会签
          typeText = '${nrOfCompletedInstances/nrOfInstances >= 1 }';
        }
        let completionCondition = elementHelper.createElement(
          'bpmn:FormalExpression',
          {
            body: `${typeText}`
          },
          loopCharacteristics,
          bpmnFactory
        );
        loopCharacteristics['completionCondition'] = completionCondition;
        loopCharacteristics['collection'] = elementId;
        loopCharacteristics['elementVariable'] = 'assignee';
        loopCharacteristics['isSequential'] = 'false';
        modeling.updateProperties(element, {
          loopCharacteristics: loopCharacteristics
        });
        modeling.updateProperties(element, {
          'camunda:assignee': '${assignee}'
        });

        let experession = moddle.create('bpmn:FormalExpression', {
          body: `{"approvalType": "${data.approvalType}"}`
        });
        modeling.updateProperties(element, {extensionElements: experession});
      }

      let allElement = bpmnModeler.get('elementRegistry').getAll();
      allElement.map(item => {
        if (item.businessObject.$attrs && item.businessObject.$attrs.id) {
          delete item.businessObject.$attrs.id;
        }
      });
      // 查看输出XML
      bpmnModeler.saveXML({format: true}, (err, data) => {
        console.log(data);
        // download('xml', data);
      });
    });
  };

  const download = function(type, data, name) {
    let dataTrack = '';
    const a = document.createElement('a');

    switch (type) {
      case 'xml':
        dataTrack = 'bpmn';
        break;
      case 'svg':
        dataTrack = 'svg';
        break;
      default:
        break;
    }

    name = name || `diagram.${dataTrack}`;

    a.setAttribute(
      'href',
      `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
    );
    a.setAttribute('target', '_blank');
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`);
    a.setAttribute('download', name);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div>
      <BaseForm ref={formRef}>{props.children}</BaseForm>
      <Button type='primary' onClick={handlerOK}>
        确定
      </Button>
    </div>
  );
}
