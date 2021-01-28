import React from 'react';
import {shallow, enzyme, render} from 'enzyme';
import ErrorBoundary from '../index.tsx';

const setup = (children, props) => {
  const wrapper = shallow(<ErrorBoundary {...props}>{children}</ErrorBoundary>);

  return {
    wrapper,
    children
  };
};

class TestCom extends React.Component {
  componentWillMount() {
    throw Error('扔个错误');
  }
  render() {
    return <div className='aa123'>123</div>;
  }
}

describe('ErrorBoundary 正确性测试', () => {
  it('若自组件未出现错误则正常渲染', () => {
    const {wrapper} = setup(<div className='aa' />);

    expect(wrapper.find('div.aa').exists()).toBe(true);
  });

  it.skip('若自组件有错误则展示出错信息', () => {
    const {wrapper} = setup(<TestCom />);

    console.log(
      wrapper.find('.aa123').exists(),
      wrapper.find('.error-info').exists(),
      wrapper.state('errorInfo')
    );
  });
});
