import React from 'react';
import {Tooltip} from 'antd';
/**
 * text：文本,必须
 * tooltiptext：与text文本不同时需要传入，否则可以不传
 */
interface EllipsisProps {
  /**
   * 文本,必须
   */
  text: string;
  /**
   * 与text文本不同时需要传入，否则可以不传
   */
  tooltiptext?: string;
}

/**
 * 超出截断
 */
export default class Ellipsis extends React.Component<EllipsisProps, {}> {
  static defaultProps = {
    text: ''
  };

  render() {
    let {text, tooltiptext, ...otherProps} = this.props;
    if (typeof tooltiptext === 'undefined') {
      tooltiptext = text;
    }
    return (
      <Tooltip autoAdjustOverflow title={tooltiptext} arrowPointAtCenter>
        <div className='td-ellipsis' {...Object.assign({}, otherProps)}>
          {text}
        </div>
      </Tooltip>
    );
  }
}
