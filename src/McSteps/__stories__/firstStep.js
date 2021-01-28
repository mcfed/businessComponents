import * as React from 'react';
import {Button} from 'antd';

class FirstStep extends React.Component {
  onSubmit = () => {
    console.log('当前是第' + this.props.getCurrentStep() + '步');
  };
  goNext = () => {
    this.props.goRoutes(2);
  };
  render() {
    return (
      <div>
        <div>我是step1</div>
        <Button onClick={this.goNext}>下一步</Button>
        <Button onClick={this.onSubmit}>提交</Button>
      </div>
    );
  }
}

export default FirstStep;
