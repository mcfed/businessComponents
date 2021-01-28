import * as React from 'react';
// import Button from 'antd/es/button';
import {
  NativeButtonProps,
  ButtonType,
  BaseButtonProps
} from 'antd/es/button/button';
import {Button} from 'antd';

type CustomButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    /**
     * 设置 button 原生的 type 值
     */
    htmlType?: 'submit' | 'reset' | 'button' | undefined;
    /**
     * click 事件的 handler
     */
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    /**
     * 按钮事件类型名称，用于事件分发区分
     */
    actionkey: string;
    /**
     * tip 提示性文字
     */
    tip?: string;
    /**
     * 二次确认弹出框内容
     */
    confirm?: string;
    /**
     * 二次确认弹出框标题
     */
    confirmTitle?: string;
    /**
     * 按钮是否可见
     */
    permission?: boolean;
    /**
     * 按钮禁用状态
     */
    disabled?: any;
    /**
     * 按钮禁用状态
     */
    needTooltip?: boolean;
    /**
     * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
     */
    href?: undefined;
  };

export default class CustomButton extends React.Component<CustomButtonProps> {
  render() {
    const {
      actionkey,
      tip,
      confirm,
      confirmTitle,
      permission,
      needTooltip,
      ...otherProps
    } = this.props;
    //@ts-ignore
    return <Button {...otherProps} href={undefined} />;
  }
}
