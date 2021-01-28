#DataTable 组件

> 继承于 antd Table 实现并进行功能扩展

- 默认设定固定配置分页
- 扩展实现列配置功能实现隐藏显示列

## 默认配置

> 简化全局使用的配置参数

```
  page:{},
  prefixCls: 'ant-table',
  showQuickJumper:true,
  pagination:{
     showTotal:total => `共 ${total} 条`,
     // showQuickJumper:true,
     showSizeChanger:true,
     pageSizeOptions:['10','20','50','100'],
  },
  //  scroll:{ y: 500 },
  style:{
    width:"100%"
  },
  showConfig:false,
  columns:[]

```

## DataTable

> 功能扩展开启 showConfig 后，自动增加配置列 fixed 右侧

| 参数       |      说明      |  类型 | 默认值 |
| ---------- | :------------: | ----: | -----: |
| showConfig | 开启列配置模式 | Array |  false |

> showConfig 存在 BUG 还需要修订，表格基本上功能可正常使用

## TODO:

## REFACTOR:
