## TabsPanel

> TabsPanel：将多个功能模块或页面组件 按 Tabs 方式进行组合使用 tab 切换。

## Usage

>

```html
import {TabsPanel,Panel} from 'mcf-components' function swtchTabsPanel(props){
return (
<TabsPanel {...props}>
  <Panel title="身份授权" path="identityAuth">
    { registerModule(import("./identityAuth")) }
  </Panel>
  <Panel title="资产授权" path="assetAuth">
    { registerModule(import("./assetAuth"))}
  </Panel>
  <Panel title="assetMember" path="assetMember">
    { registerModule(import("./assetMember"))}
  </Panel>
  <Panel title="asset" path="assetMember"> <div>111</div> </Panel>
</TabsPanel>
) } //router config
<Route path="/switch/:moduleType" component="{swtchTabsPanel}" />
```

## Options

| 参数      | 说明                | 类型      | 默认值    | 必填 |
| --------- | ------------------- | --------- | --------- | ---- |
| history   | history 对象        | object    | undefined | [x]  |
| match     | 上级路由 match 对象 | object    | undefined | [x]  |
| children  | 节面页组件          | ReactNode | Panel     | [x]  |
| paramName | 路由参数名称        | string    | type      | []   |
