---
title: "python requirement"
date: 2021-11-17
draft: false
tags: ["python"]
---

### python 安装 pycrypto

#### 前提条件 c++ 编译器
安装 c++ 编译器后

设置环境变量
`VCINSTALLDIR` 值：`D:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC`

搜索stdint.h位置在哪，执行以下命令

```bash
set CL=-FI"%VCINSTALLDIR%\Tools\MSVC\14.29.30133\include\stdint.h"
```


再进行 pycrypto 安装