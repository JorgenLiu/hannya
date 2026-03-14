# Hennya Project Guidelines

## Product Scope

Hennya is a desktop application for Windows and macOS that turns multiple input documents into structured PPTX decks through AI-assisted planning, template matching, and deterministic rendering.

Prioritize the core pipeline:

1. Document ingest and normalization.
2. Multi-turn clarification of audience, objective, tone, and slide count.
3. Structure-first generation using `DeckPlan` and `SlideSpec`.
4. Template matching using built-in templates first.
5. Stable PPTX rendering with overflow checks and fallback rules.

Do not optimize for arbitrary user template perfection in early iterations.

## Architecture

Keep the project modular and preserve the existing boundaries:

- `apps/desktop`: Electron shell, preload bridge, renderer UI.
- `packages/shared`: shared contracts and core types.
- `packages/document-parser`: file parsing, chunking, token budgeting, preprocessing hooks.
- `packages/ai`: DeepSeek orchestration and schema-safe model outputs.
- `packages/template-engine`: PPTX template parsing, classification, schema extraction.
- `packages/deck-engine`: layout rules, fit validation, PPTX export.

Prefer extending these packages over adding cross-cutting logic directly into the Electron app.

## Generation Rules

The model should never directly generate PPT file structures.

Always keep this flow:

1. Raw documents become `DocumentUnit` records.
2. AI produces a `DeckPlan`.
3. AI produces `SlideSpec` records.
4. Code maps `SlideSpec` to a `TemplateSchema`.
5. The render engine produces PPTX deterministically.

If adding new AI features, keep outputs schema-driven and validate them before use.

## Performance Constraints

Assume performance matters from the start.

- Keep Electron main process thin.
- Do not run heavy parsing or template analysis in the renderer.
- Move CPU-heavy work to workers or child processes.
- Cache expensive intermediate results.
- Avoid passing large payloads through IPC when a file path or task ID is enough.
- Keep export time predictable by doing layout decisions before final render.

## Template Strategy

Built-in templates are the default path.

When working on template support:

- Convert both built-in and user templates into `TemplateSchema`.
- Treat user templates as semi-automatic adaptation, not full automatic fidelity.
- Favor layout capacity, overflow control, and repeatable output over aggressive visual guessing.

## Python Strategy

Python is optional and should not become a hard dependency for the first working version.

Design preprocessing so that it can later call a Python sidecar for:

- PDF cleanup
- OCR
- deduplication
- extractive summarization
- structure recovery

Keep the first implementation in TypeScript where practical, but leave clean interfaces for future sidecar integration.

## Working Style

- Make minimal, focused changes.
- Preserve the shared contracts in `packages/shared` unless there is a clear schema need.
- Update docs in `docs/` when architecture or workflow assumptions change.
- Prefer internal consistency and deterministic behavior over clever one-off shortcuts.
- When adding dependencies, choose mature libraries that fit the existing Electron and TypeScript stack.
- Before running shell commands that need external network access, source `~/.zshrc` and run `proxyon` so package downloads use the configured proxy.

## References

Use these documents as the source of truth for product and architecture decisions:

- `docs/discussion-summary.md`
- `docs/feasibility-and-stack.md`
- `docs/architecture-and-data-model.md`
- `docs/core-schema-and-module-interfaces.md`
- `docs/template-parsing-roadmap.md`
- `docs/performance-and-preprocessing.md`