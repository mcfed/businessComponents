import React, {ReactNode} from 'react';
import {Button} from 'antd';
import VerifyCode, {VerifyCodeProps} from './VerifyCode';

export interface PhoneServiceVerifyProps extends VerifyCodeProps {
  /**
   * 设置按钮名字
   */
  title?: string;
  /**
   * 设置多久间隔才可以再次点击
   */
  interval?: number;
  /**
   * 点击按钮之后调用的回调函数
   */
  retry?: Function;
  /**
   * 是否可点击按钮
   */
  disabled?: boolean;
}

export interface PhoneServiceVerifyState {
  timer?: NodeJS.Timeout;
  countdown?: number;
}

export class PhoneServiceVerifyCode extends VerifyCode<
  PhoneServiceVerifyProps,
  PhoneServiceVerifyState
> {
  static defaultProps = {
    interval: 60
  };

  state: PhoneServiceVerifyState = {
    timer: undefined,
    countdown: undefined
  };

  handleClick() {
    if (this.state.countdown) return;
    const {retry, interval} = this.props;
    retry && retry();
    this.setState({
      countdown: interval
    });
    const timer = setInterval(() => {
      if (this.state.countdown) {
        this.setState(({countdown}) => ({
          countdown: (countdown as number) - 1
        }));
      } else if (this.state.timer) {
        clearInterval(this.state.timer);
      }
    }, 1000);
    this.setState({timer});
  }

  renderAddon(): ReactNode {
    const {countdown} = this.state;
    const {title = '发送', disabled = false} = this.props;
    if (countdown) {
      return <Button className='sms-btn' disabled>{`${countdown}s`}</Button>;
    }
    return (
      <Button
        type='default'
        className='sms-btn'
        disabled={disabled}
        onClick={this.handleClick.bind(this)}>
        {title}
      </Button>
    );
  }
}
