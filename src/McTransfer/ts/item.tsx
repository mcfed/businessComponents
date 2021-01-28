import React from 'react';
import {Checkbox} from 'antd';
//@ts-ignore
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
//@ts-ignore
import classNames from 'classnames';
import {
  HeaderProps,
  ItemProps as SubItemProps,
  StyleProps
} from './commonProps';

//默认list样式
const defaultListStyle = {
  width: 300,
  height: 300
};

export declare type ItemType = 'left' | 'right';
export declare type ModeType = 'normal' | 'table';

/**
 * item：单条数据，必须
 * style: 行样式，非必须
 * renderedText：hover title，非必须
 * renderedEl：render dom组件，非必须
 * checked：是否选中，非必须
 * onClick：单行点击事件，非必须
 * prefixCls：className 前缀，非必须
 * header: table模式下的column数据，table模式下必须
 * type: 区分左右模块的类型，内部使用
 * mode: 区分普通transfer和table模式，非必须，默认normal
 * disabled: 是否disabled，非必须
 */

interface ItemProps {
  item: SubItemProps;
  style: StyleProps;
  renderedText?: string;
  renderedEl: React.ReactNode;
  checked?: boolean;
  onClick: (item: SubItemProps) => void;
  prefixCls?: string;
  header?: HeaderProps[];
  type: ItemType;
  mode: ModeType;
  disabled: boolean;
}

const initialState = {};

type State = typeof initialState;

export default class Item extends React.Component<ItemProps, State> {
  shouldComponentUpdate(...args: object[]) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  //阻止select冒泡
  stopPop = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
  };

  render() {
    const {
      item,
      renderedText,
      renderedEl,
      style,
      checked,
      onClick,
      prefixCls,
      header,
      type,
      mode
    } = this.props;

    const className = classNames({
      [`${prefixCls}-content-item`]: true,
      [`${prefixCls}-content-item-disabled`]: item['disabled']
    });

    // console.log(header);

    let node =
      header &&
      header.map((value, i) => {
        let ifNode = typeof item[value.dataIndex] === 'object';
        return (
          <div className='custom-item-block' key={`${value.dataIndex}${i}`}>
            <div
              onClick={ifNode ? this.stopPop : () => {}}
              className='custom-item-content'
              title={
                typeof item[value.dataIndex] === 'string'
                  ? item[value.dataIndex]
                  : ''
              }>
              {item[value.dataIndex]}
            </div>
          </div>
        );
      });

    let width =
      (this.props.style && this.props.style['width']) || defaultListStyle.width;

    return (
      <li
        className={className}
        style={style}
        title={renderedText}
        onClick={item['disabled'] ? undefined : () => onClick(item)}>
        <Checkbox checked={checked} disabled={item['disabled']} />
        {/* <span>{renderedEl}</span> */}
        {type === 'left' || mode !== 'table' ? (
          <span>{renderedEl}</span>
        ) : (
          <div className='custom-item' style={{width: width - 60 + 'px'}}>
            {node}
          </div>
        )}
      </li>
    );
  }
}
