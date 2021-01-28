import React from 'react';
import {render, shallow, mount} from 'enzyme';

import HeadSearchBar from '../index';
const setup = props => {
  const fn = jest.fn();
  const wrapper = mount(
    <HeadSearchBar filterSubmitHandler={fn}>
      <div>123</div>
    </HeadSearchBar>
  );
  return {
    wrapper: wrapper
  };
};

describe('headsearchbar', () => {
  //   it('deafault test ', () => {
  //     const wrapper = render(
  //       <HeadSearchBar filterSubmitHandler={() => {}}>
  //         <div></div>
  //       </HeadSearchBar>
  //     );
  //     expect(wrapper).toMatchSnapshot();
  //   });

  it('method handlesearch', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();

    instance.handleSearch({preventDefault: jest.fn()}, {a: 1, b: 2});

    expect(wrapper.prop('filterSubmitHandler')).toHaveBeenCalled();

    instance.form = {
      validateFieldsAndScroll: jest.fn()
    };

    instance.handleSearch({preventDefault: jest.fn()}, undefined);
    expect(instance.form.validateFieldsAndScroll).toHaveBeenCalled();
  });

  it('method saveformref test', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();

    instance.saveFormRef({props: {form: 111}});
    expect(instance.form).toEqual(111);
  });

  it('method renderFields test', () => {});
});
