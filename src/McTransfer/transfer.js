import React from 'react';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import 'core-js/fn/array/includes';
import SelectList from './selectList';
import Operation from './operation';

import prefixCls from './constants';
export function noop() {}

export default class Transfer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftSource: [],
      rightSrouce: [],
      sourceSelectedKeys: [],
      targetSelectedKeys: []
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.initStateByProps = this.initStateByProps.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.moveToLeft = this.moveToLeft.bind(this);
    this.moveToRight = this.moveToRight.bind(this);
  }

  componentWillMount() {
    this.initStateByProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore else */
    if (
      nextProps.dataSource.toString() !== this.props.dataSource.toString() ||
      nextProps.targetKeys.toString() !== this.props.targetKeys.toString() ||
      nextProps.selectedKeys.toString() !== this.props.selectedKeys.toString()
    ) {
      this.initStateByProps(nextProps, true);
    }
  }

  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  getSelectedKeysName(direction) {
    return direction === 'left' ? 'sourceSelectedKeys' : 'targetSelectedKeys';
  }

  initStateByProps(props, update) {
    const leftSource = [];
    const rightSrouce = new Array(props.targetKeys.length);
    const sourceSelectedKeys = [];
    const targetSelectedKeys = [];
    const oldSourceSelectedKeys = this.state.sourceSelectedKeys;
    const oldTargetSelectedKeys = this.state.targetSelectedKeys;

    props.dataSource.forEach(item => {
      /* istanbul ignore else */
      if (props.rowKey) {
        item.key = props.rowKey(item); // eslint-disable-line
      }

      // rightSource should be ordered by targetKeys
      // leftSource should be ordered by dataSource
      const indexOfKey = props.targetKeys.indexOf(item.key);
      if (indexOfKey !== -1) {
        rightSrouce[indexOfKey] = item;
      } else {
        leftSource.push(item);
      }
      /* istanbul ignore else */
      if (!props.selectedKeys && update) {
        // fitler not exist keys
        /* istanbul ignore else */
        if (
          oldSourceSelectedKeys.includes(item.key) &&
          !props.targetKeys.includes(item.key)
        ) {
          sourceSelectedKeys.push(item.key);
        }
        /* istanbul ignore else */
        if (
          oldTargetSelectedKeys.includes(item.key) &&
          props.targetKeys.includes(item.key)
        ) {
          targetSelectedKeys.push(item.key);
        }
      }
    });

    /* istanbul ignore else */
    if (props.selectedKeys) {
      props.selectedKeys.forEach(key => {
        if (props.targetKeys.includes(key)) {
          targetSelectedKeys.push(key);
        } else {
          sourceSelectedKeys.push(key);
        }
      });
    }

    this.setState({
      leftSource,
      rightSrouce,
      sourceSelectedKeys,
      targetSelectedKeys
    });
  }

  handleSelect(direction, selectedKeys) {
    const leftKeys =
      direction === 'left' ? selectedKeys : this.state.sourceSelectedKeys;
    const rightKeys =
      direction === 'right' ? selectedKeys : this.state.targetSelectedKeys;
    const onSelectChange = this.props.onSelectChange;
    /* istanbul ignore else */
    if (onSelectChange) {
      onSelectChange(leftKeys, rightKeys);
    }
    /* istanbul ignore else */
    if (!this.props.selectedKeys) {
      this.setState({
        sourceSelectedKeys: leftKeys,
        targetSelectedKeys: rightKeys
      });
    }
  }

  moveTo(direction) {
    /* istanbul ignore next */
    const {targetKeys = [], dataSource = [], onChange} = this.props;
    const {sourceSelectedKeys, targetSelectedKeys} = this.state;
    const moveKeys =
      direction === 'right' ? sourceSelectedKeys : targetSelectedKeys;

    const newMoveKeys = [];
    // disable key can be selected in props, so there should fitler disabled keys
    dataSource.forEach(item => {
      /* istanbul ignore else */
      if (!item.disabled && moveKeys.includes(item.key)) {
        newMoveKeys.push(item.key);
      }
    });
    // move items to target box
    const newTargetKeys =
      direction === 'right'
        ? newMoveKeys.concat(targetKeys)
        : targetKeys.filter(targetKey => newMoveKeys.indexOf(targetKey) === -1);
    const newTargetData = dataSource.filter(
      item => newTargetKeys.indexOf(item.key) > -1
    );
    // empty checked keys
    const oppositeDirection = direction === 'right' ? 'left' : 'right';
    this.setState({
      [this.getSelectedKeysName(oppositeDirection)]: []
    });
    this.handleSelect(oppositeDirection, []);
    /* istanbul ignore else */
    if (onChange) {
      onChange(newTargetKeys, newTargetData, direction, newMoveKeys);
    }
  }

  moveToLeft() {
    this.moveTo('left');
  }
  moveToRight() {
    this.moveTo('right');
  }

  render() {
    const {sourceSelectedKeys, targetSelectedKeys} = this.state;
    const {
      titles,
      className,
      filterOption,
      showSearch,
      footer,
      locale,
      searchRender,
      hideLeftSearch,
      hideRightSearch,
      mode
    } = this.props;
    const leftActive = targetSelectedKeys.length > 0;
    const rightActive = sourceSelectedKeys.length > 0;

    const cls = classNames(
      {
        [`${prefixCls}`]: true
      },
      className
    );

    return (
      <div className='mc-transfer'>
        <div className={cls}>
          <SelectList
            searchRender={searchRender}
            dataSource={this.state.leftSource}
            render={this.props.render}
            selectedKeys={this.state.sourceSelectedKeys}
            handleSelect={selectedKeys =>
              this.handleSelect('left', selectedKeys)
            }
            showSearch={showSearch ? showSearch && !hideLeftSearch : false}
            filterOption={filterOption}
            itemsUnit={locale.itemsUnit}
            itemUnit={locale.itemUnit}
            titleText={titles[0]}
            rowHeight={this.props.rowHeight}
            style={this.props.leftStyle || this.props.listStyle}
            footer={footer}
            notFoundContent={locale.notFoundContent}
            searchPlaceholder={locale.searchPlaceholder}
            header={this.props.header}
            type='left'
            mode={this.props.mode}
          />
          <Operation
            className={`${prefixCls}-operation`}
            leftActive={leftActive}
            rightActive={rightActive}
            moveToLeft={this.moveToLeft}
            moveToRight={this.moveToRight}
            leftArrowText={this.props.operations[0]}
            rightArrowText={this.props.operations[1]}
          />
          <SelectList
            searchRender={searchRender}
            dataSource={this.state.rightSrouce}
            render={this.props.render}
            selectedKeys={this.state.targetSelectedKeys}
            handleSelect={selectedKeys =>
              this.handleSelect('right', selectedKeys)
            }
            showSearch={showSearch ? showSearch && !hideRightSearch : false}
            filterOption={filterOption}
            itemsUnit={locale.itemsUnit}
            itemUnit={locale.itemUnit}
            titleText={titles[1]}
            rowHeight={this.props.rowHeight}
            style={this.props.rightStyle || this.props.listStyle}
            footer={footer}
            notFoundContent={locale.notFoundContent}
            searchPlaceholder={locale.searchPlaceholder}
            header={this.props.header}
            type='right'
            mode={this.props.mode}
          />
        </div>
      </div>
    );
  }
}

Transfer.defaultProps = {
  dataSource: [],
  selectedKeys: undefined,
  onSelectChange: undefined,
  titles: ['', ''],
  className: undefined,
  filterOption: undefined,
  listStyle: {
    width: 200,
    height: 300
  },
  operations: ['', ''],
  showSearch: false,
  footer: noop,
  notFoundContent: 'Not Found',
  searchPlaceholder: 'Search here',
  rowKey: undefined,
  onChange: undefined,
  hideLeftSearch: false,
  hideRightSearch: false,
  rowHeight: 32,
  header: undefined,
  mode: 'normal'
};

Transfer.propTypes = {
  dataSource: PropTypes.array,
  render: PropTypes.func.isRequired,
  targetKeys: PropTypes.array.isRequired,
  selectedKeys: PropTypes.array,
  onChange: PropTypes.func,
  onSelectChange: PropTypes.func,
  listStyle: PropTypes.shape({
    height: PropTypes.number.isRequired, // not support %
    width: PropTypes.any
  }),
  className: PropTypes.string,
  titles: PropTypes.array,
  operations: PropTypes.array,
  showSearch: PropTypes.bool,
  filterOption: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  notFoundContent: PropTypes.string,
  rowHeight: PropTypes.number,
  footer: PropTypes.func,
  rowKey: PropTypes.func, // eslint-disable-line,
  hideLeftSearch: PropTypes.bool,
  hideRightSearch: PropTypes.bool
};
