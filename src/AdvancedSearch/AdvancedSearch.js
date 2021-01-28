import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Icon, Button, Input} from 'antd';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import classNames from 'classnames';
import SubmitForm from '../BaseForm';
import FormItem from '../FormItem';
import Permission from '../Permission';
import Locale from './locale.js';

export default class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    defKeyType: null,
    placeHolder: '',
    items: [],
    show: false,
    displayItem: []
  };

  constructor(props) {
    super(props);
    this.state.loading = props.loading;
  }

  handleSearch = (e, values) => {
    e.preventDefault();
    let {filterSubmitHandler, defaultParams} = this.props;
    if (values) {
      filterSubmitHandler.call(this, Object.assign({}, values, defaultParams));
    } else {
      this.form.validateFieldsAndScroll((err, values) => {
        // console.log(this.form.getFieldsValue())
        // console.log(values)
        filterSubmitHandler.call(
          this,
          Object.assign({}, values, defaultParams)
        );
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({
        loading: nextProps.loading
      });
    }
  }

  handleReset = () => {
    const form = this.form;
    const values = form.getFieldsValue();
    let emptyValue = {};
    // this.form.resetFields();
    for (var v in values) {
      // console.log(v)
      if (values.hasOwnProperty(v)) {
        emptyValue[v] = undefined;
      }
    }
    // console.log(emptyValue)
    form.setFieldsValue(emptyValue);
  };

  toggleExpand() {
    const {expand} = this.state;
    this.setState({
      expand: !expand
    });
  }

  // To generate mock Form.Item
  getFields() {
    const {children, layout, classNames} = this.props;
    let renderChildren;
    let formItemLayout =
      layout && layout !== 'inline'
        ? {
            labelCol: {
              span: 8
            },
            wrapperCol: {
              span: 16
            }
          }
        : {};
    if (React.Children.count(children) === 0) {
      return null;
    }
    if (this.state.expand == false) {
      renderChildren = [].concat(children).filter((ch, idx) => idx < 3);
    } else if (this.props.showConfig) {
      //高级配置后，前三固定 后四配置
      renderChildren = React.Children.toArray(children).filter((ch, idx) => {
        //return this.state.displayItem.indexOf(ch.props.name)>=0 || idx<3
        return (
          this.state.displayItem.indexOf(ch.props.name) >= 0 ||
          idx < this.props.showExpand
        );
      });
    } else {
      renderChildren = React.Children.toArray(children).filter(
        (ch, idx) => idx < this.props.showExpand + 4
      );
    }
    return renderChildren.map((it, i) => {
      let columns = it.props.columns || 1;
      let labelNum = Math.round(8 / columns),
        spancols = 8 * columns;
      formItemLayout = Object.assign({}, formItemLayout, {
        labelCol: {
          span: labelNum
        },
        wrapperCol: {
          span: 24 - labelNum
        }
      });

      // console.log(it.type === Input)
      if (it.type.name === 'Input') {
        return (
          <Col span={spancols} key={i}>
            <FormItem
              colon={true}
              {...formItemLayout}
              containerTo={false}
              className={classNames}>
              {React.cloneElement(it)}
            </FormItem>
          </Col>
        );
      } else {
        return (
          <Col span={spancols} key={i}>
            <FormItem
              colon={true}
              {...formItemLayout}
              containerTo={it.props.containerTo || true}
              className={classNames}>
              {React.cloneElement(it, {
                allowClear: it.props.allowClear == false ? false : true
              })}
            </FormItem>
          </Col>
        );
      }
    });
    //return children;
  }

  onTypeChange(value, option) {
    this.setState({
      placeHolder: option.props.placeholder
    });
  }
  handleAdvancedMenu(obj) {
    if (obj.key === 'advanced') {
      alert('call advanced');
    } else if (obj.key === 'clear') {
      this.handleReset();
    } else if (obj.key === 'preview') {
      alert('call restore');
    }
  }

  handleClose() {
    this.setState({
      show: false
    });
  }
  saveFormRef(insta) {
    if (insta) {
      this.form = insta.props.form;
    }
  }

  renderKeyword() {
    return (
      <Row gutter={20}>
        {/* this.renderKeyCatalog() */}
        {this.getFields()}
      </Row>
    );
  }
  renderSearchToolbar(locale) {
    let {loading, expand} = this.state;
    const {children} = this.props;
    const contextLocale = Object.assign({}, locale, this.props.locale);
    return (
      <div className='advanced-search-toolbar'>
        <Button
          htmlType='submit'
          disabled={loading}
          onClick={this.handleSearch.bind(this)}
          type='primary'>
          {contextLocale.searchText}
        </Button>
        {children.length > 3 ? (
          <Button type='ghost' onClick={this.toggleExpand.bind(this)}>
            {expand ? contextLocale.upText : contextLocale.downText}
            <Icon type={expand ? 'up' : 'down'} />
          </Button>
        ) : (
          ''
        )}
      </div>
    );
  }
  render() {
    let {
      showConfig,
      children,
      className,
      autoSubmitForm,
      layout,
      locale
    } = this.props;
    return (
      <div className={classNames('advanced-search-panel', className)}>
        <SubmitForm
          layout={layout}
          autoSubmitForm={autoSubmitForm}
          className='advanced-search-form'
          onSubmit={this.handleSearch.bind(this)}
          wrappedComponentRef={this.saveFormRef.bind(this)}>
          {this.renderKeyword()}
          {React.createElement(
            LocaleReceiver,
            {
              componentName: 'AdvancedSearch',
              defaultLocale: Locale
            },
            this.renderSearchToolbar.bind(this)
          )}
        </SubmitForm>
      </div>
    );
  }
}

AdvancedSearchForm.propTypes = {
  /**
  搜索按钮事件监听方法
  **/
  filterSubmitHandler: PropTypes.func,
  /**
  是否显示配置项,配置搜索条件显示
  **/
  showConfig: PropTypes.bool,
  /**
   * 设置搜索按钮载入状态
   */
  loading: PropTypes.bool,
  footer: PropTypes.element,
  /**
   * 设置国际化字段
   */
  locale: PropTypes.object,
  /**
   * 设置发送请求时带的默认参数
   */
  defaultParams: PropTypes.object,
  /**
  是否收展，超过指定个数后隐藏
  **/
  showExpand: PropTypes.number
};

AdvancedSearchForm.defaultProps = {
  autoSubmitForm: false,
  showConfig: false,
  loading: false,
  defaultParams: {},
  filterSubmitHandler: function() {},
  showExpand: 3,
  layout: 'horizontal'
};

//export default AdvancedSearchForm = Form.create()(AdvancedSearchForm)
