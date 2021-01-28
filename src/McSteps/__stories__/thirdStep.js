import * as React from 'react';
import {Button} from 'antd';

class ThirdStep extends React.Component {
  onSubmit = () => {
    console.log('当前是第' + this.props.getCurrentStep() + '步');
  };
  goLast = () => {
    this.props.goRoutes(2);
  };
  // goNext = () => {
  //   this.props.goRoutes(3)
  // }
  goBack = () => {
    // this.props.history.push('/')
    console.log('goback');
  };
  render() {
    return (
      <div>
        <div>我是step3</div>
        <Button onClick={this.goLast}>上一步</Button>
        {/* <Button onClick={this.goNext}>下一步</Button> */}
        <Button onClick={this.goBack}>关闭</Button>
        <Button onClick={this.onSubmit}>提交</Button>
      </div>
    );
  }
}

export default ThirdStep;
