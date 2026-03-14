import type { SlideType, TemplateLayout, TemplateSchema } from '@hennya/shared';

export type ParseTemplateInput = {
  absolutePath: string;
  templateId: string;
};

export type ParsedTemplate = {
  schema: TemplateSchema;
  warnings: string[];
};

export type TemplateClassification = {
  templateId: string;
  scenarioTags: string[];
  styleTags: string[];
  supportedSlideTypes: SlideType[];
  confidence: number;
};

export interface TemplateParser {
  parse(input: ParseTemplateInput): Promise<ParsedTemplate>;
  extractLayouts(absolutePath: string): Promise<TemplateLayout[]>;
}

export interface TemplateClassifier {
  classify(schema: TemplateSchema): Promise<TemplateClassification>;
}