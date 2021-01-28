---
expression:true
---

通过设置 `expression` 属性指定是否显示 `children`里的元素进行输入展示，从而达到权限判断下是不是出现元素。可是一个或多个 children 元素

其他更高级的 HOC 后续再进行补充开发

```jsx
import Permission from 'ant-design-pro/lib/Permission';

ReactDOM.render(
  <Permission expression={true}>
    <Button type='primary' icon='add' onClick={this.handleAddRoute.bind(this)}>
      添加
    </Button>
  </Permission>,
  mountNode
);
或;
ReactDOM.render(
  <Permission expression={this.isAdmin().bind(this)}>
    <Button type='primary' icon='add' onClick={this.handleAddRoute.bind(this)}>
      添加
    </Button>
  </Permission>,
  mountNode
);
```
