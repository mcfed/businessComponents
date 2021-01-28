# 基本使用

## 下载依赖

```sh
npm install --save mcf-components
```

or

```sh
yarn add mcf-components
```

## 项目配置

### 基于 create-react-app

[前置步骤](https://3x.ant.design/docs/react/use-with-create-react-app-cn#高级配置)请移步至

```javascript
// config-overrides.js
const {override, fixBabelImports} = require('customize-cra');

module.exports = override(
  // 针对src下引用的antd
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  }),
  // 针对src下引用的mcf-components
  fixBabelImports('mcf-components', {
    libraryName: 'mcf-components',
    libraryDirectory: 'es', // 对lib下的cjs代码无效
    camel2DashComponentName: false
  })
);
```

### 基于原始 webpack 配置的 JS 项目

```sh
npm install --save-dev babel-plugin-import
```

or

```sh
yarn add -D babel-plugin-import
```

```javascript
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                'import',
                {libraryName: 'antd', libraryDirectory: 'es', style: 'css'}
              ],
              [
                'import',
                {
                  libraryName: 'mcf-components',
                  libraryDirectory: 'es',
                  camel2DashComponentName: false
                }
              ]
            ]
          }
        }
      }
      // ...
    ]
  }
  // ...
};
```

or

```json
// .babelrc
{
  "plugins": [
    // ...
    [
      "import",
      {"libraryName": "antd", "libraryDirectory": "es", "style": "css"}
    ],
    [
      "import",
      {
        "libraryName": "mcf-components",
        "libraryDirectory": "es",
        "camel2DashComponentName": false
      }
    ]
  ]
  // ...
}
```

### 基于原始 webpack 配置的 TS 项目

```sh
npm install --save-dev ts-import-plugin
```

or

```sh
yarn add -D ts-import-plugin
```

```javascript
// webpack.config.js
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory([
                  {libraryName: 'antd', libraryDirectory: 'es', style: 'css'},
                  {
                    libraryName: 'mcf-components',
                    libraryDirectory: 'es',
                    camel2DashComponentName: false
                  }
                ])
              ]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          }
        }
      }
      // ...
    ]
  }
  // ...
};
```

## 使用说明

```javascript
import {BaseForm, FormItem} from 'mcf-components';
```
