import type { DocumentUnit, SourceType } from '@hennya/shared';

export type ParseDocumentInput = {
  sourceId: string;
  sourceType: SourceType;
  absolutePath: string;
};

export type ParsedDocument = {
  sourceId: string;
  units: DocumentUnit[];
  warnings: string[];
};

export type PreprocessRequest = {
  sourceId: string;
  absolutePath: string;
  enableOcr?: boolean;
  removeRepetition?: boolean;
  targetTokenBudget?: number;
};

export type PreprocessResult = {
  cleanedTextPath: string;
  extractedOutline: string[];
  estimatedTokenReduction: number;
};

export interface DocumentParser {
  supports(sourceType: SourceType): boolean;
  parse(input: ParseDocumentInput): Promise<ParsedDocument>;
}

export interface DocumentPreprocessor {
  preprocess(input: PreprocessRequest): Promise<PreprocessResult>;
}