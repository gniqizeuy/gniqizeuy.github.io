---
title: "git config"
date: 2021-06-30
draft: false
---

HTTP 代理
HTTP 代理相对简单

# HTTP 代理
    git config --global http.proxy http://127.0.0.1:7890
    git config --global https.proxy http://127.0.0.1:7890

# Socks5 代理
    git config --global http.proxy socks5://127.0.0.1:7890
    git config --global https.proxy socks5://127.0.0.1:7890
注意这里的 socks5 仅仅是代理使用的协议，它依然是针对 http 设置的，所以仅对 http 协议的仓库有效。使用 git@xxx 这种 ssh 连接的不会使用代理。

也可以分域名设置代理：

    git config --global http.https://github.com.proxy http://127.0.0.1:7890
    git config --global https.https://github.com.proxy https://127.0.0.1:7890
SSH 代理
SSH 代理需要在密钥目录 (~/.ssh) (Windows 下是 C:\Users\{UserName}\.ssh) 新建一个 config 文件，没有后缀名。

Linux 系统写入以下配置（未验证）：

    # 需要 netcat
    ProxyCommand nc -v -x 127.0.0.1:7890 %h %p
Windows:

    # -S 为 socks, -H 为 HTTP
    ProxyCommand connect -S 127.0.0.1:7890 %h %p
如果找不到 connect 命令那么指定其绝对路径，一般在 git 安装目录下 \mingw64\bin\connect.exe.  
赠送一个 connect 的官方文档。

也可以分域名代理：

    Host github.com
        ProxyCommand connect -S 127.0.0.1:7890 %h %p


## 取消代理

    git config --global --unset http.proxy
    git config --global --unset https.proxy

### autocrlf

    git config --global core.autocrlf input

> 检出时不转换，若包含回车加换行作为结束符的文件，提交时会把回车和换行转换成换行