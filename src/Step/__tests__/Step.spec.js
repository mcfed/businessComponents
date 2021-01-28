import {shallow} from 'enzyme';
import React from 'react';

import Step, {ref} from '../index';

class First extends React.Component {
  onSubmit() {
    this.props.goToStep(2);
  }
  render() {
    return 'i am First step';
  }
}

class Second extends React.Component {
  onSubmit() {
    this.props.goToStep(3);
  }
  render() {
    return 'i am Second step';
  }
}

class Third extends React.Component {
  onSubmit() {}
  render() {
    return 'i am Third step';
  }
}

const setup = props => {
  const wrapper = shallow(<Step {...props} />);

  return {
    wrapper,
    props
  };
};

const steps = [
  {
    text: '第一步',
    description: '我是第一步',
    path: 'first',
    component: First
  },
  {
    text: '第二步',
    description: '我是第二步',
    path: 'second',
    component: Second
  },
  {
    text: '第三步',
    description: '我是第三步',
    path: 'third',
    component: Third
  }
];

describe('快照测试', () => {
  it('全页快照', () => {
    const props = {
      steps: steps
    };
    const {wrapper} = setup(props);

    expect(wrapper).toMatchSnapshot();
  });
});

describe('Step  render', () => {
  it('Step 正确渲染', () => {
    const {wrapper} = setup({steps: steps});
    expect(wrapper.find('First').exists()).toBe(true);
  });
});

describe('Step 点击事件', () => {
  delete window.location;
  window.location = {
    href: 'http://localhost/first',
    assign: url => {}
  };

  const props = {
    steps: steps,
    history: {
      push: jest.fn(path => {
        window.location.href = `http://localhost/${path}`;
      })
    }
  };
  it('点击下一步，能正确跳转，路由是否正确', () => {
    const {wrapper} = setup(props);
    expect(window.location.href.indexOf('first') > -1).toBe(true);
    ref.current = {
      onSubmit: () => {
        wrapper.instance().goToStep(2);
      }
    };
    wrapper
      .find('Button')
      .last()
      .props()
      .onClick();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
    expect(window.location.href.indexOf('second') > -1).toBe(true);
    expect(wrapper.find('Button').length).toBe(3);
  });

  it('没有上一步按钮', () => {
    const {wrapper} = setup(Object.assign({}, {showPrev: false}, {...props}));
    expect(window.location.href.indexOf('second') > -1).toBe(true);
    ref.current = {
      onSubmit: () => {
        wrapper.instance().goToStep(2);
      }
    };
    expect(wrapper.find('Button').length).toBe(2);
  });

  it('点击上一步，能正确跳转，路由是否正确', () => {
    const {wrapper} = setup(props);
    expect(window.location.href.indexOf('second') > -1).toBe(true);
    ref.current = {
      onSubmit: () => {
        wrapper.instance().goToStep(1);
      }
    };
    wrapper
      .find('Button')
      .at(1)
      .props()
      .onClick();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
    expect(window.location.href.indexOf('first') > -1).toBe(true);
  });
});

describe('Step 各参数是否生效', () => {
  it('steps 数据参数测试', () => {
    const {wrapper} = setup({
      steps: [
        {
          text: '第一步',
          description: '我是第一步',
          path: 'first',
          component: First
        },
        {
          text: '第二步',
          description: '我是第二步',
          path: 'second',
          component: Second
        }
      ]
    });
    expect(wrapper.find('Step').length).toBe(2);
    expect(
      wrapper
        .find('Step')
        .first()
        .props().title
    ).toBe('第一步');
    expect(
      wrapper
        .find('Step')
        .last()
        .props().description
    ).toBe('我是第二步');
    expect(wrapper.find('First').props().cancelText).toBe('取消');
    expect(wrapper.find('First').props().finishText).toBe('完成');
  });

  it('cancelText,finishText,showCancel 等其他参数测试', () => {
    const {wrapper} = setup({
      steps: [
        {
          text: '第一步',
          description: '我是第一步',
          path: 'first',
          component: First
        },
        {
          text: '第二步',
          description: '我是第二步',
          path: 'second',
          component: Second
        }
      ],
      cancelText: '我要取消',
      finishText: '返回',
      showCancel: false,
      backPath: 'index',
      showFinalLastStep: 'false',
      finalSubmitFunctionName: 'handleSubmit'
    });

    expect(wrapper.find('First').props().cancelText).toBe('我要取消');
    expect(wrapper.find('First').props().finishText).toBe('返回');
    expect(wrapper.find('First').props().backPath).toBe('index');
    expect(wrapper.find('First').props().showFinalLastStep).toBe('false');
    expect(wrapper.find('First').props().finalSubmitFunctionName).toBe(
      'handleSubmit'
    );
    expect(wrapper.find('Button').length).toBe(1);
    expect(
      wrapper
        .find('Button')
        .children()
        .text()
    ).toBe('下一步');
  });
});

describe('测试覆盖率', () => {
  it('最后一步,只有一步的情况', () => {
    const props = {
      steps: [
        {
          text: '第一步',
          description: '我是第一步',
          path: 'first',
          component: First
        }
      ],
      location: {
        pathname: ['', 'first']
      },
      showFinalLastStep: true
    };
    const {wrapper} = setup(props);
    ref.current = {
      onSubmit: () => {
        wrapper.instance().goToStep(1);
      }
    };
    wrapper
      .find('Button')
      .first()
      .props()
      .onClick();
  });

  it('最后一步，多步', () => {
    const props = {
      steps: [
        {
          text: '第一步',
          description: '我是第一步',
          path: 'first',
          component: First
        },
        {
          text: '第二步',
          description: '我是第二步',
          path: 'second',
          component: Second
        }
      ],
      location: {
        pathname: ['', 'first']
      },
      showFinalLastStep: true
    };
    const {wrapper} = setup(props);
    ref.current = {
      onSubmit: () => {
        wrapper.instance().goToStep(2);
      }
    };

    wrapper
      .find('Button')
      .first()
      .props()
      .onClick();
    wrapper
      .find('Button')
      .first()
      .props()
      .onClick();
  });

  it('最后一步，多步，有除了首尾两步之外的步数', () => {
    const props = {
      steps: [
        {
          text: '第一步',
          description: '我是第一步',
          path: 'first',
          component: First
        },
        {
          text: '第二步',
          description: '我是第二步',
          path: 'second',
          component: Second
        },
        {
          text: '第三步',
          description: '我是第三步',
          path: 'third',
          component: Third
        }
      ],
      location: {
        pathname: ['', 'first']
      },
      showFinalLastStep: true
    };
    const {wrapper} = setup(props);
    ref.current = {
      onSubmit: () => {
        wrapper.instance().goToStep(2);
      }
    };
    // console.log(wrapper.debug())
    // 点击第一步的下一步
    wrapper
      .find('Button')
      .first()
      .props()
      .onClick();
    // 点击第二步的上一步
    wrapper
      .find('Button')
      .first()
      .props()
      .onClick();
    // 点击第一步的取消
    wrapper
      .find('Button')
      .last()
      .props()
      .onClick();
  });
});
