import * as React from 'react';
import fetch from 'cross-fetch';
import {stringify} from 'qs';
// import Form, {FormItemProps} from 'antd/es/form';
// import Select from 'antd/es/select';
import {FormItemProps} from 'antd/es/form';
import {GetFieldDecoratorOptions} from 'antd/es/form/Form';
import {Form, Select} from 'antd';

import {FormRefContext, LayoutRefContext} from '../BaseForm';
import {FetchUtils} from '@mcfed/utils';

type fnOrBoolType = ((form: any) => boolean) | boolean | undefined;
type fetchParamsType = object | ((form: any) => object);
type fetchCallbackType = (result: any) => any[];

interface CustFormItemProps extends FormItemProps {
  /**
   * 设置表单域内字段 id 的前缀
   */
  name: string;
  /**
   * FormItem 包裹的子组件
   */
  children: React.ReactElement;
  /**
   * 禁用表单项，也不做 redux store 传参值
   */
  disabled?: fnOrBoolType;
  /**
   * 不渲染表单项，也不做 redux store 传参值
   */
  renderable?: fnOrBoolType;
  /**
   * 设置表单布局样式
   */
  formLayout?: object;
  /**
   * 设置表单布局样式
   */
  columns?: number;
  /**
   * 给DOM元素或子组件注册引用信息
   */
  formRef?: any;
  /**
   * 下拉框下拉菜单内容
   */
  options?: any[];
  /**
   * 自定义下拉框下拉菜单的渲染方式
   */
  renderItem?: (it: any, idx: number) => React.ReactElement;
  /**
   * URL 发起 xhr 请求获取 options 数据，提供 renderItem 渲染节点
   */
  fetch?: string;
  /**
   * URL 发起 xhr 请求时带的参数
   */
  fetchParams?: fetchParamsType;
  /**
   * URL 发起 xhr 请求后的回调函数
   * @example fetchCallback(res){ return res.json()}
   */
  fetchCallback?: fetchCallbackType;
  /**
   * 对fetchCallBack返回的数据，根据包裹的子组件，设置数据源名称
   */
  dataSourceProp?: string;
  /**
   * 是否基于 parentNode 渲染 getPopupContainer:triggerNode => triggerNode.parentNode
   */
  containerTo?: boolean;
  /**
   * 自定义用来循环渲染树节点的数据属性名称
   */
  loopProp?: string;
  /**
   * 给 FormItem 包裹的子组件设置默认值
   */
  defaultValue?: any;
}

type CustFormItemType = CustFormItemProps & GetFieldDecoratorOptions;

export class FormItem extends React.Component<CustFormItemType, any> {
  static defaultProps = {
    containerTo: true
  };
  constructor(props: CustFormItemType) {
    super(props);
    const options = props.options;
    this.state = {
      childData: []
    };

    //childData init
    if (options !== undefined) {
      if (options instanceof Array) {
        this.state = {
          childData: options
        };
      }
    }
  }
  componentDidMount() {
    if (this.props.fetch !== undefined) {
      this.fetchData(
        this.props.fetch,
        this.props.fetchParams,
        this.props.fetchCallback
      );
    }
  }
  componentWillReceiveProps(nextProps: CustFormItemProps) {
    const {options, fetch, fetchParams} = nextProps;
    if (!this.isObjectJSONSame(options, this.props.options)) {
      this.setChildData(options);
    }

    if (fetch !== undefined) {
      if (fetch !== this.props.fetch) {
        this.fetchData(fetch, nextProps.fetchParams, nextProps.fetchCallback);
      }

      if (fetchParams !== undefined) {
        if (
          typeof fetchParams === 'function' ||
          (typeof fetchParams === 'object' &&
            !this.isObjectJSONSame(fetchParams, this.props.fetchParams))
        ) {
          this.fetchData(fetch, fetchParams, nextProps.fetchCallback);
        }
      }
    }
  }
  isObjectJSONSame(obj1: any, obj2: any) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  fetchData(
    fetchUrl: string,
    fetchParams?: fetchParamsType,
    fetchCallback?: fetchCallbackType
  ) {
    const params = this.compileFetchParams(fetchParams);
    FetchUtils.fetchGet(fetchUrl, {body: params}).then((result: any) => {
      if (fetchCallback !== undefined) {
        this.setChildData(fetchCallback(result));
      } else {
        this.defaultSetChildData(result);
      }
    });
    // const defaultOptions = {
    //   method: 'GET'
    // };
    // let url = this.compileFetchUrl(fetchUrl, fetchParams);
    // fetch(url, defaultOptions)
    //   .then(data => data.json())
    //   .then(result => {
    //     if (fetchCallback !== undefined) {
    //       this.setChildData(fetchCallback(result));
    //     } else {
    //       this.defaultSetChildData(result);
    //     }
    //   });
  }
  compileFetchParams(fetchParams?: fetchParamsType) {
    const {formRef} = this.props;
    if (fetchParams === undefined) {
      return undefined;
    }
    if (typeof fetchParams === 'function') {
      return fetchParams(formRef);
    } else {
      return fetchParams;
    }
  }

  compileFetchUrl(fetchUrl: string, fetchParams?: fetchParamsType) {
    const {formRef} = this.props;
    let url = fetchUrl;
    if (fetchParams === undefined) {
      return url;
    }

    if (typeof fetchParams === 'function') {
      url = [fetchUrl, stringify(fetchParams(formRef))].join('?');
    } else {
      url = [fetchUrl, stringify(fetchParams)].join('?');
    }

    return url;
  }
  defaultSetChildData(result: any) {
    if (result.code == 0) {
      this.setChildData(result.data.items);
    }
  }
  setChildData(dataList?: any[]) {
    if (dataList === undefined) {
      return;
    }
    if (!(dataList instanceof Array)) {
      throw 'childData 格式有误';
    }
    this.setState({
      childData: dataList
    });
  }
  isPropsTrue(prop: fnOrBoolType) {
    const {formRef} = this.props;
    if (typeof prop === 'function') {
      return prop.call(this, formRef);
    }
    if (typeof prop === 'boolean') {
      return prop;
    }
    return true;
  }

  fieldDisabledProp(disabled: fnOrBoolType) {
    if (disabled === undefined) {
      return {};
    }
    return {disabled: this.isPropsTrue(disabled)};
  }

  fieldRenderableProp(renderable: fnOrBoolType) {
    if (renderable === undefined) {
      return true;
    }
    return this.isPropsTrue(renderable);
  }
  renderItem(it: any, idx: number) {
    return (
      <Select.Option key={idx} value={it.value}>
        {it.label}
      </Select.Option>
    );
  }
  renderTreeItem(it: any) {
    return '';
  }
  loopRenderTreeNode(
    data: any[],
    loopProp: string,
    renderItem: any
  ): React.ReactNode {
    const renderItemFinal =
      renderItem !== undefined ? renderItem : this.renderTreeItem;
    return data.map((item: any) => {
      if (item[loopProp] && item[loopProp].length > 0) {
        return React.cloneElement(
          renderItemFinal(item),
          {},
          this.loopRenderTreeNode(item[loopProp], loopProp, renderItem)
        );
      }
      return React.cloneElement(renderItemFinal(item));
    });
  }
  renderChildNode(childData: any[]) {
    const {renderItem, loopProp} = this.props;
    const _this = this;
    if (loopProp !== undefined) {
      return this.loopRenderTreeNode(childData, loopProp, renderItem);
    }
    return childData.map((it: any, idx: number) => {
      return renderItem !== undefined
        ? renderItem(it, idx)
        : _this.renderItem(it, idx);
    });
  }

  renderFields(element: React.ReactElement) {
    const _this = this;
    const {childData} = this.state;
    const {disabled, containerTo, dataSourceProp} = this.props;
    const {defaultValue, children, ...otherProps} = element.props;
    let containerToProps = {};
    if (
      containerTo &&
      //@ts-ignore
      element.type.name === 'Select' &&
      !element.props.changeCalendarContainer
    ) {
      containerToProps = {
        getPopupContainer: (triggerNode: any) => triggerNode.parentNode
      };
    }

    const elementProps = Object.assign(
      {},
      otherProps,
      containerToProps,
      this.fieldDisabledProp(disabled)
    );
    if (dataSourceProp !== undefined) {
      return React.createElement(
        element.type,
        {...elementProps, [dataSourceProp]: childData},
        children
      );
    }
    if (childData.length > 0) {
      return React.createElement(
        element.type,
        elementProps,
        _this.renderChildNode(childData)
      );
    }
    //@ts-ignore
    if (element.type.name === 'TreeSelect' && childData.length === 0) {
      return React.createElement(
        element.type,
        {...elementProps, treeData: []},
        children
      );
    }
    return React.createElement(element.type, elementProps, children);
  }

  compileWrapperCols() {
    let wrapperColsProps = {};
    const {label, formLayout, columns} = this.props;
    if (label === undefined) {
      wrapperColsProps = {
        wrapperCol: {
          span: 24
        }
      };
    } else if (columns !== 1 && Number(columns)) {
      const labelColSpan = Math.round(
        //@ts-ignore
        formLayout.labelCol.span / Number(columns)
      );
      wrapperColsProps = {
        labelCol: {
          span: labelColSpan
        },
        wrapperCol: {
          span: 24 - labelColSpan
        }
      };
    }

    return wrapperColsProps;
  }

  compileValue(element: any) {
    const {defaultValue} = element.props;
    if (defaultValue === null) {
      return undefined;
    }
    if (this.props.defaultValue !== undefined) {
      return this.props.defaultValue;
    }
    return defaultValue;
  }

  fixedPropFieldFrom() {
    const {name, label, rules, children} = this.props;
    return {
      fixedFieldName: name !== undefined ? name : children.props.name,
      fixedFieldLabel: label !== undefined ? label : children.props.label,
      fixedFieldRules: rules !== undefined ? rules : children.props.rules
    };
  }

  compileStyleProps() {
    //针对hidden input antd 有margin 空开 处理
    const element = this.props.children;
    let styles = {};
    if (element.props.type === 'hidden') {
      styles = {
        style: {marginBottom: 0}
      };
    }
    return styles;
  }

  render() {
    const {
      name,
      label,
      renderable,
      formRef,
      options,
      dataSourceProp,
      formLayout,
      containerTo,
      fetch,
      fetchCallback,
      loopProp,
      renderItem,
      children,
      ...otherProps
    } = this.props;
    const {getFieldDecorator} = formRef;
    const element = this.props.children;
    // const {defaultValue} = element.props;
    const transferValue = this.compileValue(element);
    const isFormContextComing = getFieldDecorator !== undefined;
    const wrapperColsProps = this.compileWrapperCols();
    const {
      fixedFieldName,
      fixedFieldLabel,
      fixedFieldRules
    } = this.fixedPropFieldFrom();
    const styleProps = this.compileStyleProps();

    return this.fieldRenderableProp(renderable) && isFormContextComing ? (
      <Form.Item
        label={fixedFieldLabel}
        {...Object.assign(
          {},
          formLayout,
          styleProps,
          wrapperColsProps,
          otherProps,
          {
            rules: fixedFieldRules
          }
        )}>
        {getFieldDecorator(fixedFieldName, {
          ...otherProps,
          initialValue: transferValue
        })(this.renderFields(element))}
      </Form.Item>
    ) : null;
  }
}

export default function FormItemRender(props: CustFormItemType) {
  return (
    <FormRefContext.Consumer>
      {formRef => (
        <LayoutRefContext.Consumer>
          {formLayout => (
            <FormItem {...props} formLayout={formLayout} formRef={formRef}>
              {props.children}
            </FormItem>
          )}
        </LayoutRefContext.Consumer>
      )}
    </FormRefContext.Consumer>
  );
}
