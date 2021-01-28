import React from 'react';
import {Transfer, Checkbox, Icon, Input, Select} from 'antd';

//重写方法所需依赖
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import classNames from 'classnames';
import Item from 'antd/es/transfer/item';
import Animate from 'rc-animate';
import _extends from 'babel-runtime/helpers/extends';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import Operation from 'antd/es/transfer/operation';
import LocaleReceiver from 'antd/es/locale-provider/LocaleReceiver';
import defaultLocale from 'antd/es/locale-provider/default';
function noop() {}
//默认list样式
const defaultListStyle = {
  width: 300,
  height: 300
};

class NewTransferSearch extends Transfer.Search {
  constructor(props) {
    super(props);
    // this.refInput = React.createRef();
    // this.refSelect = React.createRef();
    this.value = {};
    this.handleSelect = function(value) {
      var onChange = this.props.onChange;
      this.value['select'] = value;
      // console.log(this.value);
      if (onChange) {
        onChange({
          target: {
            value: this.value
          }
        });
      }
    };
    this.handleChange = function(e) {
      var onChange = this.props.onChange;
      this.value['input'] = e.target.value;
      if (onChange) {
        onChange({
          target: {
            value: this.value
          }
        });
      }
    };
    this.handleClear = function(e) {
      e.preventDefault();
      var handleClear = this.props.handleClear;
      if (handleClear) {
        handleClear(e);
      }
    };
  }
  render = () => {
    var _props = this.props,
      placeholder = _props.placeholder,
      value = _props.value,
      selectData = _props.selectData,
      defaultSelectValue = _props.defaultSelectValue,
      prefixCls = _props.prefixCls;
    var icon =
      value && value.length > 0
        ? React.createElement(
            'a',
            {
              href: '#',
              className: prefixCls + '-action',
              onClick: this.handleClear
            },
            React.createElement(Icon, {type: 'cross-circle'})
          )
        : React.createElement(
            'span',
            {className: prefixCls + '-action'},
            React.createElement(Icon, {type: 'search'})
          );
    return React.createElement(
      'div',
      {
        style: {
          display: 'flex'
        }
      },
      [
        React.createElement(
          Select,
          {
            onChange: this.handleSelect.bind(this),
            defaultValue: defaultSelectValue,
            key: 'Select'
          },
          selectData &&
            selectData.map((item, i) => (
              <Select.Option value={item} key={i}>
                {item}
              </Select.Option>
            ))
        ),
        React.createElement(Input, {
          placeholder: placeholder,
          className: prefixCls,
          key: 'input',
          // value: value,
          ref: ref => {
            this.refInput = ref;
          },
          onChange: this.handleChange.bind(this)
        })
      ],
      icon
    );
  };
}

class NewTransferList extends Transfer.List {
  constructor(props) {
    super(props);
    this.refCheckbox = React.createRef();
  }
  componentWillReceiveProps(nextProps) {
    // console.log(
    //   JSON.stringify(nextProps.filter),
    //   JSON.stringify(this.props.filter)
    // );
    // if (JSON.stringify(nextProps.filter) != JSON.stringify(this.props.filter)) {
    this.setState({
      time: new Date().getTime()
    });
    // }
  }

  getCheckStatus = filteredDataSource => {
    var checkedKeys = this.props.checkedKeys;

    if (checkedKeys.length === 0) {
      return 'none';
    } else if (
      filteredDataSource.every(function(item) {
        return checkedKeys.indexOf(item.key) >= 0;
      })
    ) {
      return 'all';
    }
    return 'part';
  };

  render = () => {
    var _this3 = this;
    var _props = this.props,
      prefixCls = _props.prefixCls,
      dataSource = _props.dataSource,
      selectData = _props.selectData,
      defaultSelectValue = _props.defaultSelectValue,
      titleText = _props.titleText,
      checkedKeys = _props.checkedKeys,
      lazy = _props.lazy,
      _props$body = _props.body,
      body = _props$body === undefined ? noop : _props$body,
      _props$footer = _props.footer,
      footer = _props$footer === undefined ? noop : _props$footer,
      showSearch = _props.showSearch,
      searchSelect = _props.searchSelect,
      style = _props.style,
      filter = _props.filter,
      searchPlaceholder = _props.searchPlaceholder,
      notFoundContent = _props.notFoundContent,
      itemUnit = _props.itemUnit,
      itemsUnit = _props.itemsUnit,
      onScroll = _props.onScroll;
    // Custom Layout
    // console.log(_props)
    var footerDom = footer(_extends({}, this.props));
    var bodyDom = body(_extends({}, this.props));
    var listCls = classNames(
      prefixCls,
      _defineProperty({}, prefixCls + '-with-footer', !!footerDom)
    );
    var filteredDataSource = [];
    var totalDataSource = [];
    var showItems = dataSource.map(function(item) {
      var _renderItem = _this3.renderItem(item),
        renderedText = _renderItem.renderedText,
        renderedEl = _renderItem.renderedEl;

      if (filter && !_this3.matchFilter(renderedText, item)) {
        return null;
      }
      // all show items
      totalDataSource.push(item);
      if (!item.disabled) {
        // response to checkAll items
        filteredDataSource.push(item);
      }
      var checked = checkedKeys.indexOf(item.key) >= 0;
      return React.createElement(Item, {
        key: item.key,
        item: item,
        lazy: lazy,
        renderedText: renderedText,
        renderedEl: renderedEl,
        checked: checked,
        prefixCls: prefixCls,
        onClick: _this3.handleSelect
      });
    });
    var unit = dataSource.length > 1 ? itemsUnit : itemUnit;
    var search = showSearch
      ? React.createElement(
          'div',
          {className: prefixCls + '-body-search-wrapper'},
          React.createElement(NewTransferSearch, {
            prefixCls: prefixCls + '-search',
            onChange: this.handleFilter,
            handleClear: this.handleClear,
            placeholder: searchPlaceholder,
            selectData: selectData,
            defaultSelectValue: defaultSelectValue,
            value: filter
          })
        )
      : null;
    var searchSelect = searchSelect || search;
    var listBody =
      bodyDom ||
      React.createElement(
        'div',
        {
          className: showSearch
            ? prefixCls + '-body ' + prefixCls + '-body-with-search'
            : prefixCls + '-body'
        },
        search,
        React.createElement(
          Animate,
          {
            component: 'ul',
            componentProps: {onScroll: onScroll},
            className: prefixCls + '-content',
            transitionName: this.state.mounted
              ? prefixCls + '-content-item-highlight'
              : '',
            transitionLeave: false
          },
          showItems
        ),
        React.createElement(
          'div',
          {className: prefixCls + '-body-not-found'},
          notFoundContent
        )
      );
    var listFooter = footerDom
      ? React.createElement(
          'div',
          {className: prefixCls + '-footer'},
          footerDom
        )
      : null;
    var checkStatus = this.getCheckStatus(filteredDataSource);
    var checkedAll = checkStatus === 'all';
    var checkAllCheckbox = React.createElement(Checkbox, {
      ref: ref => {
        this.refCheckbox = ref;
      },
      checked: checkedAll,
      indeterminate: checkStatus === 'part',
      onChange: function onChange() {
        return _this3.props.handleSelectAll(filteredDataSource, checkedAll);
      }
    });

    // header 重写
    var headerBody =
      this.props.header &&
      this.props.header.map((value, i) => {
        return <div key={`${value.text}${i}`}>{value.text}</div>;
      });
    return React.createElement(
      'div',
      {className: listCls, style: style},
      React.createElement(
        'div',
        {className: prefixCls + '-header'},
        checkAllCheckbox,
        React.createElement(
          'span',
          {className: prefixCls + '-header-selected'},
          React.createElement(
            'span',
            null,
            (checkedKeys.length > 0 ? checkedKeys.length + '/' : '') +
              totalDataSource.length,
            ' ',
            unit
          ),
          React.createElement(
            'span',
            {className: prefixCls + '-header-title'},
            titleText
          )
          // React.createElement(
          //   'div',
          //   { className: 'header-item' },
          //   headerBody
          // ),
        )
      ),
      listBody,
      listFooter
    );
  };
}

class NewTransfer extends Transfer {
  constructor(props) {
    super(props);
    this._this = _possibleConstructorReturn(
      this,
      (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props)
    );
  }
  renderTransfer = locale => {
    var _this = this._this;
    var _this$props2 = _this.props,
      _this$props2$prefixCl = _this$props2.prefixCls,
      prefixCls =
        _this$props2$prefixCl === undefined
          ? 'ant-transfer'
          : _this$props2$prefixCl,
      className = _this$props2.className,
      _this$props2$operatio = _this$props2.operations,
      operations =
        _this$props2$operatio === undefined ? [] : _this$props2$operatio,
      showSearch = _this$props2.showSearch,
      notFoundContent = _this$props2.notFoundContent,
      searchPlaceholder = _this$props2.searchPlaceholder,
      body = _this$props2.body,
      footer = _this$props2.footer,
      listStyle = _this$props2.listStyle,
      filterOption = _this$props2.filterOption,
      render = _this$props2.render,
      lazy = _this$props2.lazy;
    var _this$state3 = _this.state,
      leftFilter = _this$state3.leftFilter,
      rightFilter = _this$state3.rightFilter,
      sourceSelectedKeys = _this$state3.sourceSelectedKeys,
      targetSelectedKeys = _this$state3.targetSelectedKeys;
    var _this$splitDataSource = _this.splitDataSource(_this.props),
      leftDataSource = _this$splitDataSource.leftDataSource,
      rightDataSource = _this$splitDataSource.rightDataSource;
    var leftActive = targetSelectedKeys.length > 0;
    var rightActive = sourceSelectedKeys.length > 0;
    var cls = classNames(className, prefixCls);
    var titles = _this.getTitles(locale);
    var selectData = _this$props2.selectData;
    var defaultSelectValue = _this$props2.defaultSelectValue;
    return React.createElement(
      'div',
      {className: cls},
      React.createElement(NewTransferList, {
        prefixCls: prefixCls + '-list',
        titleText: titles[0],
        dataSource: leftDataSource,
        selectData: selectData,
        defaultSelectValue: defaultSelectValue,
        filter: leftFilter,
        filterOption: filterOption,
        style: listStyle,
        checkedKeys: sourceSelectedKeys,
        handleFilter: _this.handleLeftFilter,
        handleClear: _this.handleLeftClear,
        handleSelect: _this.handleLeftSelect,
        handleSelectAll: _this.handleLeftSelectAll,
        render: render,
        showSearch: showSearch,
        searchPlaceholder: searchPlaceholder || locale.searchPlaceholder,
        notFoundContent: notFoundContent || locale.notFoundContent,
        itemUnit: locale.itemUnit,
        itemsUnit: locale.itemsUnit,
        body: body,
        footer: footer,
        lazy: lazy,
        onScroll: _this.handleLeftScroll
      }),
      React.createElement(Operation, {
        className: prefixCls + '-operation',
        rightActive: rightActive,
        rightArrowText: operations[0],
        moveToRight: _this.moveToRight,
        leftActive: leftActive,
        leftArrowText: operations[1],
        moveToLeft: _this.moveToLeft
      }),
      React.createElement(NewTransferList, {
        prefixCls: prefixCls + '-list',
        titleText: titles[1],
        dataSource: rightDataSource,
        selectData: selectData,
        defaultSelectValue: defaultSelectValue,
        filter: rightFilter,
        filterOption: filterOption,
        style: listStyle,
        checkedKeys: targetSelectedKeys,
        handleFilter: _this.handleRightFilter,
        handleClear: _this.handleRightClear,
        handleSelect: _this.handleRightSelect,
        handleSelectAll: _this.handleRightSelectAll,
        render: render,
        showSearch: showSearch,
        searchPlaceholder: searchPlaceholder || locale.searchPlaceholder,
        notFoundContent: notFoundContent || locale.notFoundContent,
        itemUnit: locale.itemUnit,
        itemsUnit: locale.itemsUnit,
        body: body,
        footer: footer,
        lazy: lazy,
        onScroll: _this.handleRightScroll
      })
    );
  };

  render() {
    // console.log("渲染一次");
    return React.createElement(
      LocaleReceiver,
      {componentName: 'Transfer', defaultLocale: defaultLocale.Transfer},
      this.renderTransfer
    );
  }
}

class TransferView extends React.Component {
  renderItem = item => {
    let node =
      this.props.header &&
      this.props.header.map((value, i) => {
        return (
          <div
            style={{maxWidth: value.width + 'px'}}
            key={`${value.text}${i}`}
            title={
              typeof item[value.text] === 'string' ? item[value.text] : ''
            }>
            {item[value.text]}
          </div>
        );
      });
    let width =
      (this.props.listStyle && this.props.listStyle.width) ||
      defaultListStyle.width;
    const customLabel = (
      <div className='custom-item' style={{width: width - 60 + 'px'}}>
        {node}
      </div>
    );

    return {
      label: customLabel, // for displayed item
      value: item[this.props.searchItem] // for filter matching
    };
  };

  footer = () => {
    let headerBody = this.props.header.map((value, i) => {
      return <div key={`${value.text}${i}`}>{value.text}</div>;
    });
    return headerBody;
  };
  render() {
    return (
      <NewTransfer
        className='mc-transfer'
        listStyle={this.props.listStyle || defaultListStyle}
        render={this.renderItem}
        {...this.props}
      />
    );
  }
}

export default TransferView;
