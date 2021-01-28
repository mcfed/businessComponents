import React from 'react';
import {Input, Row, Col, Form} from 'antd';

export class ExtraColumnForTest extends React.Component {
  componentWillMount() {
    let data = this.props.data || this.props.value;
    this.setState({
      data: data || '',
      start: data && data[0],
      end: data && data[2]
    });
  }
  componentWillReceiveProps(nextprops) {
    /* istanbul ignore else */
    if (nextprops.value !== undefined && nextprops.value !== this.state.data) {
      // 新增时初始数组为["","",""]
      nextprops.value[1] = this.props.splitSymbol || '-';
      this.setState({
        data: nextprops.value,
        start: nextprops.value && nextprops.value[0],
        end: nextprops.value && nextprops.value[2]
      });
      /* istanbul ignore next */
      this.props.form.setFieldsValue(
        {
          start: nextprops.value && nextprops.value[0],
          end: nextprops.value && nextprops.value[2]
        },
        () => {
          this.props.form.validateFields(['start', 'end'], (err, values) => {});
        }
      );
    }
  }

  changeStart = e => {
    const {data} = this.state;
    let startValue = e.target.value === '' ? undefined : e.target.value;
    this.props.onChange(
      Object.assign(e, {
        target: {value: [startValue, data && data[1], data && data[2]]}
      })
    );
  };

  changeEnd = e => {
    const {data} = this.state;
    let endValue = e.target.value === '' ? undefined : e.target.value;
    this.props.onChange(
      Object.assign(e, {
        target: {value: [data && data[0], data && data[1], endValue]}
      })
    );
  };

  renderDomByType = () => {
    let dom;
    const type = this.props.type;
    switch (type) {
      case 'DatePicker':
        dom = this.renderDatePickerDom();
        break;
      // ...
      default:
        dom = this.renderDom();
    }
    return dom;
  };

  renderDom() {
    const {start, end} = this.state;
    const {
      form: {getFieldDecorator},
      editConfig
    } = this.props;
    let startConfig = {};
    let endConfig = {};
    if (editConfig instanceof Array) {
      startConfig = editConfig[0];
      endConfig = editConfig[1];
    } else {
      startConfig = editConfig;
      endConfig = editConfig;
    }
    return (
      <Input.Group className='ExtraColumn'>
        <Row>
          <Col span={10}>
            <Form.Item>
              {getFieldDecorator('start', {
                ...startConfig,
                initialValue: start
              })(<Input onChange={this.changeStart} />)}
            </Form.Item>
          </Col>
          <Col span={2}></Col>
          <Col span={10}>
            <Form.Item>
              {getFieldDecorator('end', {...endConfig, initialValue: end})(
                <Input onChange={this.changeEnd} />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Input.Group>
    );
  }

  renderDatePickerDom = () => {
    return 'this is DatePickerDom';
  };

  render() {
    return this.renderDomByType();
  }
}

export default Form.create()(ExtraColumnForTest);
