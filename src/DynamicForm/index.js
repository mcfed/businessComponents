import React from 'react';
import PropTypes from 'prop-types';
import FormItem from '../FormItem';
import BaseForm from '../BaseForm';

export default class DynamicForm extends React.Component {
  saveFormRef(form) {
    this.form = form;
  }
  render() {
    const {formData, className, ...otherProp} = this.props;
    return (
      <BaseForm
        {...otherProp}
        className={className}
        ref={this.saveFormRef.bind(this)}>
        {formData.map(item => {
          const {component, ...others} = item;
          return React.createElement(
            FormItem,
            {key: others.name, name: others.name, children: others.children},
            React.createElement(component, others)
          );
        })}
      </BaseForm>
    );
  }
}

DynamicForm.propTypes = {
  /**
  tab 配置
  **/
  formData: PropTypes.array
};
