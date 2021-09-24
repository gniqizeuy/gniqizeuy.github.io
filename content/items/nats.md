---
title: "nats"
date: 2021-08-03
draft: false
---

#### 安装 nats

##### winodws

```bash
choco install nats-server

```

启动 nats

```bash
nats-server

```

#### 监控 nats

```bash
nats-server -m [http_port]

```
-m 指定 http 端口，浏览器输入地址即可访问

##### 安装 nats-top

```bash
go get github.com/nats-io/nats-top

```

###### 使用


```bash
nats-top 

```

默认 8222 端口