import type { BootstrapSnapshot } from './contracts';

export function createBootstrapSnapshot(): BootstrapSnapshot {
  return {
    projectName: 'Hennya desktop foundation',
    pipelineStages: [
      {
        id: 'ingest',
        name: 'Document ingest',
        summary: 'Standardize PDF, DOCX, Markdown and spreadsheet sources into typed units.'
      },
      {
        id: 'plan',
        name: 'Deck planning',
        summary: 'Generate deck plan JSON before drafting slide-level content.'
      },
      {
        id: 'template',
        name: 'Template matching',
        summary: 'Map slide intent to built-in or user-derived template schema.'
      },
      {
        id: 'render',
        name: 'PPT render',
        summary: 'Render deterministic PPTX output with layout rules and fallback strategies.'
      }
    ],
    modules: [
      {
        name: '@hennya/document-parser',
        ownership: 'Parsing, chunking, token budgeting and future preprocessing hooks.'
      },
      {
        name: '@hennya/ai',
        ownership: 'DeepSeek orchestration, prompt contracts and schema-safe outputs.'
      },
      {
        name: '@hennya/template-engine',
        ownership: 'Template OOXML parsing, schema extraction and layout matching.'
      },
      {
        name: '@hennya/deck-engine',
        ownership: 'Slide composition rules, fit checks and PPTX export adapters.'
      }
    ],
    milestones: [
      {
        id: 'm1',
        title: 'MVP pipeline',
        target: 'Import docs, ask clarifying questions, generate deck plan and export PPTX.'
      },
      {
        id: 'm2',
        title: 'Template intelligence',
        target: 'Parse internal templates and support user template confirmation flow.'
      },
      {
        id: 'm3',
        title: 'Preprocessing sidecar',
        target: 'Introduce optional Python preprocessing for OCR, cleanup and token reduction.'
      }
    ],
    architectureChoices: [
      'Electron + React + TypeScript',
      'Structure-first generation',
      'Node workers for heavy tasks',
      'Deterministic render engine',
      'Optional Python sidecar for preprocessing'
    ]
  };
}