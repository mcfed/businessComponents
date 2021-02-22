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

      let elementId = element.id;
      if (element.type === 'bpmn:UserTask') {
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
          'camunda:assignee': '${assignee1}'
        });

        // 自定义扩展属性
        let propertiesConifg = elementHelper.createElement(
          'bpmn:FormalExpression',
          {
            body: `{handler: ${data.handler}}`
          },
          extensionElements,
          bpmnFactory
        );
        let extensionElements = elementHelper.createElement(
          'bpmn:ExtensionElements',
          {
            values: [propertiesConifg]
          },
          element,
          bpmnFactory
        );

        extensionElements['properties'] = propertiesConifg;
        modeling.updateProperties(element, {
          extensionElements: extensionElements
        });
      }

      //自定义扩展属性
      // var customAttr = element.businessObject.extensionElements.values[0].body;
      for (var i in data) {
        const changeObj = {[i]: data[i]};
        modeling.updateProperties(element, changeObj);
      }
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
