import React, {PropTypes} from 'react';
import {storiesOf} from '@storybook/react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// import md from "../README.md";

import McSteps from '../index';
import FirstStep from './firstStep';
import SecondStep from './secondStep';
import ThirdStep from './thirdStep';

const stories = storiesOf('McSteps', module);

stories.addParameters({jest: ['McSteps.spec.js']});

stories.add('基础使用', () => {
  const Index = props => {
    const steps = [
      {
        text: '第一步',
        description: '我是第一步',
        path: 'first',
        component: FirstStep
      },
      {
        text: '第二步',
        description: '我是第二步',
        path: 'second',
        component: SecondStep
      },
      {
        text: '第三步',
        description: '我是第三步',
        path: 'third',
        component: ThirdStep
      }
    ];
    return (
      <McSteps steps={steps} />

      // 函数式调用函数组件提高性能 /components/Step
      // Step({
      //   steps,
      //   ...props
      // })
    );
  };

  const App = (
    <Router>
      <Route path='/:path' component={Index} />
    </Router>
  );

  return App;
});
