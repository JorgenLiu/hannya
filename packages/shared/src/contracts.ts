export type SourceType = 'pdf' | 'docx' | 'md' | 'txt' | 'xlsx';

export type DocumentUnit = {
  id: string;
  sourceId: string;
  sourceType: SourceType;
  titlePath: string[];
  text: string;
  tokensEstimate: number;
  page?: number;
  section?: string;
  tags?: string[];
};

export type DeckTone = 'formal' | 'executive' | 'marketing' | 'academic';

export type SlideType =
  | 'cover'
  | 'agenda'
  | 'section'
  | 'summary'
  | 'comparison'
  | 'timeline'
  | 'chart'
  | 'content';

export type SlidePlan = {
  id: string;
  type: SlideType;
  title: string;
  objective: string;
  sourceRefs: string[];
};

export type DeckPlan = {
  deckTitle: string;
  audience: string;
  objective: string;
  tone: DeckTone;
  estimatedSlides: number;
  slides: SlidePlan[];
};

export type ContentBlock = {
  kind: 'bullet' | 'paragraph' | 'table' | 'chart' | 'quote' | 'image';
  content: string | string[][];
  priority: number;
};

export type SlideSpec = {
  slideId: string;
  title: string;
  subtitle?: string;
  layoutHint: string;
  blocks: ContentBlock[];
  visualHints?: string[];
  sourceRefs: string[];
};

export type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type TemplateLayout = {
  layoutId: string;
  supportedSlideTypes: SlideType[];
  titleBox?: Box;
  bodyBoxes: Box[];
  chartBoxes?: Box[];
  imageBoxes?: Box[];
  density: 'low' | 'medium' | 'high';
};

export type TemplateSchema = {
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

export type PipelineStage = {
  id: string;
  name: string;
  summary: string;
};

export type ModuleOwnership = {
  name: string;
  ownership: string;
};

export type Milestone = {
  id: string;
  title: string;
  target: string;
};

export type BootstrapSnapshot = {
  projectName: string;
  pipelineStages: PipelineStage[];
  modules: ModuleOwnership[];
  milestones: Milestone[];
  architectureChoices: string[];
};