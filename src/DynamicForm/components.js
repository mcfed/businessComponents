import React from 'react';
import {Input, Select, Checkbox, Radio} from 'antd';

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

export class InputForm extends React.Component {
  render() {
    const {} = this.props;
    return <Input {...this.props} />;
  }
}

export class SelectForm extends React.Component {
  render() {
    const {} = this.props;
    return <Select {...this.props} />;
  }
}

export class CheckboxForm extends React.Component {
  render() {
    const {} = this.props;
    return <Checkbox {...this.props} />;
  }
}

export class CheckboxGroupForm extends React.Component {
  render() {
    const {} = this.props;
    return <CheckboxGroup {...this.props} />;
  }
}

export class RadioGroupForm extends React.Component {
  render() {
    const {} = this.props;
    return <RadioGroup {...this.props} />;
  }
}
