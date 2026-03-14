import { useEffect } from 'react';
import { useAppStore } from './store';

export function App() {
  const snapshot = useAppStore((state) => state.snapshot);
  const status = useAppStore((state) => state.status);
  const loadBootstrap = useAppStore((state) => state.loadBootstrap);

  useEffect(() => {
    void loadBootstrap();
  }, [loadBootstrap]);

  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AI deck authoring workbench</p>
          <h1>Hennya</h1>
          <p className="lede">
            从多份文档中提炼证据、澄清意图、匹配模板，并稳定导出
            PPTX 的桌面应用骨架。
          </p>
        </div>
        <div className="hero-card">
          <span className={`status-pill status-${status}`}>{status}</span>
          <h2>Current bootstrap</h2>
          <p>{snapshot?.projectName ?? 'Loading project snapshot...'}</p>
        </div>
      </section>

      <section className="grid">
        <article className="panel panel-accent">
          <h3>Pipeline</h3>
          <ol>
            {(snapshot?.pipelineStages ?? []).map((stage) => (
              <li key={stage.id}>
                <strong>{stage.name}</strong>
                <span>{stage.summary}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="panel">
          <h3>Target modules</h3>
          <ul>
            {(snapshot?.modules ?? []).map((module) => (
              <li key={module.name}>
                <strong>{module.name}</strong>
                <span>{module.ownership}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Near-term milestones</h3>
          <ul>
            {(snapshot?.milestones ?? []).map((milestone) => (
              <li key={milestone.id}>
                <strong>{milestone.title}</strong>
                <span>{milestone.target}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel panel-wide">
          <h3>System stance</h3>
          <div className="chips">
            {(snapshot?.architectureChoices ?? []).map((choice) => (
              <span key={choice} className="chip">
                {choice}
              </span>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}