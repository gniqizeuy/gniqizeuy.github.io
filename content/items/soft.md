---
title: "software"
date: 2021-10-19
draft: false
---

### emq
安装emq时找不到MSVCR120.dll
安装[vcredist](https://www.microsoft.com/zh-cn/download/confirmation.aspx?id=40784)

### windows 开机自启
创建程序快捷方式粘贴到 C:\Users\Admin\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup 此文件夹中


### ffmpeg

**centos7安装ffmpeg**

FFmpeg在CentOS 7核心存储库中不可用。您可以选择从源代码构建FFmpeg工具，也可以使用Nux Dextop存储库中的yum进行安装。


Nux资料库取决于 EPEL 软件资料库
```shell
sudo yum install epel-release
```
导入存储库GPG密钥并通过安装rpm软件包来启用Nux存储库：
```shell
sudo rpm -v --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
sudo rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
```
启用存储库后，安装FFmpeg：
```shell
sudo yum install ffmpeg ffmpeg-devel
```

**检查安装**
```shell
ffmpeg -version
```


**chrome 默认黑暗主题**
访问 chrome://flags/
选择 Auto Dark Mode for Web Contents