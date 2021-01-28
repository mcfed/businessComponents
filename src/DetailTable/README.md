# DetailTable 组件

> 详情表格组件，支持两种显示  模式，对象和数组，支持数组配置  显示 key 与 value

## Usage

```
const add = [
      {
        name: () => <div>123</div>,
        value: '1231'
      },
      {
        name: '2',
        value: '1231'
      },
      {
        name: '3',
        value: '1231'
      },
]
const add = {
      adf: 1231,
      sdf: 1231,
      ads: 1231,
      acddf: 1231,
      adadf: 1231,
      a32df: 1231,
      cda: 1231
    }
<DetailTable tableClass={'table'} mode='object' labelKey={'label'} valueKey={'value'} dataSource={add} columnNumber={2} />

```

## Option

| 参数         | 说明                                                 | 类型         |
| ------------ | ---------------------------------------------------- | ------------ |
| mode         | 支持数组模式和对象模式（'array',object）默认数组模式 | string       |
| dataSource   | 传递数据， 根据类型传递相应的数据                    | array,object |
| columnNumber | 定义列数，不得小于 0                                 | number       |  |
| tableClass   | 表格  样式                                           | string       |
| labelKey     | 数组模式下配置显示名称 key 值，默认 label            | string       |
| valueKey     | 数组模式下配置显示名称 value 值，默认 value          | string       |
