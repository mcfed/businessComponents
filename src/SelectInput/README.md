# SelectInput 组件

## Usage

```jsx
import {SelectInput, FormItem} from '@mced/components';

return (
  <FormItem name='kw' className='search-bar-input-item' defaultValue={query.kw}>
    <SelectInput
      afterAddon={
        <Icon type='save' onClick={this.handleAddOption.bind(this)} />
      }
      optionLabelProp='selectname'>
      {this.renderOption()}
    </SelectInput>
  </FormItem>
);
```

## Options

| 参数       | 说明         | 类型      | 默认值 |
| ---------- | ------------ | --------- | ------ |
| children   | 下拉选项内容 | ReactNode | null   |
| afterAddon | 后置操作按钮 | ReactNode | null   |
