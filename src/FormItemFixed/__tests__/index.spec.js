import React from 'react';
import {shallow} from 'enzyme';
import FormItemFixed from '../index';

const setup = props => {
  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const defaultele = <div className='child'>abc</div>;
  const wrapper = shallow(
    <FormItemFixed {...props}>
      {(props && props.element) || defaultele}
    </FormItemFixed>
  );
  return {
    props,
    wrapper
  };
};

describe('FormItemFixed 组件测试', () => {
  it('是否正常渲染', () => {
    const {wrapper} = setup();
    expect(wrapper.find('.child').exists()).toBe(true);
  });

  it('默认类名为element-text-box', () => {
    const {wrapper} = setup();
    expect(wrapper.prop('className')).toBe('element-text-box');
  });

  it('若不需要修正css 传入isresetcs false，类名为element-noreset', () => {
    const {wrapper} = setup({
      isResetCss: false
    });
    expect(wrapper.prop('className')).toBe('element-noreset');
  });

  it('若传入的element 第一个不为表单元素 则默认isBeteen类名，保证后续文本环绕间距', () => {
    const {wrapper} = setup({
      element: '456'
    });
    expect(wrapper.prop('className')).toBe('element-text-box isBeteen');
  });

  it('若传入的element 第一个为表单元素 企鹅isrestcss 为false', () => {
    const {wrapper} = setup({
      element: '456',
      isResetCss: false
    });
    expect(wrapper.prop('className')).toBe('element-noreset isBeteen');
  });

  it('若无子元素 默认为element-text-box isBeteen 类名', () => {
    const wrapper = shallow(<FormItemFixed />);

    expect(wrapper.prop('className')).toBe('element-text-box isBeteen');
  });
});
