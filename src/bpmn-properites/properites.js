import React, {useEffect, useRef, useCallback} from 'react';
import {BaseForm, Panel} from '@mcfed/components';
import {Button} from 'antd';

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
