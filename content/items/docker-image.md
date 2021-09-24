---
title: "docker image"
date: 2021-07-24
draft: false
---

镜像是 docker 容器的基石，容器是镜像的运行实例。


#### 构建镜像

docker 提供两种创建镜像的方法：docker commit 命令和 Dockerfile 构建文件

##### docker commit

docker commit 命令是创建镜像最直观的方法，其过程包括三个步骤：

- 运行容器
- 修改容器
- 将容器保存为新的镜像

例: 在 ubuntu base 镜像中安装 vi 并保存为新镜像

```
# -it 以交互模式进入容器内部
[root@ubuntu ~]# docker run -it ubuntu
root@a42d1b27e5c2:/# apt-get install -y vim

# 将随机分配的名字ecstatic_galileo 构建成 ubuntu-with-vi
[root@ubuntu ~]# docker commit ecstatic_galileo ubuntu-with-vi
```

Docker 并不建议用户通过这种方式构建镜像：

1. 这是一种手工构建方式，容易出错，效率低且可靠性弱
1. 用户并不知道镜像是如何构建出来的，里面是否有恶意程序，无法对镜像进行审核，存在安全隐患

使用 Dockerfile 构建镜像底层也是以 docker commit 一层层构建新镜像的

##### Dockerfile

Dockerfile 是一个文本文件，记录了镜像构建的所有步骤

使用 Dockerfile 创建 ubuntu-with-vi

```dockerfile
FROM ubuntu
RUN apt-get update && apt-get install -y vim
```