import React from 'react';
import {render, shallow, mount} from 'enzyme';

import BaseForm, {AdvancedForm} from '../index';

describe('advancedForm autosubmit', () => {
  it('base test', () => {
    const wrapper = shallow(
      <AdvancedForm autoSubmitForm={true} onSearch={jest.fn()}></AdvancedForm>
    );
    const instance = wrapper.instance();

    instance.getForm().setFieldsValue({a: 1, b: 2});
    expect(wrapper.prop('onSearch')).toHaveBeenCalled();
  });
  it('autosubmit form false ', () => {
    const wrapper = shallow(
      <AdvancedForm autoSubmitForm={false} onSearch={jest.fn()}></AdvancedForm>
    );
    const instance = wrapper.instance();

    instance.getForm().setFieldsValue({a: 1, b: 2});
    expect(wrapper.prop('onSearch')).not.toHaveBeenCalled();
  });
});

describe('baseform test', () => {
  it('render', () => {
    const wrapper = render(
      <BaseForm
        autoSubmitForm={true}
        onSearch={jest.fn}
        hideRequiredMark={true}>
        <div>111</div>
        <div>222</div>
      </BaseForm>
    );
    expect(wrapper).toMatchSnapshot();
  });
  const wrapper = shallow(
    <BaseForm autoSubmitForm={true} onSearch={jest.fn} hideRequiredMark={true}>
      <div>111</div>
      <div>222</div>
    </BaseForm>
  );
  it('base test', () => {
    expect(wrapper.prop('hideRequiredMark')).toEqual(true);
  });
});
