import React, {Component} from 'react';
import PropsType from 'prop-types';

export default class PropertyTable extends Component {
  renderItem(ds, idx) {
    return (
      <div key={idx}>
        <th>{ds.label}</th>
        <td>{ds.value}</td>
      </div>
    );
  }
  renderTableRows() {
    const {dataSource} = this.props;
    return <tr>{dataSource.map(this.renderItem)}</tr>;
  }

  render() {
    return (
      <table>
        <tbody>{this.renderTableRows()}</tbody>
      </table>
    );
  }
}

PropertyTable.propsType = {
  /**
   * 表格数据源
   */
  dataSource: PropsType.array.isRequired,
  /**
   * 自定义表格数据渲染方式，目前暂未开放该接口
   */
  renderItem: PropsType.func
};
