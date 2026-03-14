# 系统架构与核心数据结构

## 推荐总体架构

建议把系统拆成五层，而不是让模型直接从文档跳到最终 PPT。

1. 文档摄取层
2. 内容规划层
3. 模板理解与匹配层
4. 渲染导出层
5. 审校与重生成层

## 模块拆分

### 1. 文档摄取层

负责读取用户上传的 PDF、DOCX、Markdown、TXT、XLSX，并转换成统一中间结构。

建议统一输出如下信息：

- 文本块
- 标题层级
- 表格
- 图片引用
- 页码或段落位置
- 原始来源标识

### 2. 内容规划层

负责把原始文档转成可供模型理解和追踪的内容单元。

职责包括：

- chunk 切分
- 文档摘要
- 关键结论抽取
- 术语统一
- 来源映射

### 3. 对话与生成层

推荐采用两段式生成，而不是一次性生成完整 PPT。

第一段：生成 deck plan

- 汇报目标
- 目标受众
- 总页数
- 页面序列
- 每页类型
- 每页引用哪些来源

第二段：生成 slide spec

- 标题
- 副标题
- 内容块
- 图表建议
- 视觉提示
- 字数预算

### 4. 模板理解与匹配层

核心不是“读取模板文件”，而是把模板抽象成 `template schema`。

推荐抽象项：

- 模板名称
- 风格标签
- 适用场景
- 主题色与字体
- 支持的页面类型
- 各页面类型的占位区定义
- 标题区、正文区、图表区、图片区边界
- 每种版式的最大内容承载能力

### 5. 渲染导出层

根据 `slide spec + template schema` 生成最终 PPTX。

这层必须是规则驱动，不应完全依赖模型。

至少要有以下规则：

- 标题字数上限
- 正文字数上限
- 超长内容压缩策略
- 表格转摘要策略
- 图表无法生成时的降级策略
- 图片裁切与适配策略

## 模板能力分层

### 内置模板

系统维护高质量模板库，并为每套模板标记：

- 使用场景
- 风格
- 支持的页面类型
- 适合的内容密度

这是第一版最稳定、最值得优先投入的方向。

### 用户模板半自动适配

流程建议如下：

1. 解析模板的母版、布局和占位结构。
2. 让 AI 生成模板总结。
3. 让用户确认模板用途和主要版式。
4. 生成该模板的 schema。

这种方式比完全自动猜测要稳得多。

### 用户模板智能学习

后续可支持用户给出几个示例页，并标注：

- 封面页
- 目录页
- 章节页
- 图表页
- 总结页

系统再据此构建版式映射规则。

## 核心数据结构草案

### DocumentUnit

```ts
type DocumentUnit = {
  id: string;
  sourceId: string;
  sourceType: 'pdf' | 'docx' | 'md' | 'txt' | 'xlsx';
  titlePath: string[];
  text: string;
  tokensEstimate: number;
  page?: number;
  section?: string;
  importance?: number;
  tags?: string[];
};
```

### DeckPlan

```ts
type DeckPlan = {
  deckTitle: string;
  audience: string;
  objective: string;
  tone: 'formal' | 'executive' | 'marketing' | 'academic';
  estimatedSlides: number;
  slides: SlidePlan[];
};

type SlidePlan = {
  id: string;
  type:
    | 'cover'
    | 'agenda'
    | 'section'
    | 'summary'
    | 'comparison'
    | 'timeline'
    | 'chart'
    | 'content';
  title: string;
  objective: string;
  sourceRefs: string[];
};
```

### SlideSpec

```ts
type SlideSpec = {
  slideId: string;
  title: string;
  subtitle?: string;
  layoutHint: string;
  blocks: ContentBlock[];
  visualHints?: string[];
  sourceRefs: string[];
};

type ContentBlock = {
  kind: 'bullet' | 'paragraph' | 'table' | 'chart' | 'quote' | 'image';
  content: string | string[][];
  priority: number;
};
```

### TemplateSchema

```ts
type TemplateSchema = {
  templateId: string;
  name: string;
  scenarioTags: string[];
  styleTags: string[];
  theme: {
    fonts: string[];
    colors: string[];
  };
  layouts: TemplateLayout[];
};

type TemplateLayout = {
  layoutId: string;
  supportedSlideTypes: string[];
  titleBox?: Box;
  bodyBoxes: Box[];
  chartBoxes?: Box[];
  imageBoxes?: Box[];
  density: 'low' | 'medium' | 'high';
};

type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
};
```

## 推荐目录结构草案

```text
hennya/
  apps/
    desktop/
      src/
        main/
        preload/
        renderer/
  packages/
    ai/
    document-parser/
    deck-engine/
    template-engine/
    shared/
  docs/
```

这个结构适合后续把文档解析、模板处理、渲染引擎拆成独立包，避免桌面层变成巨石工程。