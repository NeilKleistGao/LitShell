# LitShell
LitShell是一个基于`quasar`和`node.js`的专用博客引擎。
## 安装
+ 从`release`下载包，而不要`clone`
+ 安装`node.js`
+ 在根目录下和`templates`目录下执行`npm install`

## 用法
执行`node lit.js -h`查看详细帮助文档。

## markdowns目录
#### catalog.json
+ `name`: 专栏目录名
+ `title`：专栏的标题
+ `cover`：专栏的封面图片文件名
+ `intro`：专栏简介
+ `full-intro`：专栏详细介绍
+ `tags`：专栏标签
#### markdown文件
+ 第一行`author: test`，用于声明文章作者
+ 将所有标题行全部拷贝到接下来的位置，用于目录生成，一级标题将会被当做文章的标题
+ 使用`---`进行分割
+ 接下来是正文
