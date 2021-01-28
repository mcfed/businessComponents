import React, {Component} from 'react';
import {Table} from 'antd';
import _extends from 'babel-runtime/helpers/extends';
import classNames from 'classnames';
import CustomPagination from './CustomPagination';

export default class CustomTable extends Table {
  static defaultProps = {
    prefixCls: 'ant-table'
  };
  renderPagination(paginationPosition) {
    // 强制不需要分页
    if (!this.hasPagination()) {
      return null;
    }
    var size = 'default';
    var pagination = this.state.pagination;

    if (pagination.size) {
      size = pagination.size;
    } else if (this.props.size === 'middle' || this.props.size === 'small') {
      size = 'small';
    }
    var position = pagination.position || 'bottom';
    var total = pagination.total || this.getLocalData().length;
    return total > 0 && (position === paginationPosition || position === 'both')
      ? React.createElement(
          CustomPagination,
          _extends({key: 'pagination-' + paginationPosition}, pagination, {
            className: classNames(
              pagination.className,
              this.props.prefixCls + '-pagination'
            ),
            onChange: this.handlePageChange,
            total: total,
            size: size,
            current: this.getMaxCurrent(total),
            onShowSizeChange: this.handleShowSizeChange
          })
        )
      : null;
  }
  // Get pagination, filters, sorter
}
export {CustomPagination};
