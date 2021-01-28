import * as React from 'react';
// import Button, {ButtonGroupProps} from 'antd/es/button';
// import Tooltip from 'antd/es/tooltip';
// import Menu from 'antd/es/menu';
// import Icon from 'antd/es/icon';
// import Dropdown from 'antd/es/dropdown';
// import Modal, {ModalFuncProps} from 'antd/es/modal';
import {ButtonGroupProps} from 'antd/es/button';
import {ModalFuncProps} from 'antd/es/modal';
import {Button, Tooltip, Menu, Icon, Dropdown, Modal} from 'antd';
import CustomButton from './Button';

interface ButtonGroupsType extends ButtonGroupProps {
  /**
   * 点击事件监听
   */
  handleClick: (actionkey: string) => void;
  /**
   * 子组件
   */
  children:
    | React.ReactElement<CustomButton>
    | React.ReactElement<CustomButton>[];
  /**
   * 显示模式 ButtonGroup 和 ButtonMenu
   */
  mode: 'ButtonGroup' | 'ButtonMenu';
  /**
   * 最多显示个数
   */
  showSize: number;
  /**
   * Button 显示模式 text、icon、both
   */
  viewMode: 'text' | 'icon' | 'both'; //todo
  overlayClassName?: string;
}

interface ConfirmType extends ModalFuncProps {
  children: any;
  onConfirm: () => void;
}

class Confirm extends React.Component<ConfirmType> {
  handleConfirmClick() {
    const {title, content, onConfirm} = this.props;
    return Modal.confirm({
      title: title,
      content: content,
      onOk: onConfirm
    });
  }
  //此处的createElement 直接用children 无法正常使用 小坑
  render() {
    const {children} = this.props;
    return React.createElement(
      children.type,
      {
        ...children.props,
        onClick: this.handleConfirmClick.bind(this)
      },
      children.props.children
    );
  }
}

export class ButtonGroups extends React.Component<ButtonGroupsType> {
  static CustomButton: typeof CustomButton;
  static defaultProps = {
    showSize: 5,
    handleClick: function(actionkey: string) {},
    viewMode: 'text',
    mode: 'ButtonGroup'
  };
  // static CustomButton: typeof CustomButton;
  filterChildren(childrenArray: any) {
    return childrenArray.filter((it: React.ReactElement) => {
      if (it.props.permission === undefined) {
        return true;
      } else {
        return it.props.permission && it.props.permission === true;
      }
    });
  }
  formatTooltipTitle(item: any): string {
    return item.tip || item.children;
  }
  completeIconProp() {}

  renderNormalChild(it: any, idx: number): React.ReactNode {
    const {handleClick} = this.props;
    const {
      actionkey,
      tip,
      needTooltip,
      confirm,
      confirmTitle,
      permission,
      children,
      ...btnProps
    } = it.props;
    const title = this.formatTooltipTitle(it.props);
    return btnProps.disabled === true
      ? React.createElement(
          //@ts-ignore
          Button,
          {
            ...btnProps,
            onClick: () => {
              handleClick(actionkey);
            }
          },
          children
        )
      : React.createElement(
          Tooltip,
          {key: idx, title: title},
          React.createElement(
            //@ts-ignore
            Button,
            {
              ...btnProps,
              onClick: () => {
                handleClick(actionkey);
              }
            },
            children
          )
        );
  }

  renderConfirmChild(it: any, idx: number): React.ReactNode {
    const {handleClick} = this.props;
    const {
      tip,
      needTooltip,
      confirm,
      confirmTitle,
      actionkey,
      children,
      permission,
      ...otherProps
    } = it.props;
    const title = this.formatTooltipTitle(it.props);
    return React.createElement(
      Confirm,
      //@ts-ignore
      {
        key: idx,
        title: !!confirmTitle ? confirmTitle : undefined,
        content: confirm,
        onConfirm: () => {
          handleClick(actionkey);
        }
      },
      otherProps.disabled === true
        ? React.createElement(
            //@ts-ignore
            Button,
            {...otherProps},
            children
          )
        : React.createElement(
            Tooltip,
            {
              key: idx,
              title: title
            },
            React.createElement(
              //@ts-ignore
              Button,
              {...otherProps},
              children
            )
          )
    );
  }
  renderReactElement(it: any, idx: number) {
    const {disabled, confirmTitle, confirm} = it.props;
    if ((confirmTitle || confirm) && !disabled) {
      return this.renderConfirmChild(it, idx);
    } else {
      return this.renderNormalChild(it, idx);
    }
  }
  renderButtonOnly(): React.ReactNode[] {
    const childrenArray = React.Children.toArray(this.props.children);

    return this.filterChildren(childrenArray).map((it: any, idx: number) => {
      return this.renderReactElement(it, idx);
    });
  }
  renderMenuChild(it: any, idx: number): React.ReactNode {
    let {tip, children} = it.props;
    return React.createElement(
      Tooltip,
      Object.assign({}, {key: idx, title: tip}),
      React.cloneElement(it, Object.assign({}, it.props), children)
    );
  }
  renderMenuItem(itemList: any) {
    return (
      <Menu>
        {itemList.map((it: any, idx: number) => {
          return (
            <Menu.Item key={it.props.actionkey || idx}>
              {this.renderReactElement(it, idx)}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
  renderMixButtonMenu(): React.ReactNode {
    let {children, showSize, overlayClassName} = this.props;
    let childrenArray = this.filterChildren(React.Children.toArray(children));
    let endArray = childrenArray.splice(showSize);
    return (
      <React.Fragment>
        {childrenArray.map((it: any, idx: number) => {
          return this.renderReactElement(it, idx);
        })}
        {endArray.length ? (
          <Dropdown
            overlayClassName={overlayClassName}
            overlay={this.renderMenuItem(endArray)}>
            <Button>
              <Icon type='ellipsis' />
            </Button>
          </Dropdown>
        ) : null}
      </React.Fragment>
    );
  }
  renderChildren() {
    const {
      mode,
      handleClick,
      children,
      showSize,
      viewMode,
      ...otherProps
    } = this.props;
    return (
      <Button.Group {...otherProps}>
        {mode === 'ButtonGroup'
          ? this.renderButtonOnly()
          : this.renderMixButtonMenu()}
      </Button.Group>
    );
  }
  render() {
    return <div className='button-groups'>{this.renderChildren()}</div>;
  }
}

ButtonGroups.CustomButton = CustomButton;

export default ButtonGroups;
