import React from 'react';
import MaskedInput from 'react-text-mask';
import {Input} from 'antd';
import masks from './mask';

type MaskTypes = 'phone' | 'email' | 'date' | 'ip';

interface IMaskedInput {
  props: any;
  setRef: Function;
  onBlur: Function;
  onChange: Function;
}

const maskRender = (ref: Function, props: any) => {
  const {
    defaultValue,
    onChange,
    onChangeField,
    mask,
    maskType,
    pipe,
    ...others
  } = props;
  return (
    <Input
      defaultValue={props.defaultValue}
      ref={input => ref(input && input.input)}
      onChange={event => {
        props.onChangeField && props.onChangeField(event);
      }}
      {...others}
    />
  );
};

class NewMaskedInput extends MaskedInput {
  render(this: IMaskedInput) {
    const {render, ...props} = this.props;
    return maskRender(this.setRef, {
      onBlur: this.onBlur,
      onChangeField: this.onChange,
      defaultValue: this.props.value,
      ...props
    });
  }
}

const MaskInput = ({maskType, ...others}: {maskType: MaskTypes}) => {
  //@ts-ignore
  return <NewMaskedInput {...masks[maskType || 'phone']} {...others} />;
};

export default MaskInput;
