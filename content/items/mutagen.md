---
title: "mutagen"
date: 2021-06-27
draft: false
---

[mutagen.io](https://mutagen.io/)


#### Installation


##### Linux
```bash
wget https://github.com/mutagen-io/mutagen/releases/download/v0.11.8/mutagen_linux_amd64_v0.11.8.tar.gz
tar zxvf mutagen_linux_*.tar.gz -C /usr/local/bin
mutagen daemon start
```

##### Windows
github issue: [issue](https://github.com/NixOS/nixpkgs/issues/81219)

download tar.gz: [amd64.v0.11.8.tar.gz](https://github.com/mutagen-io/mutagen/releases/download/v0.11.8/mutagen_windows_amd64_v0.11.8.tar.gz) ; add to path

设置 `MUTAGEN_SSH_PATH` 变量指向 SSH 可执行文件的目录，暂不支持 Windows 的 SSH 客户端

采用 git for windows 注意 git 安装地址为 C: 默认地址

将 `MUTAGEN_SSH_PATH` 指向 `GIT_INSTALL_ROOT\usr\bin`


#### create session

`mutagen sync create`

#### list session

`mutagen sync session`

在同步的情况下，此输出将包括在端点之间传播更改时出现的任何冲突或问题。

`mutagen forward list`

如果没有为列表命令指定会话或标签选择器，它们将简单地打印所有会话。更详细的清单输出可以通过 `-l/——long` 标志获得。

#### monitor session

`mutagen sync monitor web-app`

`mutagen forward monitor web-app`

如果没有指定会话，`monitor` 将显示最近创建的相关类型会话的信息。


#### Terminating sessions

`mutagen sync terminate web-app-code` 对于同步会话，这将不会删除任何端点上的文件

`mutagen forward terminate web-app`

#### Resetting sessions

同步会话可以使用mutagen sync reset命令清除它们的历史记录(使它们的行为像具有相同配置的新创建的会话一样)

`mutagen sync reset web-app-code`

这个命令在Mutagen的安全机制中最有用。在重新创建文件系统不是持久的容器化基础设施时，它也会很有帮助。

#### Daemon
Daemon 是 Mutagen 的核心。它负责同步和转发会话。Mutagen的所有会话管理命令实际上都将它们的操作发送到守护进程，并只是输出它的反馈

#### 生命周期
该守护进程在任何给定时间，只允许为特定用户运行守护进程的单个实例。该实例的生命周期可以通过三种不同的方式进行管理:自动、手动或由系统管理。所有这三种机制都可以相互结合使用(例如，可以手动停止自动启动的守护进程)。

#### 自动化管理
如果它还没有运行，守护进程将在调用任何会话管理命令时自动启动。在系统关闭时，守护进程将正常终止。如果您希望禁用自动守护程序启动，您可以设置环境变量MUTAGEN_DISABLE_AUTOSTART=1。

#### 人工管理
守护进程可以使用mutagen daemon start命令手动启动。此命令快速且幂等，因此如果您希望在打开 shell 时自动启动守护程序，可以安全地将其添加到您的 shell 初始化脚本（例如.bashrc或.profile）。守护进程也可以使用mutagen daemon stop命令手动停止。

系统管理
如果您希望在没有任何干预的情况下自动启动守护程序，可以通过mutagen daemon register命令在 macOS 和 Windows 上获得对注册守护程序以在登录时自动启动的实验性支持。

升级
会话管理命令用于与守护进程通信的 API 目前不稳定，因此升级 Mutagen 时需要重新启动守护进程：

$ mutagen daemon stop
$ mutagen daemon start
如果您忘记了，请不要担心，下次您尝试调用会话管理命令时，Mutagen 只会打印一条警告消息。

嵌入
实验支持可用于将 Mutagen 及其守护进程嵌入到其他应用程序中。此过程有两个步骤：更改 Mutagen 数据目录以创建隔离的守护进程实例和（可选）直接托管守护进程。

Mutagen 的数据目录存储会话配置、同步存档等。它也是 Mutagen 守护进程 IPC 端点和锁的位置。它的默认位置是~/.mutagen，但这可以通过设置MUTAGEN_DATA_DIRECTORY环境变量来更改。如果在守护程序启动时指定，此环境变量将告诉守护程序将其数据和 IPC 端点存储在备用位置。然后可以使用相同的环境变量来告诉会话管理命令在哪里可以找到隔离的守护进程的 IPC 端点。此变量应设置为绝对路径。

如果需要，守护进程也可以通过使用隐藏mutagen daemon run命令直接调用其入口点由嵌入进程托管。与mutagen daemon start命令不同，这将避免在后台启动守护进程。然后子进程可以由宿主进程直接终止。