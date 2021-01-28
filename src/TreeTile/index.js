import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tree, Card, Checkbox} from 'antd';

const TreeNode = Tree.TreeNode;

class TreeTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indeterminate: false,
      checkAll: false,
      dataSourceKeys: [],
      checkedKeys: []
    };
  }

  componentDidMount() {
    let {dataSource} = this.props;
    let dataSourceKeys = this.getKeysFromMap(dataSource, []);
    this.setState({
      dataSourceKeys
    });

    let {checkedKeys} = this.props;
    if (checkedKeys instanceof Array) {
      this.setState({
        checkedKeys
      });
    } else {
      this.setState({
        checkedKeys: []
      });
    }
  }

  getKeysFromMap = (data, dataSourceKeys) => {
    data.map(d => {
      if (!!d.children) {
        this.getKeysFromMap(d.children, dataSourceKeys);
      }
      dataSourceKeys.push(d.key);
    });
    return dataSourceKeys;
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  onCheckAll = e => {
    let {dataSourceKeys} = this.state;
    let checkedKeys = e.target.checked ? dataSourceKeys : [];
    this.setState(
      {
        checkedKeys: checkedKeys,
        indeterminate: false,
        checkAll: e.target.checked
      },
      () => {
        this.props.onChange(checkedKeys);
      }
    );
  };

  onCheck = checkedKeys => {
    let {dataSourceKeys} = this.state;
    this.setState(
      {
        checkedKeys: checkedKeys,
        indeterminate:
          !!checkedKeys &&
          checkedKeys.length !== 0 &&
          checkedKeys.length < dataSourceKeys.length,
        checkAll: !!checkedKeys && checkedKeys.length === dataSourceKeys.length
      },
      () => {
        this.props.onChange(checkedKeys);
      }
    );
  };

  render() {
    const {title, dataSource} = this.props;
    let {checkedKeys} = this.state;
    return (
      <Card
        size='small'
        title={title}
        extra={
          <Checkbox
            onChange={this.onCheckAll}
            indeterminate={this.state.indeterminate}
            checked={this.state.checkAll}>
            全选
          </Checkbox>
        }
        style={{width: '100%'}}>
        {!!dataSource && dataSource.length > 0 ? (
          <Tree
            className='treeTile'
            name='tree'
            checkable
            blockNode={false}
            defaultExpandAll
            onCheck={this.onCheck}
            checkedKeys={checkedKeys}>
            {this.renderTreeNodes(dataSource)}
          </Tree>
        ) : (
          <p className='treeNoData'>no data</p>
        )}
      </Card>
    );
  }
}

TreeTile.propTypes = {
  /**
   * 标题
   */
  title: PropTypes.string,
  /**
   * （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点 key，则子节点自动选中；相应当子节点 key 都传入，父节点也自动选中。当设置 checkable 和 checkStrictly，它是*一个有checked和halfChecked属性的对象，并且父子节点的选中与否不再关联
   */
  checkedKeys: PropTypes.array,
  /**
   * 数据源
   */
  dataSource: PropTypes.array.isRequired
};

TreeTile.defaultProps = {
  title: '请选择',
  checkedKeys: [],
  dataSource: []
};

export default TreeTile;
