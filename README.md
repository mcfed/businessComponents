## useage

当前版本已发布 npm 仓库

- 运行命令安装包
  `npm install @mcfed/businessComponents`

## develop 规范要求

- `创建新功能`分支来源 `master` 统一采用 `feature/组件英文名称` 上进行代码开发，开发完成后提交 `merge_request` ,合并成功后`owner`将删除当前分支
- `修改BUG` 分支来源 `master` 统一采用 `hotfix/已有组件英文名称` 上进行代码开发，开发完成后提交 `merge_request` 合并成功后`owner`将删除当前分支
- `master` 与 `develop` 不允许直接提交，统一采用 branch 开发后，提交`merge_request` 到 `develop` 请求合并代码审核。
- CI 单元测试能过后才能提交代码合并请求，未通过一概不允许合并
- 合并请求时请 清楚描述 修改内容 `add : 新增XXX组件`
- 合并请求描述规范格式要求：`ADD:新增XXX组件`、`MODIFY:XXX组件增加单元测试`、`BUGFIXED:修改 XXX 组件 YYY bug`

- 合并 master 规范：`master`禁止提交代码，只允许来源`develop`内容

- 合并 发布版本内容 在`develop`分支工作
  - 修改 changelogs.md 文件 将发布描述版本内容
  - 修改 version 号 配置，防止合并到 `master` 后发起发布失败(已发布版本号不允许二次发布)
  - 合并将要发布的版本内容合并
  - 提交 `meger_request` 到 `master` 在`master`合并 CI 自动发版成功

### 组件规范

- 新增组件源码位于`src`目录下，组件采用`大驼峰（UpperCamel）`命名，以组件名作为目录名，如`./src/FormItem/`。
- 新增组件目录必须包含 style 用于样式分包。
- 单元测试目录 **tests**, storybook 目录 **stories**, 如有需要符合目录规范
- 组件目录下必须具有`index`入口文件，入口文件必须具有`default`导出
- 组建目录下必须具有 style 文件夹 若有需要添加样式 则在 style/index.js/ts 中引入
- 当一个组件目录下存在多个待导出组件时，采用`ComponentA.ComponentB`的形式导出非默认组件
- 组件样式可使用下面的样式分包使用或直接引入 dist/style.css 或 dist/style.less 中的全部样式（同 antd 样式用法）

### 使用说明

请移步至[这里](./docs/usage/basic.md)

### 样式分包使用

- 使用 babel-plugin-import
- 配置
  >

```javascript
 loader:'babel-loader',
 options:{
   plugins:[
          "import",{
            libraryName:'@mcf/components',
            libraryDirectory:"lib",
            camel2DashComponentName:false,
            style:true
          },"@mcf/components"
        ]
 }

```
