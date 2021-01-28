import React, {useEffect, FunctionComponent} from 'react';
import {Tooltip} from 'antd';

interface EllipsisProps {
  /**
   * 文本，必须
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
const Ellipsis: FunctionComponent<EllipsisProps> = ({
  text,
  tooltiptext,
  ...otherProps
}) => {
  useEffect(() => {}, [text, tooltiptext]);
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
};

Ellipsis.defaultProps = {
  text: ''
};
export default Ellipsis;
