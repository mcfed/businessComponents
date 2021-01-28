# ExpandList 组件

> 封装的带有加载更多的 List 组件，支持本地分页，支持自定义 header，支持设置分页条数，支持点击加载更多，支持自定义设置 list 内容

## Usage

```

  renderItems = res => {
    return <div>{res.dbserverIp}</div>
  }

  <ExpandList header="IP Test" renderItems = {this.renderItems} pageSize="3" fetchListUrl = {`/capaa/dbfirewall/v2/sqlWhiteListSetting?id=${record.dbserverId}`} />

```

## Option

| 参数         | 说明                       | 类型             |
| ------------ | -------------------------- | ---------------- |
| header       | 需要显示到 header 的文本   | string/reactNode | 必填 |
| renderItems  | 支持自定义 list 的项目内容 | String/reactNode | 必填 |
| pageSize     | 分页条数                   | number           |  | 默认 10 |
| fetchListUrl | 需要执行的后端数据的请求   |  string          | 必填 |
