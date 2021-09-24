---
title: "npm"
date: 2021-07-01
draft: false
---

### 配置淘宝镜像

#### 临时

    npm --registry https://registry.npm.taobao.org install express

#### 永久

    npm config set registry https://registry.npm.taobao.org


#### npm install 命令

npm 安装指定版本 `-S` 相当于 `--save`
```bash
npm install express@3.21.2 -S
```

```shell
# 安装模块到项目目录下
npm install moduleName 

# -g 的意思是将模块安装到全局，具体安装到磁盘哪个位置，要看 npm config prefix 的位置。
npm install -g moduleName 

# -save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。
# 运行npm install --production或者注明NODE_ENV变量值为production时，会自动下载模块到node_modules目录中。
npm install -save moduleName 

# -save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。
# 运行npm install --production或者注明NODE_ENV变量值为production时，不会自动下载模块到node_modules目录中。
npm install -save-dev moduleName
```

devDependencies 节点下的模块是开发时需要用的，比如项目中使用的 gulp ，压缩css、js的模块。
这些模块在我们的项目部署后是不需要的，所以我们可以使用 -save-dev 的形式安装。

像 express 这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用 -save 的形式安装。

