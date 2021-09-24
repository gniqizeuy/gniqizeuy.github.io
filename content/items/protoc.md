---
title: "protoc"
date: 2021-07-04
draft: false
---

protoc 编译
编译命令

```go
# Syntax: protoc [OPTION] PROTO_FILES
$ protoc --proto_path=IMPORT_PATH  --go_out=OUT_DIR  --go_opt=paths=source_relative path/to/file.proto
```

- –proto_path或者-I ：指定 import 路径，可以指定多个参数，编译时按顺序查找，不指定时默认查找当前目录。
- .proto 文件中也可以引入其他 .proto 文件，这里主要用于指定被引入文件的位置。
- –go_out：golang编译支持，指定输出文件路径  
  其他语言则替换即可，比如 --java_out 等等
- –go_opt：指定参数，比如--go_opt=paths=source_relative就是表明生成文件输出使用相对路径。
- path/to/file.proto ：被编译的 .proto 文件放在最后面