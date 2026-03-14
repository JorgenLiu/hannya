# 当前项目状态

更新日期: 2026-03-14

## 已落地能力

- 根目录 `npm workspace` 已可用，`apps/desktop` 与 `packages/*` 已接入统一依赖管理。
- Electron + React + TypeScript + `electron-vite` 桌面 demo 壳已可启动。
- 主进程、preload、renderer 已通过 IPC 打通，当前通过 `app:get-bootstrap-data` 返回 bootstrap snapshot。
- `packages/shared` 已包含核心契约类型：`DocumentUnit`、`DeckPlan`、`SlideSpec`、`TemplateSchema` 以及 demo 所用的 mock snapshot。
- `packages/ai`、`packages/document-parser`、`packages/template-engine`、`packages/deck-engine` 已建立接口边界，但当前仍是接口和类型定义阶段。

## 当前 demo 能看到什么

启动桌面应用后，renderer 会展示一页 bootstrap 面板，内容来自共享 mock 数据，主要用于验证：

- Electron 主进程可以正常启动窗口。
- preload 暴露的 API 可以从 renderer 调用。
- Zustand 状态流和 React 渲染链路正常。
- 项目中定义的 pipeline、模块边界和阶段性里程碑可以通过共享契约渲染到 UI。

## 还没有落地的部分

- 多文档导入与文件解析。
- `DocumentUnit` 生成与 token budgeting。
- DeepSeek 接入与 `DeckPlan` / `SlideSpec` 真实生成。
- 模板解析、模板分类与模板匹配。
- PPTX 渲染、版式校验与导出。
- SQLite、本地项目存储与任务记录。

## 本地开发说明

已验证环境：

- Node.js `v22.14.0`
- npm `10.9.2`

常用命令：

```bash
npm install
npm run dev
npm run typecheck
```

如果当前网络环境需要代理，再执行依赖安装或其他外网命令前，先运行：

```bash
source ~/.zshrc
proxyon
```

## 当前建议的下一步

1. 实现文档导入与 `DocumentUnit` 标准化链路。
2. 接入真实 AI provider，先跑通 `DeckPlan` 与 `SlideSpec` 的 schema-safe 输出。
3. 建立内置模板 schema 与模板匹配最小闭环。
4. 在 `deck-engine` 中补上 fit check 和最小 PPTX 导出链路。