import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Col, Row, Select, Modal} from 'antd';
import {downList} from './data';
//const { TextArea } = Input;
const FormItem = Form.Item;
class ConditionForm extends PureComponent {
  state = {
    conditionSelect: [],
    selection: [],
    isfirstSVList: false,
    isMulti: false,
    isShowSec: false,
    isShowfirstSV: true,
    callbackArr: []
  };
  componentDidMount() {
    let {conditionSelect} = this.props;
    this.setState({
      conditionSelect
    });
    //console.log("conditionSelect", conditionSelect);
  }
  componentWillReceiveProps(nextProps) {
    //console.log('nextProps', nextProps)
    this.setState({
      conditionSelect: nextProps.conditionSelect
    });
  }

  //条件因子 下拉框点击事件
  factorHandleChange = value => {
    const {setFieldsValue} = this.props.form;
    let {conditionSelect} = this.state;
    this.setState({
      isfirstSVList: false,
      isShowSec: false
    });
    setFieldsValue({
      'condition-selection': undefined,
      'value-selection': undefined
    });
    //通过value反查对应的factorOperate
    function getOperateByFac(value) {
      for (let i = 0; i < conditionSelect.length; i++) {
        if (conditionSelect[i].value == value)
          return conditionSelect[i].factorOperate;
      }
      return '';
    }
    for (let i = 0; i < downList.length; i++) {
      if (value == downList[i].label) {
        this.setState({
          isfirstSVList: true,
          firstSVList: downList[i].value.map((v, index) => {
            return (
              <Select.Option key={index} value={v}>
                {v}
              </Select.Option>
            );
          })
        });
        break;
      }
    }
    setFieldsValue({
      factorLabel: `$${value}`
    });
    this.setState({
      selection: getOperateByFac(value).split(',')
    });
  };
  //= in like 等 下拉框点击事件
  selectionHandleChange = value => {
    const {setFieldsValue, getFieldValue} = this.props.form;

    setFieldsValue({
      'condition-selection': `${value}`
    });
    let cs = getFieldValue('condition-selection');
    if (cs === 'between') {
      this.setState({isShowSec: true});
    } else {
      this.setState({isShowSec: false});
    }
    if (cs === 'is not null' || cs === 'is null') {
      this.setState({
        isShowfirstSV: false
      });
      setFieldsValue({
        'value-selection': undefined
      });
    } else {
      this.setState({
        isShowfirstSV: true
      });
    }

    //三级下拉框多选
    let cf = getFieldValue('condition-factor');
    const cfMultArr = [
      '应用程序名',
      '执行结果',
      '时间域',
      '审计级别',
      '数据库类型'
    ]; //, '服务端IP',  '物理地址', '主机名'
    if (cfMultArr.includes(cf) && (cs === 'in' || cs === 'not in')) {
      this.setState(
        {
          isMulti: true
        },
        setFieldsValue({
          'value-selection': undefined
        })
      );
    } else {
      this.setState(
        {
          isMulti: false
        },
        setFieldsValue({
          'value-selection': undefined
        })
      );
    }
  };
  addSql = () => {
    const {getFieldValue, setFieldsValue} = this.props.form;
    const {isShowfirstSV} = this.state;
    let cs = getFieldValue('condition-selection');
    let vs = getFieldValue('value-selection');
    let ao = getFieldValue('and-or');
    //let sqlTextarea = getFieldValue("sql-textarea");
    let vs2 = getFieldValue('value-selection2');

    //如果in 或not in要加括号 , 如果是空就空
    let inSql = ''; //in 的情况要对每个逗号给出单引号
    let isBrack = '';
    if (!isShowfirstSV) {
      //is null的情况会隐藏后面一个输入框, 则不对其操作切割
    } else {
      if (vs == '' || vs == undefined) {
        Modal.error({
          title: '系统提示',
          okText: '确定',
          content: `请将条件填写完整！`
        });
        return;
      }
      if (!(vs instanceof Array) && vs != '' && vs != undefined)
        //下拉框选择就是数组, 否则就是输入框逗号隔开
        vs = vs.split(',');
      if (vs instanceof Array && vs.toString().includes(','))
        //输入框本来用enter隔开, 现在需要用逗号隔开
        vs = vs.toString().split(',');
      // console.log(
      //   "vs",
      //   vs,
      //   cs,
      //   ao,
      //   `${getFieldValue("factorLabel")}`,
      //   this.validTime(vs[0])
      // );
      inSql =
        vs.length > 1
          ? vs.reduce((ac, cv, ci) => {
              if (ci == 1) return `'${ac}','${cv}'`;
              return `${ac},'${cv}'`;
            })
          : `'${vs}'`;
      isBrack =
        cs === 'in' || cs === 'not in'
          ? `(${inSql})`
          : vs == ``
          ? ``
          : `'${vs}'`;
    }

    let vs2Sql = vs2 ? ` and '${vs2}'` : ``;
    if (
      getFieldValue('factorLabel') === '$登录时间' ||
      getFieldValue('factorLabel') === '$退出时间'
    ) {
      if (
        !this.validTime(vs[0]) ||
        (!this.validTime(vs2) && cs === 'between')
      ) {
        Modal.error({
          title: '系统提示',
          okText: '确定',
          content: `时间格式不正确`
        });
        return;
      }
    }
    if (getFieldValue('factorLabel') === '$返回/影响行数') {
      if (
        !this.validAllNaturalNum(vs[0]) ||
        vs[0] > 2147483648 ||
        vs[0] < -2147483648
      ) {
        Modal.error({
          title: '系统提示',
          okText: '确定',
          content: `输入的返回／影响行数超出取值范围。`
        });
        return;
      }
      if (
        (!this.validAllNaturalNum(vs2) ||
          vs2 > 2147483648 ||
          vs2 < -2147483648) &&
        cs === 'between'
      ) {
        Modal.error({
          title: '系统提示',
          okText: '确定',
          content: `输入的返回／影响行数超出取值范围。`
        });
        return;
      }
    }

    let sql = `"${getFieldValue('factorLabel')}" ${cs} ${isBrack}${vs2Sql}`;
    if (sql.includes('undefined')) {
      Modal.error({
        title: '系统提示',
        okText: '确定',
        content: `请将条件填写完整！`
      });
      return;
    }

    //let nextV = !sqlTextarea ? sql : sqlTextarea + ` ${ao} ${sql}`;
    //nextV = this.convertValue(nextV);
    sql = this.convertValue(sql);
    // setFieldsValue({
    //   //and 或or 追加sqltest
    //   "sql-textarea": nextV
    // });
    let {callbackArr} = this.state;
    if (callbackArr.length > 0) callbackArr.push(ao);
    callbackArr.push(sql);
    this.setState({callbackArr});
    this.props.callbackParentSql(callbackArr);
  };

  convertValue = v => {
    v = v.replace('成功', '0');
    v = v.replace('失败', '1');
    v = v.replace('高', '3');
    v = v.replace('中', '2');
    v = v.replace('低', '1');
    return v;
  };
  onTextChange = v => {
    this.setState({
      sql: v
    });
    this.props.callbackParentSql(v);
  };
  validTime = str => {
    var regDate = /^[0-9]{4}-[0-1]?[0-9]{1}-[0-3]?[0-9]{1} ([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/;
    return regDate.test(str);
  };
  validAllNaturalNum = str => {
    var re = /^-?[0-9]*$/; //判断字符串是否为正整数
    if (!re.test(str)) {
      return false;
    } else {
      return true;
    }
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    let {
      conditionSelect,
      selection,
      isfirstSVList,
      firstSVList,
      isMulti,
      isShowSec,
      isShowfirstSV
    } = this.state;
    //console.log('conditionSelect', conditionSelect)
    const conditionRender = conditionSelect.map((v, i) => {
      return (
        <Select.Option key={i} value={v.value}>
          {v.label}
        </Select.Option>
      );
    });
    const selectionRender = selection.map((v, i) => {
      return (
        <Select.Option key={i} value={v}>
          {v}
        </Select.Option>
      );
    });
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12}
      }
    };

    return (
      <div>
        <Row gutter={12}>
          <Col md={6}>
            <FormItem {...formItemLayout} label='条件因子'>
              {getFieldDecorator('condition-factor')(
                <Select placeholder='请选择' onChange={this.factorHandleChange}>
                  {conditionRender}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={3}>
            {getFieldDecorator('factorLabel')(
              <Input placeholder='' disabled />
            )}
          </Col>
          <Col md={3}>
            <FormItem {...formItemLayout} label=''>
              {getFieldDecorator('condition-selection')(
                <Select
                  placeholder='请选择'
                  onChange={this.selectionHandleChange}>
                  {selectionRender}
                </Select>
              )}
            </FormItem>
          </Col>
          {isShowfirstSV ? (
            <Col md={3}>
              {getFieldDecorator('value-selection')(
                isfirstSVList ? (
                  <Select
                    mode={isMulti ? 'tags' : 'combobox'}
                    key={isMulti ? 'tags' : 'combobox'}
                    placeholder='请选择'
                    style={{width: '100%', marginRight: 5}}>
                    {firstSVList}
                  </Select>
                ) : (
                  <Input placeholder='请输入' />
                )
              )}
            </Col>
          ) : (
            ''
          )}
          {isShowSec ? (
            <Col md={4}>
              <FormItem {...formItemLayout} label='AND' colon={false}>
                {getFieldDecorator('value-selection2')(
                  <Input placeholder='请输入' />
                )}
              </FormItem>
            </Col>
          ) : (
            ''
          )}
          <Col md={5}>
            {getFieldDecorator('and-or', {initialValue: 'AND'})(
              <Select style={{width: 80, marginRight: 10}}>
                <Select.Option key='and' value='AND'>
                  AND
                </Select.Option>
                <Select.Option key='or' value='OR'>
                  OR
                </Select.Option>
              </Select>
            )}
            <Button type='primary' onClick={this.addSql}>
              添加
            </Button>
          </Col>
        </Row>
        {/*<Row>
          <Col md={18}>
            {getFieldDecorator("sql-textarea", {
              onChange: e => this.onTextChange(e.target.value)
            })(<TextArea rows={4} />)}
          </Col>
        </Row>*/}
      </div>
    );
  }
}

ConditionForm.propTypes = {
  /**
   * 传入的下拉列表框数组值
   */
  conditionSelect: PropTypes.array.isRequired,
  /**
   * 把textarea输入框的值回传出去的回调方法
   */
  callbackParentSql: PropTypes.func.isRequired
};

ConditionForm.defaultProps = {
  conditionSelect: [],
  callbackParentSql: function() {}
};

export default ConditionForm;
