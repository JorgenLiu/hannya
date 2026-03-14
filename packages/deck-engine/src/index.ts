import type { DeckPlan, SlideSpec, TemplateSchema } from '@hennya/shared';

export type RenderDeckInput = {
  deckPlan: DeckPlan;
  slideSpecs: SlideSpec[];
  templateSchema: TemplateSchema;
  outputPath: string;
};

export type SlideFitReport = {
  slideId: string;
  didOverflow: boolean;
  warnings: string[];
};

export type RenderDeckResult = {
  outputPath: string;
  fitReports: SlideFitReport[];
};

export interface DeckRenderer {
  render(input: RenderDeckInput): Promise<RenderDeckResult>;
  validateSlideFit(spec: SlideSpec, templateSchema: TemplateSchema): SlideFitReport;
}