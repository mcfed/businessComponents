# FileSet

> fileSet 组件用于将表单项进行分组

## Usage

```

<FieldSet title='标题' display='show' onChange={this.callBack}>
      <FormItem>
        <Input placeholder="Username" />
      </FormItem>
</FieldSet>

```

## Option

| 参数     | 说明                                                                         | 类型   |
| -------- | ---------------------------------------------------------------------------- | ------ |
| title    | 分组标题                                                                     | string |
| display  | 默认展开合并，如果不配置，默认显示表单，不能展开隐藏，配置后，展开隐藏可使用 | string |
| onChange | 展开合并回调                                                                 | fun    |  |
