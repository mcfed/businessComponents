## SwitchConfirm component

useage

```jsx
import {SwitchConfirm} from '@mcf/components';
class App extends React.Component {
  handleChangeSwitch(checked: boolean, action: () => void) {
    Modal.confirm({
      title: checked ? '111' : '222',
      onOk: () => {
        action();
      }
    });
  }
  render() {
    return (
      <SwitchConfirm
        onSwitchChange={this.handleChangeSwitch.bind(this)}></SwitchConfirm>
    );
  }
}
```

## Options

> onSwitchChange 作为改变回调函数 代替 onChange 接收到 checked （状态） 和 后续操作 action 若希望 switch 状态改变 则需要调用 action

| 参数           | 说明           | 类型                     | 默认值 |
| -------------- | -------------- | ------------------------ | ------ |
| onSwitchChange | 必填，改变函数 | function(checked,action) | -      |
