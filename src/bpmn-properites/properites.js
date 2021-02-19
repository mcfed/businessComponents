import React, {useEffect, useRef, useCallback} from 'react';
import {BaseForm, Panel} from '@mcfed/components';
import {Button, message} from 'antd';

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
        loopCharacteristics['collection'] = elementId;
        loopCharacteristics['elementVariable'] = 'assignee';
        loopCharacteristics['isSequential'] = 'false';
        let typeText = null;
        if (data.approvalType == 1) {
          //或签
          typeText = '${nrOfCompletedInstances/nrOfInstances > 0 }';
        }
        if (data.approvalType == 2) {
          //会签
          typeText = '${nrOfCompletedInstances/nrOfInstances >= 1 }';
        }
        let completionCondition = moddle.create(
          'bpmn:FormalExpression',
          {
            body: `${typeText}`
          },
          loopCharacteristics,
          bpmnFactory
        );
        loopCharacteristics['completionCondition'] = completionCondition;
        modeling.updateProperties(element, {
          loopCharacteristics: loopCharacteristics
        });
        // 查看输出XML
        // bpmnModeler.saveXML({format: true}, (err, data) => {
        //   console.log(data);
        // });
      }
      for (var i in data) {
        const changeObj = {[i]: data[i]};
        modeling.updateProperties(element, changeObj);
      }
    });
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
