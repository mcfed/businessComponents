import React, {Component, RefObject, ReactNode} from 'react';
import {Input} from 'antd';
import {InputProps} from 'antd/lib/input';

export interface VerifyCodeProps extends InputProps {}

export default class VerifyCode<
  P extends VerifyCodeProps,
  S = any
> extends Component<P, S> {
  inputRef: RefObject<Input>;

  constructor(props: P) {
    super(props);
    this.inputRef = React.createRef();
  }

  static defaultProps = {};

  focus() {
    this.inputRef.current && this.inputRef.current.focus();
  }

  renderAddon(): any {}

  render() {
    const {onChange, disabled, ...otherProps} = this.props;
    return (
      <Input
        className='verify-code'
        onChange={onChange}
        ref={this.inputRef}
        {...otherProps}
        addonAfter={this.renderAddon()}
      />
    );
  }
}
