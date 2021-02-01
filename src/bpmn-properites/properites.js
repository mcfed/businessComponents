import React, {useRef} from 'react';
import {BaseForm, ButtonGroups} from '@mcfed/components';
import {Button} from 'antd';

export function Properites(props) {
  const formRef = useRef();
  function handleSure() {
    formRef.current.form.validateFieldsAndScroll(
      {force: true},
      (err, values) => {
        if (err) {
          return;
        }
        //   this.handleSubmit(values);
        props.onChange(value);
      }
    );
  }
  return (
    <div class='properites-container'>
      <div class='proerites-header'>
        <h3 class='properites-title'>{props.title}</h3>
      </div>
      <div class='proerites-body'>
        <BaseForm ref={formRef}>{props.children}</BaseForm>
      </div>
      <div class='proerites-footer'>
        <ButtonGroups>
          <Button onClick={handleSure}>确定</Button>
          <Button>关闭</Button>
        </ButtonGroups>
      </div>
    </div>
  );
}
