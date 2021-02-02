import React from 'react';
import {Modal, Row, Col} from 'antd';
import {DataTable} from '@mcfed/components';
import {uniqBy} from 'lodash';
import {ModalProps} from 'antd/lib/modal';
import {TableProps} from 'antd/lib/table';

interface SelectWithTableProps {
  triggerELe: (value: any, openModalMethod: Function) => any;
  value?: any[];
  onChange?: any;
  innerTableProps: TableProps<any>;
  triggerModalProps: ModalProps;
  renderSelected?: (selectedRows: any[]) => any;
  valueFormat?: (selectedRows: any[]) => any;
}

interface SelectWithTableState {
  isModalShow: boolean;
  selectedRowKeys: any[];
  selectedRows: any[];
}

export default class SelectWithTable extends React.Component<
  SelectWithTableProps,
  SelectWithTableState
> {
  constructor(props: SelectWithTableProps) {
    super(props);
    this.state = {
      isModalShow: false,
      selectedRowKeys: props.value || [],
      selectedRows: []
    };
  }
  renderTriggerElement() {
    const {triggerELe} = this.props;
    const that = this;
    return triggerELe(this.props.value, () => that.handleOpenModal.call(that));
  }

  handleOpenModal() {
    this.setState({
      isModalShow: !this.state.isModalShow
    });
  }
  handleSelectTableChange(
    rowKey: any,
    selectedRowKeys: any[],
    selectedRows: any[]
  ): void {
    const {onChange, valueFormat} = this.props;
    const selectedRowsFinal = uniqBy(
      //@ts-ignore
      [].concat(selectedRows, this.state.selectedRows),
      rowKey
    ).filter(it => selectedRowKeys.indexOf(it[rowKey]) >= 0);
    this.setState({selectedRowKeys, selectedRows: selectedRowsFinal}, () => {
      valueFormat === undefined
        ? onChange(selectedRowKeys)
        : valueFormat(selectedRowsFinal);
    });
  }

  renderDataTable() {
    const {innerTableProps, value} = this.props;
    const rowSelection = {
      selectedRowKeys: value,
      onChange: this.handleSelectTableChange.bind(this, innerTableProps.rowKey),
      ...innerTableProps.rowSelection
    };
    return (
      <DataTable
        {...innerTableProps}
        bordered={false}
        rowSelection={rowSelection}
        size='small'
      />
    );
  }

  renderSelectedShow() {
    const {renderSelected, value} = this.props;
    if (!value?.length) {
      return '请选择联系人';
    }
    return renderSelected === undefined
      ? this.renderDefaultSelected()
      : renderSelected(this.state.selectedRows);
  }
  renderDefaultSelected() {
    const {value} = this.props;
    return value?.join(',');
  }

  render() {
    const {triggerModalProps} = this.props;
    return (
      <div className='selected-with-table-box'>
        {this.renderTriggerElement()}
        <Modal
          width={700}
          maskClosable={false}
          visible={this.state.isModalShow}
          {...triggerModalProps}
          onCancel={() => this.handleOpenModal()}
          className='selected-with-table-modal'>
          <Row gutter={10}>
            <Col span={16}>{this.renderDataTable()}</Col>
            <Col span={8} className='selected-with-table-selected-data'>
              {this.renderSelectedShow()}
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
