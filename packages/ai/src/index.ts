import type { DeckPlan, DocumentUnit, SlidePlan, SlideSpec, TemplateSchema } from '@hennya/shared';

export type GenerateDeckPlanInput = {
  documents: DocumentUnit[];
  audience: string;
  objective: string;
  preferredSlideCount: number;
  tone: DeckPlan['tone'];
};

export type GenerateSlideSpecsInput = {
  deckPlan: DeckPlan;
  documents: DocumentUnit[];
  template?: TemplateSchema;
};

export type TemplateRecommendationInput = {
  deckPlan: DeckPlan;
  templateSchemas: TemplateSchema[];
};

export interface AiProvider {
  createDeckPlan(input: GenerateDeckPlanInput): Promise<DeckPlan>;
  createSlideSpecs(input: GenerateSlideSpecsInput): Promise<SlideSpec[]>;
  rankTemplates(input: TemplateRecommendationInput): Promise<TemplateMatchScore[]>;
  rewriteSlide(slide: SlidePlan, feedback: string): Promise<SlideSpec>;
}

export type TemplateMatchScore = {
  templateId: string;
  score: number;
  rationale: string;
};