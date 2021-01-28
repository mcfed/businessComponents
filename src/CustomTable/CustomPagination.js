import React, {Component} from 'react';
import RcPagination from 'rc-pagination';
import Pager from 'rc-pagination/es/Pager';

import MiniSelect from 'antd/lib/pagination/MiniSelect';
import enUS from 'rc-pagination/es/locale/en_US';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import Options from 'rc-pagination/es/Options';
import _extends from 'babel-runtime/helpers/extends';
import classNames from 'classnames';

import {Pagination, Select} from 'antd';

var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};
    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    }
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
      }
    return t;
  };

class CustomRcPagination extends RcPagination {
  render() {
    // When hideOnSinglePage is true and there is only 1 page, hide the pager
    if (
      this.props.hideOnSinglePage === true &&
      this.props.total <= this.state.pageSize
    ) {
      return null;
    }

    var props = this.props;
    var locale = props.locale;

    var prefixCls = props.prefixCls;
    var allPages = this.calculatePage();
    var pagerList = [];
    var jumpPrev = null;
    var jumpNext = null;
    var firstPager = null;
    var lastPager = null;
    var gotoButton = null;

    var goButton = props.showQuickJumper && props.showQuickJumper.goButton;
    var pageBufferSize = props.showLessItems ? 1 : 5;
    var _state = this.state,
      current = _state.current,
      pageSize = _state.pageSize;

    var prevPage = current - 1 > 0 ? current - 1 : 0;
    var nextPage = current + 1 < allPages ? current + 1 : allPages;

    if (allPages <= 5 + pageBufferSize * 2) {
      for (var i = 1; i <= allPages; i++) {
        var active = this.state.current === i;
        pagerList.push(
          React.createElement(Pager, {
            locale: locale,
            rootPrefixCls: prefixCls,
            onClick: this.handleChange,
            onKeyPress: this.runIfEnter,
            key: i,
            page: i,
            active: active,
            showTitle: props.showTitle,
            itemRender: props.itemRender
          })
        );
      }
    } else {
      var prevItemTitle = props.showLessItems ? locale.prev_3 : locale.prev_5;
      var nextItemTitle = props.showLessItems ? locale.next_3 : locale.next_5;
      if (props.showPrevNextJumpers) {
        jumpPrev = React.createElement(
          'li',
          {
            title: props.showTitle ? prevItemTitle : null,
            key: 'prev',
            onClick: this.jumpPrev,
            tabIndex: '0',
            onKeyPress: this.runIfEnterJumpPrev,
            className: prefixCls + '-jump-prev'
          },
          props.itemRender(
            this.getJumpPrevPage(),
            'jump-prev',
            React.createElement('a', {className: prefixCls + '-item-link'})
          )
        );
        jumpNext = React.createElement(
          'li',
          {
            title: props.showTitle ? nextItemTitle : null,
            key: 'next',
            tabIndex: '0',
            onClick: this.jumpNext,
            onKeyPress: this.runIfEnterJumpNext,
            className: prefixCls + '-jump-next'
          },
          props.itemRender(
            this.getJumpNextPage(),
            'jump-next',
            React.createElement('a', {className: prefixCls + '-item-link'})
          )
        );
      }
      lastPager = React.createElement(Pager, {
        locale: props.locale,
        last: true,
        rootPrefixCls: prefixCls,
        onClick: this.handleChange,
        onKeyPress: this.runIfEnter,
        key: allPages,
        page: allPages,
        active: false,
        showTitle: props.showTitle,
        itemRender: props.itemRender
      });
      firstPager = React.createElement(Pager, {
        locale: props.locale,
        rootPrefixCls: prefixCls,
        onClick: this.handleChange,
        onKeyPress: this.runIfEnter,
        key: 1,
        page: 1,
        active: false,
        showTitle: props.showTitle,
        itemRender: props.itemRender
      });

      var left = Math.max(1, current - pageBufferSize);
      var right = Math.min(current + pageBufferSize - 1, allPages);

      if (current - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }

      if (allPages - current <= pageBufferSize) {
        left = allPages - pageBufferSize * 2;
      }

      for (var _i = left; _i <= right; _i++) {
        var _active = current === _i;
        pagerList.push(
          React.createElement(Pager, {
            locale: props.locale,
            rootPrefixCls: prefixCls,
            onClick: this.handleChange,
            onKeyPress: this.runIfEnter,
            key: _i,
            page: _i,
            active: _active,
            showTitle: props.showTitle,
            itemRender: props.itemRender
          })
        );
      }

      if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
        pagerList[0] = React.cloneElement(pagerList[0], {
          className: prefixCls + '-item-after-jump-prev'
        });
        //  pagerList.unshift(jumpPrev);
      }
      if (
        allPages - current >= pageBufferSize * 2 &&
        current !== allPages - 2
      ) {
        pagerList[pagerList.length - 1] = React.cloneElement(
          pagerList[pagerList.length - 1],
          {
            className: prefixCls + '-item-before-jump-next'
          }
        );
      }
      /*
        if (left !== 1) {
          pagerList.unshift(firstPager);
        }
				*/
      /*
        if (right !== allPages) {
          pagerList.push(lastPager);
        }
				*/
    }

    var totalText = null;

    if (props.showTotal) {
      totalText = React.createElement(
        'li',
        {className: prefixCls + '-total-text'},
        props.showTotal(props.total, [
          (current - 1) * pageSize + 1,
          current * pageSize > props.total ? props.total : current * pageSize
        ])
      );
    }
    var prevDisabled = !this.hasPrev();
    var nextDisabled = !this.hasNext();
    return React.createElement(
      'ul',
      {
        className: prefixCls + ' ' + props.className,
        style: props.style,
        unselectable: 'unselectable',
        ref: this.savePaginationNode
      },
      totalText,
      React.createElement(
        'li',
        {
          title: props.showTitle ? locale.prev_page : null,
          onClick: this.prev,
          tabIndex: prevDisabled ? null : 0,
          onKeyPress: this.runIfEnterPrev,
          className:
            (!prevDisabled ? '' : prefixCls + '-disabled') +
            ' ' +
            prefixCls +
            '-prev',
          'aria-disabled': prevDisabled
        },
        props.itemRender(
          prevPage,
          'prev',
          React.createElement('a', {className: prefixCls + '-item-link'})
        )
      ),
      pagerList,
      React.createElement(
        'li',
        {
          title: props.showTitle ? locale.next_page : null,
          onClick: this.next,
          tabIndex: nextDisabled ? null : 0,
          onKeyPress: this.runIfEnterNext,
          className:
            (!nextDisabled ? '' : prefixCls + '-disabled') +
            ' ' +
            prefixCls +
            '-next',
          'aria-disabled': nextDisabled
        },
        props.itemRender(
          nextPage,
          'next',
          React.createElement('a', {className: prefixCls + '-item-link'})
        )
      ),
      React.createElement(Options, {
        locale: props.locale,
        rootPrefixCls: prefixCls,
        selectComponentClass: props.selectComponentClass,
        selectPrefixCls: props.selectPrefixCls,
        changeSize: this.props.showSizeChanger ? this.changePageSize : null,
        current: this.state.current,
        pageSize: this.state.pageSize,
        pageSizeOptions: this.props.pageSizeOptions,
        quickGo: this.props.showQuickJumper ? this.handleChange : null,
        goButton: goButton
      })
    );
  }
}

export default class CustomPagination extends Pagination {
  static defaultProps = {
    prefixCls: 'ant-pagination',
    selectPrefixCls: 'ant-select'
  };

  renderCustomPagination(locale) {
    console.log('renderPagination');
    var _a = this.props,
      className = _a.className,
      size = _a.size,
      restProps = __rest(_a, ['className', 'size']);
    var isSmall = size === 'small';
    return React.createElement(
      CustomRcPagination,
      _extends({}, restProps, {
        className: classNames(className, {mini: isSmall}),
        selectComponentClass: isSmall ? MiniSelect : Select,
        locale: locale
      })
    );
    //return React.createElement(CustomRcPagination, _extends({}, restProps, { className: classNames(className, { mini: isSmall }), selectComponentClass: null, locale: locale }));
  }

  render() {
    console.log('renderPagination');
    return React.createElement(
      LocaleReceiver,
      {componentName: 'Pagination', defaultLocale: enUS},
      this.renderCustomPagination.bind(this)
    );
  }
}
