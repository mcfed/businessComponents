import * as React from 'react';
// import Form from 'antd/es/form';
import {FormProps} from 'antd/lib/form';
import {Form} from 'antd';

export interface CustomFormComponentProps extends FormProps {
  /**
   * 统一设定子组件 FromItem 的布局
   */
  itemLayout?: object;
  /**
   * 统一设置样式前缀
   */
  prefixCls?: string;
  /**
   * 表单自动提交
   */
  autoSubmitForm?: boolean;
  /**
   * 任一表单域的值发生改变时调用的方法
   */
  onSearch?: any;
}

export const FormRefContext = React.createContext({});
export const LayoutRefContext = React.createContext({});

const FormCreate = Form.create;

class BaseForm extends React.Component<CustomFormComponentProps> {
  static defaultProps: CustomFormComponentProps = {
    prefixCls: 'ant-form',
    layout: 'horizontal',
    itemLayout: {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }
  };

  render() {
    const {
      form,
      itemLayout = {},
      children,
      autoSubmitForm,
      onSearch,
      ...otherProps
    } = this.props;
    return (
      //@ts-ignore
      <FormRefContext.Provider value={form}>
        <LayoutRefContext.Provider value={itemLayout}>
          <Form {...otherProps}>{children}</Form>
        </LayoutRefContext.Provider>
      </FormRefContext.Provider>
    );
  }
}
//@ts-ignore
const SubmitForm = FormCreate()(BaseForm);

class AdvancedFormClass extends BaseForm {}

function compileValue(Fields: any) {
  let json = {};
  for (const it in Fields) {
    //@ts-ignore
    json[it] = Fields[it]['value'];
  }
  return json;
}

export const AdvancedForm = FormCreate({
  onFieldsChange(props: any, changedFields, allFields) {
    console.log(11111, compileValue(allFields));
    if (props.autoSubmitForm) {
      props.onSearch && props.onSearch(compileValue(allFields));
    }
  }
  //@ts-ignore
})(AdvancedFormClass);

export default SubmitForm;
