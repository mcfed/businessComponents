import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, Icon, Checkbox, Button, Row, Col, Form} from 'antd';

export class TableMenu extends Component {
  state = {
    visible: true,
    columns: []
  };
  //请求远程数据接口
  componentWillMount() {
    let {actions} = this.props;
  }
  // //处理表格提交后动作
  handleOk() {
    const {columns} = this.state;
    const {onSelectChange, onClosePopup} = this.props;
    //  console.log(columns)
    onSelectChange(columns);
    //  this.form.onSubmit()
    onClosePopup();
  }
  saveFormRef = form => (this.form = form);
  handleSubmit(values) {
    var {onSelectChange} = this.props;
    this.setState({
      columns: values
    });
  }
  handleChange(values) {
    const {onSelectChange} = this.props;
    this.setState({
      columns: values
    });
  }
  render() {
    const {
      form,
      initialValues,
      handleSubmit,
      children,
      defaultValue,
      columns,
      onClosePopup
    } = this.props;
    const saveFormRef = this.saveFormRef;
    const formFullItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
    return (
      <div
        className=''
        style={{
          width: 400,
          height: 200,
          padding: '10px',
          border: '1px solid #cfdae5',
          background: '#fff'
        }}>
        <Form onSubmit={handleSubmit} ref={saveFormRef} layout='inline'>
          <Checkbox.Group
            name='isShowArr'
            style={{width: '100%'}}
            defaultValue={defaultValue}
            onChange={this.handleChange.bind(this)}>
            <Row>
              {columns
                .filter(it => {
                  return it.title != '操作';
                })
                .map((it, idx) => {
                  return (
                    <Col span={8} key={idx}>
                      <Checkbox
                        value={it.key}
                        disabled={it.isRead == 1 ? true : false}>
                        {it.title}
                      </Checkbox>
                    </Col>
                  );
                })}
            </Row>
          </Checkbox.Group>
          <div style={{textAlign: 'right'}}>
            <Button size='small' onClick={onClosePopup}>
              取消
            </Button>
            <Button
              size='small'
              type='primary'
              onClick={this.handleOk.bind(this)}
              style={{marginLeft: '10px'}}>
              确定
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

class DataTable extends Component {
  state = {
    visible: false,
    columns: [],
    displayColumns: []
  };
  static defaultProps = {
    page: {},
    prefixCls: 'ant-table',
    pagination: {
      showTotal: total => `共 ${total} 条`,
      // showQuickJumper:true,
      size: 'middle',
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100']
    },
    //  scroll:{ y: 500 },
    style: {
      width: '100%'
    },
    showConfig: false,
    columns: []
  };
  showPopover() {
    this.setState({
      visible: true
    });
  }
  constructor(props) {
    super(props);
    this.state.columns = props.columns;
  }
  componentWillReceiveProps(nextProps) {
    let {columns} = nextProps;
    this.setState({
      columns: columns
    });
  }

  onSelectChange(checkedValues) {
    //console.log(checkedValues)
    this.setState({
      columns: this.state.columns.map(col => {
        if (checkedValues.indexOf(col.key) >= 0) {
          col.visible = true;
        } else {
          col.visible = false;
        }
        return col;
      })
    });
  }
  onClosePopup() {
    this.setState({
      visible: false
    });
  }
  onPopupVisibleChange(boolean) {
    // console.log('show',arguments)
    this.setState({
      visible: boolean
    });
  }

  renderTableMenu() {
    let {columns} = this.state;
    var defaultValue = columns
      .filter(
        col =>
          col.type != 'config' &&
          (col.visible === true || col.visible === undefined)
      )
      .map(col => col.key);
    return (
      <TableMenu
        defaultValue={defaultValue}
        columns={columns}
        onSelectChange={this.onSelectChange.bind(this)}
        onClosePopup={this.onClosePopup.bind(this)}
      />
    );
  }
  render() {
    let {pagination, showConfig, page, defaultSort, ...otherProps} = this.props;
    let {visible, columns} = this.state;
    let newColumns;
    // console.log(this.props,"datatablerender")
    if (showConfig) {
      // if(true){
      newColumns = columns.filter(col => {
        return col.visible == true || col.visible == undefined;
        // return true
      });
      // .concat([{
      //     title:" ",
      //     filterDropdown:(
      //       this.renderTableMenu()
      //     ),
      //     filterDropdownVisible:visible,
      //     onFilterDropdownVisibleChange:this.onPopupVisibleChange.bind(this),
      //     width:30,
      //     fixed:'right',
      //     type:'config'
      // }])
    } else {
      newColumns = columns;
    }
    /*增加是否有排序判断 增加列配置*/
    // console.log("defaultSort", defaultSort);
    if (defaultSort) {
      newColumns = newColumns.map(it => {
        defaultSort.columnKey == it.dataIndex
          ? (it = Object.assign(it, {defaultSortOrder: defaultSort.order}))
          : null;
        return it;
      });
    }
    // console.log("newColumns", newColumns);
    return (
      <Table
        key={defaultSort && defaultSort.columnKey}
        {...otherProps}
        columns={newColumns}
        pagination={!pagination ? false : Object.assign({}, pagination, page)}
      />
    );
  }
}

DataTable.propTypes = {
  /**
    表格列的配置描述 同antd table columns
  **/
  columns: PropTypes.array.isRequired,
  /**
  数据数组，同antd table dataSource
  **/
  dataSource: PropTypes.array.isRequired,
  /**
  默认排序参数  {columnKey,order} columnkey代表需要排序的columns的dataIndex order 选项为‘descend ascend’之一
  e.g. {columnKey:'name',order:'descend'}
  **/
  defaultSort: PropTypes.object,
  /**
  分页器  同antd table pagination
  **/
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};
export default DataTable;
