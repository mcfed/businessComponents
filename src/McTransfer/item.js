import React from 'react';
import {Checkbox} from 'antd';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import PropTypes from 'prop-types';
import classNames from 'classnames';

//默认list样式
const defaultListStyle = {
  width: 300,
  height: 300
};

export default class Item extends React.Component {
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  //阻止select冒泡
  stopPop = e => {
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
      [`${prefixCls}-content-item-disabled`]: item.disabled
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
      (this.props.style && this.props.style.width) || defaultListStyle.width;

    return (
      <li
        className={className}
        style={style}
        title={renderedText}
        onClick={item.disabled ? undefined : () => onClick(item)}>
        <Checkbox checked={checked} disabled={item.disabled} />
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

Item.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  renderedText: PropTypes.string.isRequired,
  renderedEl: PropTypes.any.isRequired,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  prefixCls: PropTypes.string.isRequired
};
