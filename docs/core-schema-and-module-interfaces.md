# 核心 Schema 与模块接口

## 设计原则

这个项目的关键不是让模型直接生成 PPT，而是让模型生成结构化中间结果，再由程序做稳定渲染。

因此整个系统应围绕三类核心对象展开：

- 文档标准化结果
- 演示文稿规划结果
- 模板与版式约束

## 结构化生成链路

### 1. DocumentUnit

用于承接原始文档切片后的统一内容单元。它应该足够细，能控制 token，又保留来源追踪能力。

关键字段：

- `sourceId`: 对应原始文档。
- `titlePath`: 对应章节路径。
- `text`: 送入检索或摘要的文本。
- `tokensEstimate`: 为 token 预算提供依据。

### 2. DeckPlan

这是生成过程中的第一层输出。它描述的是整份 PPT 的策略，而不是具体文案。

关键字段：

- `deckTitle`
- `audience`
- `objective`
- `tone`
- `slides`

每个 `SlidePlan` 只表达该页要完成什么目标、引用哪些来源、属于什么页面类型。

### 3. SlideSpec

这是第二层输出，用于描述每页要如何被渲染。

关键字段：

- `layoutHint`
- `blocks`
- `visualHints`
- `sourceRefs`

此时依然不应该直接包含具体坐标，而是保留内容语义和页面意图。

### 4. TemplateSchema

这是模板理解层的核心抽象。无论是内置模板还是用户模板，最终都应落到统一 schema 上。

关键字段：

- `scenarioTags`
- `styleTags`
- `layouts`
- `theme`

每个 `TemplateLayout` 描述的是“某种页面类型在这个模板里有哪些可用占位区”。

## 模块职责边界

### `@hennya/document-parser`

职责：

- 读取原始文件。
- 提取文本与结构。
- 切成 `DocumentUnit`。
- 预留对 Python 预处理的调用接口。

不负责：

- 写 prompt
- 选择模板
- 生成 PPT

### `@hennya/ai`

职责：

- 调用 DeepSeek。
- 产出 `DeckPlan`。
- 产出 `SlideSpec`。
- 根据 deck 情况对模板做排序建议。

不负责：

- 最终渲染 PPTX
- 直接决定像素级坐标

### `@hennya/template-engine`

职责：

- 解析 PPTX OOXML。
- 提取模板布局。
- 输出统一 `TemplateSchema`。
- 做模板风格和适用场景分类。

不负责：

- 文本摘要
- 内容生成

### `@hennya/deck-engine`

职责：

- 接收 `SlideSpec + TemplateSchema`。
- 做排版适配。
- 做溢出检查和回退规则。
- 输出最终 PPTX。

## 推荐生成约束

为了让模型输出更稳定，建议每个主要调用都使用严格 JSON schema 校验。

例如：

- `createDeckPlan`: 只允许返回 deck 级规划。
- `createSlideSpecs`: 只允许返回页面级内容块。
- `rankTemplates`: 只允许返回模板评分和原因。

## 与代码的对应关系

当前这些契约已经落到了项目骨架里：

- `packages/shared/src/contracts.ts`
- `packages/ai/src/index.ts`
- `packages/document-parser/src/index.ts`
- `packages/deck-engine/src/index.ts`
- `packages/template-engine/src/index.ts`

这意味着后续做 MVP 时，可以先围绕这些接口补实现，而不用再反复改数据边界。