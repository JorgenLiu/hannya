# Hennya

Hennya 是一个面向 Windows 和 macOS 的 AI 桌面应用，目标是帮助用户基于多份文档快速生成结构化、可交付的 PPT。

当前目录先存放项目早期分析和方案文档，便于后续继续拆解产品、技术架构和原型实现。

## 文档索引

- `docs/current-status.md`: 当前仓库已落地能力、桌面 demo 壳状态、本地开发说明。
- `docs/feasibility-and-stack.md`: 可行性分析、产品边界、技术栈建议、MVP 路线。
- `docs/architecture-and-data-model.md`: 系统架构、模块拆分、模板能力分层、核心数据结构草案。
- `docs/performance-and-preprocessing.md`: Electron 性能风险与解决方案，以及后续引入 Python 进行文档预处理的策略。
- `docs/core-schema-and-module-interfaces.md`: 结构化 JSON 契约、模块边界、生成链路接口定义。
- `docs/template-parsing-roadmap.md`: 用户模板解析与半自动适配的实现路线。

## 工程骨架

- `apps/desktop`: Electron + React + TypeScript 桌面应用骨架。
- `packages/shared`: 核心类型、共享契约和初始 mock 数据。
- `packages/ai`: DeepSeek 编排接口定义。
- `packages/document-parser`: 文档解析与预处理接口定义。
- `packages/deck-engine`: PPT 渲染与版式校验接口定义。
- `packages/template-engine`: 模板解析与分类接口定义。

## 当前状态

- 依赖已可正常安装。
- 桌面 demo 壳已可通过 `npm run dev` 启动。
- 当前 UI 主要用于展示 bootstrap snapshot，验证 Electron、preload、IPC、renderer 状态链路。
- 业务能力仍停留在结构定义和模块边界阶段，尚未进入真实文档处理、模型生成、模板解析和 PPTX 导出。

详细状态见 `docs/current-status.md`。

## 本地开发

首次安装依赖：

```bash
npm install
```

启动桌面 demo：

```bash
npm run dev
```

检查 TypeScript：

```bash
npm run typecheck
```

如果当前网络环境需要代理，再执行依赖安装或其他外网命令前，先运行：

```bash
source ~/.zshrc
proxyon
```

## 当前结论

- 核心链路“文档导入 -> 多轮澄清 -> 大纲生成 -> 模板匹配 -> PPT 导出”可行性高。
- 第一阶段应优先做内置模板，不应一开始承诺任意用户模板的完美自动适配。
- 渲染层应由程序主导，模型只输出结构化内容，不直接生成 PPT 文件结构。
- Electron 是当前更稳妥的第一版桌面技术方案，但必须从一开始控制主进程职责和渲染性能。
- Python 不建议作为第一版主运行时，但适合在后期承担文档预处理、OCR、版式分析等高价值任务。