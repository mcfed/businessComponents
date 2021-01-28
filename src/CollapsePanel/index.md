## CollapsePanel

> 展开收起 panel 组件 ，通过传入的 control 结合表单值对 panel 展开或收起

## Usage

>

```html
  import {CollapsePanel} from 'mcf-components'

  renderForm(){
    return (
    <BaseForm>
      <CollapsePanel
        title={123}
        control={<Switch name="test" defaultValue={1} defaultChecked={true} />}
        showArrow={true}
        defaultActive={true}
      >
        <div>123123</div>
        <h2>enlsdkf</h2>
      </CollapsePanel>
      <CollapsePanel
        title={456}
        control={<Checkbox name="test1" defaultValue={0} />}
        showArrow={true}
        defaultActive={true}
      >
        <div>456456</div>
        <h2>enlsdkf</h2>
      </CollapsePanel>
      <CollapsePanel
        title={79}
        control={123}
        showArrow={true}
        defaultActive={true}
      >
        <div>97897</div>
        <h2>enlsdkf</h2>
      </CollapsePanel>
    </BaseForm>
    )
  }
```

## Options

| 参数        | 说明                                       | 类型    | 默认值    |
| ----------- | ------------------------------------------ | ------- | --------- |
| title       | Panel titile                               | any     | undefined |
| control     | 自定义渲染每个面板右上角的内容             | any     | undefined |
| content     | panel content                              | any     | undefined |
| forceRender | 被隐藏时是否渲染 DOM 结构                  | boolean | false     |
| disabled    | 禁用后的面板展开与否将无法通过用户交互改变 | boolean | false     |
| closeValues | 关闭值数组                                 | array   | []        |
