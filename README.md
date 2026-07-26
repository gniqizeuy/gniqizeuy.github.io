# Loss Board

这是一个本地使用的 Hugo 股票持仓记录与 K 线分析页面。

## 本地运行

```sh
./scripts/dev.sh
```

然后打开终端输出的本地地址。正式生成静态文件时运行：

```sh
./scripts/publish.sh
```

新生成的网站位于 `public/`，不再覆盖 `docs/`。

## 历史记录

- `docs/`：原 GitHub Pages 的冻结快照，完整保留，不再作为 Hugo 的构建目标。
- `records/`：分析图、可交互图表及分析说明的归档目录。

如果还需要让原 GitHub Pages 公网地址停止提供服务，请在 GitHub 仓库的 **Settings → Pages → Build and deployment** 中把发布来源设为 **None**。这不会删除仓库中的 `docs/` 历史文件。

## K 线图

页面使用开源的 [KLineChart](https://github.com/klinecharts/KLineChart) 10.0.0（Apache-2.0）渲染日 K、成交量、颈线和头肩顶关键点。依赖已保存在 `static/vendor/klinecharts/`，无需从 CDN 加载图表库。

