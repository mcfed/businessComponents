import React, {Component} from 'react';
import {Collapse} from 'antd';
import FormItem from '../FormItem/index';

const Panel = Collapse.Panel;

interface CollapsePanelState {
  active: boolean;
}

interface CollapsePanelProps {
  /**
   * 标题文字 Panel titile
   */
  title: string;
  /**
   * 是否渲染面板
   */
  renderable: boolean | Function;
  /**
   * 自定义渲染每个面板右上角的内容
   */
  control: React.ReactElement;
  /**
   * 子组件
   */
  children: React.ReactNode;
  /**
   * 关闭值数组
   */
  closeValues?: any[];
}

interface ICollapsePanel {
  setActiveStatus(): void;
  render(): React.ReactNode;
}

export default class CollapsePanel
  extends Component<CollapsePanelProps, CollapsePanelState>
  implements ICollapsePanel {
  componentDidMount() {
    this.setActiveStatus();
  }
  setActiveStatus(): void {
    const {control} = this.props;
    this.setState({
      active: this.isExtraIsReactDom(control) ? this.fieldValueChange() : true
    });
  }
  fieldValueChange(): boolean {
    const {formRef} = this.context;
    const {control, closeValues} = this.props;
    /**
     * closeValues 关闭值数组【默认为空数组】
     * 若closeValues 传入则判断值是否在该数组中 存在则返回false
     * 若未传入则值转boolean
     */
    return closeValues && closeValues.length
      ? closeValues.filter(
          it => it === formRef.getFieldValue(control.props.name)
        ).length === 0
      : Boolean(formRef.getFieldValue(control.props.name));
  }
  isExtraIsReactDom(extra: any): boolean {
    return typeof extra === 'object' && typeof extra.$$typeof === 'symbol';
  }
  renderHeader(): React.ReactElement {
    let {title} = this.props;
    return (
      <div className='CollapsePanel-header'>
        <h5 className='CollapsePanel-title'>
          {title}
          <div className='CollapsePanel-extra'>{this.renderExtra()}</div>
        </h5>
      </div>
    );
  }
  renderExtra() {
    let {control} = this.props;
    return this.isExtraIsReactDom(control)
      ? React.createElement(FormItem, {}, control)
      : control;
  }
  render() {
    const {children, renderable, ...otherProps} = this.props;
    const {formRef} = this.context;
    let {active} = this.state;
    let renderProps = true;
    if (
      (typeof renderable === 'boolean' && renderable === false) ||
      (typeof renderable === 'function' &&
        renderable.apply(this, [formRef]) === false)
    ) {
      renderProps = false;
    }
    return renderProps ? (
      //@ts-ignore
      <Panel
        header={this.renderHeader()}
        {...otherProps}
        // @ts-ignore
        isActive={children ? active : false}>
        {children}
      </Panel>
    ) : null;
  }
}
