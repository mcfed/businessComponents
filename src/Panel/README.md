# Panel 组件

## Usage

```jsx

  import {Panel} from 'mcf-components'

  renderPanel(){
    return (
    <Panel>
      panel
    </Panel>
    )
  }
```

## Options

| 参数           | 说明                                                   | 类型                    | 默认值           |
| -------------- | ------------------------------------------------------ | ----------------------- | ---------------- |
| prefixCls      | ant-panel 前缀                                         | string                  | ant-panel        |
| onOK           | 确定按钮响应事件                                       | function                | 无效--待后续验证 |
| onCancel       | 取消按钮响应事件                                       | function                |                  |
| title          | panel 面板标题                                         | string                  | ""               |
| okText         | 确认按钮文字自定义                                     | string                  | 无效--待后续验证 |
| cancelText     | 取消按钮文字自定义                                     | string                  | 无效--待后续验证 |
| footer         | 自定义 footer                                          | bool、element、function |                  |
| confirmLoading | 二次确认时的 loading 状态，true 时确定操作按钮不可操作 | bool                    | false            |
| locale         | 国际化                                                 | object                  |                  |
| loading        | 整个 panel 的 loading 状态，true 时整个面板不能操作    | bool                    | false            |
