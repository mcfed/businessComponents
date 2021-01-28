import React from 'react';
//@ts-ignore
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
//@ts-ignore
import {List} from 'react-virtualized';
//@ts-ignore
import classNames from 'classnames';
import {Checkbox} from 'antd';
//@ts-ignore
import _ from 'lodash';

import Item from './item';
import Search from './search';
import prefixCls from './constants';
import {ItemType, ModeType} from './item';
import {ListRowProps} from 'react-virtualized/dist/es/List';
import {ItemProps, HeaderProps, StyleProps} from './commonProps';

export function noop() {}

export function isRenderResultPlainObject<T>(result: T) {
  return (
    result &&
    !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === '[object Object]'
  );
}

/**
 * render：自定义渲染方法，必须
 * searchRender：自定义搜索框渲染方法，必须
 * dataSource: 数据，必须
 * selectedKeys：选中项，非必须
 * handleSelect：select方法，非必须
 * filterOption：过滤方法，非必须
 * footer：footer渲染方法，非必须
 * showSearch：是否显示搜索栏，非必须
 * showHeader: 是否显示头部，非必须
 * itemUnit: 单数单位，非必须
 * itemsUnit: 复数单位，非必须
 * titleText：title，非必须
 * rowHeight：行高，非必须
 * style: 自定义样式，非必须
 * notFoundContent: 数据为空时显示文字，非必须s
 * searchPlaceholder: 搜索栏input提示语，非必须
 * rowKey：获取key方法，必须
 * header: table模式下的column数据，table模式下必须
 * type: 区分左右模块的类型，内部使用
 * mode: 区分普通transfer和table模式，非必须，默认normal
 */

interface SelectListProps<T> {
  render: (item: object) => void;
  searchRender: () => void;
  dataSource: T[];
  selectedKeys: string[];
  handleSelect: (selectedKeys: string[]) => void;
  filterOption: (filter: string, item: object) => void;
  footer: ({}) => React.ReactNode;
  showSearch: boolean;
  showHeader: boolean;
  itemUnit: string;
  itemsUnit: string;
  titleText: string;
  rowHeight: number;
  style: StyleProps;
  notFoundContent?: string;
  searchPlaceholder?: string;
  rowKey: (item: object) => string;
  header: HeaderProps[];
  type: ItemType;
  mode: ModeType;
}

interface State<T extends ItemProps> {
  filter: string;
  dataSource: T[];
}

export default class SelectList<T extends ItemProps> extends React.Component<
  SelectListProps<T>,
  State<T>
> {
  list: null | {} = {};
  static defaultProps = {
    filterOption: undefined,
    footer: noop,
    showSearch: false,
    showHeader: true,
    itemUnit: '',
    itemsUnit: '',
    titleText: '',
    style: {
      width: 200,
      height: 300
    },
    notFoundContent: 'Not Found',
    searchPlaceholder: 'Search here',
    rowKey: undefined,
    rowHeight: 32
  };
  static state = {
    filter: '',
    dataSource: []
  };
  componentWillMount() {
    this.setState({
      dataSource: this.props.dataSource
    });
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this
    );
  }
  componentWillReceiveProps(nextProps: {dataSource: T[]}) {
    /* istanbul ignore else */
    if (nextProps.dataSource !== this.props.dataSource) {
      if (this.state.filter !== '') {
        this.handleFilter(nextProps.dataSource, this.state.filter);
      } else {
        this.setState({
          dataSource: nextProps.dataSource
        });
      }
    }
  }
  shouldComponentUpdate(nextProps: any, nextState: any) {
    /* istanbul ignore else */
    if (
      this.shouldComponentUpdate(nextProps, nextState)
      // PureRenderMixin.shouldComponentUpdate.apply(this, nextProps, nextState)
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    /**
     * Sometimes there will be called redundant, but call forceUpdateGrid there every time is
     * the easyest way to ensure right update
     */
    //@ts-ignore
    this.list['forceUpdateGrid']();
  }

  getCheckStatus() {
    const {selectedKeys} = this.props;
    const {dataSource} = this.state;
    /* istanbul ignore else */
    if (selectedKeys.length === 0) {
      return 'none';
    } else if (
      dataSource.every(
        item => item.disabled || selectedKeys.indexOf(item.key) >= 0
      )
    ) {
      return 'all';
    }
    return 'part';
  }

  handleSelect = (selectedItem: {key: string}) => {
    const {selectedKeys} = this.props;
    const hoder = [...selectedKeys];
    const index = hoder.indexOf(selectedItem.key);
    if (index > -1) {
      hoder.splice(index, 1);
    } else {
      hoder.push(selectedItem.key);
    }
    this.props.handleSelect(hoder);
  };

  handleSelectAll = (checkAll: boolean) => {
    const {dataSource} = this.state;
    const {selectedKeys} = this.props;
    const hoder = [...selectedKeys];
    let index;
    if (!checkAll) {
      dataSource.map((item: {key: string; disabled: boolean}) => {
        /* istanbul ignore else */
        if (!item.disabled && hoder.indexOf(item.key) < 0) {
          hoder.push(item.key);
        }
        return item;
      });
    } else {
      dataSource.map((item: {key: string}) => {
        index = hoder.indexOf(item.key);
        /* istanbul ignore else */
        if (index > -1) {
          hoder.splice(index, 1);
        }
        return item;
      });
    }
    this.props.handleSelect(hoder);
  };

  handleFilterWapper = (e: string) => {
    this.handleFilterWithDebounce(this.props.dataSource, e);
    this.setState({
      filter: e
    });
  };

  matchFilter = (filter: string, item: object) => {
    /* istanbul ignore else */
    if (this.props.filterOption) {
      return this.props.filterOption(filter, item);
    }
    const {renderedText} = this.renderItem(item);
    return renderedText.indexOf(filter) >= 0;
  };

  handleFilter = (dataSource: T[], filter: string) => {
    const showItems: T[] = [];
    dataSource.map(item => {
      /* istanbul ignore else */
      if (!this.matchFilter(filter, item)) {
        return null;
      }
      showItems.push(item);
      return item;
    });
    this.setState(
      {
        dataSource: showItems
      },
      () => {
        /* TODO: maybe we can scroll to the position which user is looking at*/
        //@ts-ignore
        this.list['scrollToRow'](0);
      }
    );
  };
  handleFilterWithDebounce = _.debounce(this.handleFilter.bind(this), 200);

  handleClear = () => {
    this.setState({
      filter: '',
      dataSource: this.props.dataSource
    });
  };

  rowRenderer(record: ListRowProps) {
    const {index, style} = record;
    const {selectedKeys, header, type, rowKey, mode} = this.props;
    const item = this.state.dataSource[index];
    const {renderedText, renderedEl} = this.renderItem(item);
    const checked = selectedKeys.indexOf(item.key) >= 0;
    const itemPrefixCls = `${prefixCls}-list`;

    /* istanbul ignore else */
    if (rowKey) {
      item.key = rowKey(item);
    }

    return (
      <Item
        key={item.key}
        item={item}
        checked={checked}
        style={style}
        renderedText={renderedText}
        renderedEl={renderedEl}
        disabled={item.disabled}
        onClick={this.handleSelect}
        prefixCls={itemPrefixCls}
        header={header}
        type={type}
        mode={mode}
      />
    );
  }

  renderItem(item: object) {
    /* istanbul ignore next */
    const {render = noop} = this.props;
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      //@ts-ignore
      renderedText: isRenderResultPlain ? renderResult['value'] : renderResult,
      //@ts-ignore
      renderedEl: isRenderResultPlain ? renderResult['label'] : renderResult
    };
  }

  /* istanbul ignore next */
  render() {
    const {
      footer,
      showSearch,
      showHeader,
      selectedKeys,
      itemUnit,
      itemsUnit,
      titleText,
      style,
      notFoundContent,
      searchPlaceholder,
      header,
      type,
      mode
    } = this.props;
    const {dataSource} = this.state;

    const className = classNames({
      [`${prefixCls}-list`]: true
    });

    const footerDom = footer(Object.assign({}, this.props));

    const listFooter = footerDom ? (
      <div className={`${prefixCls}-list-footer`}>{footerDom}</div>
    ) : null;

    const checkStatus = this.getCheckStatus();
    const checkedAll = checkStatus === 'all';

    const checkAllCheckbox = (
      <Checkbox
        checked={checkedAll}
        indeterminate={checkStatus === 'part'}
        onChange={() => this.handleSelectAll(checkedAll)}
      />
    );
    /* istanbul ignore next */
    const unit = dataSource.length > 1 ? itemsUnit : itemUnit;

    // height is not 100%, so there should minus 2px of the boder of transfer-list
    let bodyHeight = style.height - 2;
    if (type === 'right' && mode === 'table') {
      bodyHeight = bodyHeight - 32;
    }
    bodyHeight = showHeader ? bodyHeight - 33 : bodyHeight;
    bodyHeight = showSearch ? bodyHeight - 38 : bodyHeight;
    bodyHeight = listFooter !== null ? bodyHeight - 32 : bodyHeight;

    var listHeader =
      header &&
      header.map((value, i) => {
        return (
          <div key={`${value.dataIndex}${i}`}>
            {value.text || value.dataIndex}
          </div>
        );
      });

    const transHeader = showHeader ? (
      <div className={`${prefixCls}-list-header`}>
        {checkAllCheckbox}
        {/* {type === "left" || mode !== "table" ? ( */}
        <span className={`${prefixCls}-list-header-selected`}>
          <span>
            {(selectedKeys.length > 0 ? `${selectedKeys.length}/` : '') +
              dataSource.length}{' '}
            {unit}
          </span>
          <span className={`${prefixCls}-list-header-title`}>{titleText}</span>
        </span>
        {/* ) : (
              <div className="header-item">{listHeader}</div>
            )} */}
      </div>
    ) : null;

    const tableHeader =
      type === 'right' && mode === 'table' ? (
        <div className='header-item'>{listHeader}</div>
      ) : null;

    const search = showSearch ? (
      <Search
        searchRender={this.props.searchRender}
        value={this.state.filter}
        onChange={this.handleFilterWapper}
        handleClear={this.handleClear}
        prefixCls={`${prefixCls}-list-search`}
        placeholder={searchPlaceholder}
      />
    ) : null;

    return (
      <div className={className} style={style}>
        {transHeader}
        {search}
        {tableHeader}
        <List
          ref={list => {
            /* istanbul ignore next */
            this.list = list;
          }}
          height={dataSource.length === 0 ? 0 : bodyHeight}
          rowCount={dataSource.length}
          rowHeight={this.props.rowHeight}
          rowRenderer={this.rowRenderer}
          width={1}
          className={`${prefixCls}-list-virtualized`}
        />
        {dataSource.length === 0 && (
          <div
            className={`${prefixCls}-list-body-not-found`}
            style={{
              height: `${bodyHeight}px`,
              lineHeight: `${bodyHeight}px`
            }}>
            {notFoundContent}
          </div>
        )}
        {listFooter}
      </div>
    );
  }
}
