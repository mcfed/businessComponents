import React, {useEffect, useRef, useCallback} from 'react';
import {BaseForm, Panel} from '@mcfed/components';

export function Properites(props) {
  const formRef = useRef();
  useEffect(
    function() {
      formRef.current && formRef.current.setFields(props.values);
    },
    [props.values]
  );

  const handlerOK = function() {
    console.log('click');
    formRef.current.validateFieldsAndScroll({force: true}, (err, values) => {
      if (err) {
        return;
      }
      console.log('values');
      props.onChagne(values);
    });
  };
  return (
    <Panel title={props.title} onOK={handlerOK}>
      <BaseForm ref={formRef}>{props.children}</BaseForm>
    </Panel>
  );
}
