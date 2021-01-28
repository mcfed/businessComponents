## Permission

> 用于判断子组件是否需要渲染，一般用于权限判断或状态判断是否可见

- 只于用于简单的判断状态，不适用于｀嵌套场景｀ 和 ｀ if else ｀

## Usage

| 参数       |                    说明                    |    类型 | 默认值 |
| ---------- | :----------------------------------------: | ------: | -----: |
| expression | 表达式结果为真渲染子组件可见，否则，不可见 | Boolean |  false |

使用方式

```html
<Permission expression="{true}"> <button>你来点我呀</button> </Permission>
```

if else 代替方案

```html
<Permission expression="{true}"> <button>你来点我呀</button> </Permission>
<Permission expression="{false}"> <button>你看我不见</button> </Permission>
```
