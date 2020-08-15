# 说明

 本项目是一个基于Node.js+Koa+Mysql所开发的个人博客后台，由于自己之前的博客打算重构，所以也顺便把博客后台重构了。

## 开发目标  

    1. 实现登录，注册功能  
    2. 实现对数据库的CRUD--(增删改查)功能
    3. 实现文章评论回复功能
    4. 利用七牛云或阿里云OSS来对静态资源进行处理，以提升网络传输速度
    5. 实现权限校验功能
    6. 实现参数检验功能

### 项目地址

    1. https://github.com/Lin96any/BlogApi.git
    2. https://gitee.com/Big_Smail/BlogApi.git

### 安装

    1.$ git clone git@github.com:Lin96any/BlogApi.git 或者 $ git clone git@gitee.com:Big_Smail/BlogApi.git
    2.$ npm install

### 运行

```shell
  node app.js
```

服务器启动默认端口为 3000,若不想使用 3000 端口,可使用以下命令: Mac/Linux

```shell
 PORT=4000 node app.js
```

windows 下使用 git-bash 或者 cmder 等终端执行以下命令:

```shell
 set PORT=4000 && node app.js
```