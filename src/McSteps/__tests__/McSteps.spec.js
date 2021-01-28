import {shallow} from 'enzyme';
import React from 'react';

import McTestSteps from '../index.tsx';

const setup = props => {
  const wrapper = shallow(<McTestSteps {...props} />);

  return {
    wrapper,
    props
  };
};

describe('快照测试', () => {
  it('全页快照', () => {
    const props = {
      steps: [
        {
          text: '第一步',
          description: '我是第一步',
          path: 'first',
          component: '1'
        },
        {
          text: '第二步',
          description: '我是第二步',
          path: 'second',
          component: '2'
        },
        {
          text: '第三步',
          description: '我是第三步',
          path: 'third',
          component: '3'
        }
      ],
      location: {
        pathname: ''
      }
    };
    const {wrapper} = setup(props);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('全方法测试', () => {
  const props = {
    steps: [
      {
        text: '第一步',
        description: '我是第一步',
        path: 'first',
        component: '1'
      },
      {
        text: '第二步',
        description: '我是第二步',
        path: 'second',
        component: '2'
      },
      {
        text: '第三步',
        description: '我是第三步',
        path: 'third',
        component: '3'
      }
    ],
    location: {
      pathname: '/third'
    },
    history: {
      push: jest.fn()
    }
  };
  it('goRoutes 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    instance.goRoutes(1);
    expect(instance.state).toEqual({
      currentIndex: 0,
      step: 1
    });
  });
  it('getCurrentStep 方法测试', () => {
    const {wrapper} = setup(props);
    const instance = wrapper.instance();
    expect(instance.getCurrentStep()).toBe(instance.state.step);
  });
});
