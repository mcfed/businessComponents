# EditTable 组件

> 可编辑表格 API 基于 antd 组件中的 Table 组件，拓展了两个属性 editComponent，editConfig

## Usage

```
editComponent: ()=> <Input placeholder='请输入名字'/>
editConfig:{
        rules: [{required:true, message: '请输入名字'},{validator: 自定义规则}]
  }
```

## Option

| 参数          | 说明                                                                                                                                                 | 类型      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| editComponent | 用于传递渲染的编辑组件,传递组件为 antd 基础  表单组件，也可自定义，需遵循 antd 组件的包装                                                            |  funciton |
| editConfig    | 用于传递初始值，验证规则等配置,支持 antd 表单基本校验方法， 可[查看文档](https://ant.design/components/form-cn/),支持按照 antd from 书写的自定义校验 | object    |
