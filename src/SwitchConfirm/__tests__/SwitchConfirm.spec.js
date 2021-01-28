import React from 'react';
import {shallow, mount} from 'enzyme';

import SwitchConfirm from '../index';
import {Modal} from 'antd';

Modal.confirm = jest.fn();

const setup = cprops => {
  const defaultProps = {
    confirm: jest.fn()
  };
  const props = Object.assign({}, defaultProps, cprops);
  const wrapper = shallow(<SwitchConfirm {...props} />);
  return {
    wrapper,
    props
  };
};

describe('快照测试', () => {
  it('switchconfirm  ', () => {
    const {wrapper} = setup();

    expect(wrapper).toMatchSnapshot();
  });
});

describe('switchconfirm method test', () => {
  it('translateChecked test', () => {
    const {wrapper} = setup();
    const instance = wrapper.instance();

    expect(instance.translateChecked({}, true)).toEqual(true);
    expect(instance.translateChecked({}, false)).toEqual(false);
    expect(instance.translateChecked({}, undefined)).toEqual(false);

    expect(
      instance.translateChecked(
        {
          currentOption: 'on',
          checkedOption: 'on'
        },
        undefined
      )
    ).toEqual(true);
    expect(
      instance.translateChecked(
        {
          currentOption: 'off',
          checkedOption: 'on'
        },
        undefined
      )
    ).toEqual(false);
  });

  it('translateCustomChecked test 1', () => {
    const {wrapper, props} = setup({
      uncheckedOption: 'off',
      checkedOption: 'on'
    });
    const instance = wrapper.instance();

    expect(instance.translateCustomChecked(true)).toEqual(props.checkedOption);
    expect(instance.translateCustomChecked(false)).toEqual(
      props.uncheckedOption
    );
  });

  it('translateCustomChecked test 2', () => {
    const {wrapper, props} = setup();
    const instance = wrapper.instance();

    expect(instance.translateCustomChecked(true)).toEqual(true);
    expect(instance.translateCustomChecked(false)).toEqual(false);
  });

  // it('componentDidMount test 1', () => {
  //   const {wrapper, props} = setup();
  //   const instance = wrapper.instance();

  //   instance.componentDidMount();
  //   expect(wrapper.state('checked')).toEqual(false);
  // });
  // it('componentDidMount test 2', () => {
  //   const {wrapper, props} = setup({
  //     checked: true
  //   });
  //   const instance = wrapper.instance();

  //   instance.componentDidMount();
  //   expect(wrapper.state('checked')).toEqual(true);
  // });

  it('componentWillReceiveProps test 1', () => {
    const {wrapper, props} = setup();
    const instance = wrapper.instance();

    instance.componentWillReceiveProps({
      checked: true,
      currentOption: 'on'
    });
    expect(wrapper.state('checked')).toEqual(true);
  });
  it('componentWillReceiveProps test 2', () => {
    const {wrapper, props} = setup();
    const instance = wrapper.instance();

    instance.componentWillReceiveProps(props);
    expect(wrapper.state('checked')).toEqual(false);
  });

  it('handleChange test 1', () => {
    const {wrapper, props} = setup();
    const instance = wrapper.instance();

    expect(instance.handleChange(true)).toEqual(undefined);
    expect(Modal.confirm).toHaveBeenCalled();
  });
});
