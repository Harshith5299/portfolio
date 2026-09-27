import { useState, useEffect } from 'react';
import './AskRagPreview.css';

const QA = [
  {
    q: 'Agentic AI experience?',
    sources: [['AI & agentic skills', 100], ['Wells Fargo, IAM agents', 64], ['GE Vernova, AgentCore', 51]] as const,
    a: 'LangGraph agents for access reviews at Wells Fargo',
  },
  {
    q: 'Worked in banking?',
    sources: [['Wells Fargo, risk', 100], ['Spring Bank', 73], ['Wells Fargo, IAM', 63]] as const,
    a: 'Yes, Wells Fargo from 2025 to 2026',
  },
];

/** Phases per question: 0 question, 1 retrieving, 2 answered. */
export default function AskRagPreview() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1400);
    return () => clearInterval(id);
  }, []);

  const item = QA[Math.floor(tick / 3) % QA.length];
  const phase = tick % 3;

  return (
    <div className="arp" aria-hidden>
      <div className="arp__q">
        <span className="arp__you">Q</span>
        {item.q}
      </div>
      <div className="arp__sources">
        {item.sources.map(([title, score], i) => (
          <div key={title} className={`arp__src${phase >= 1 ? ' arp__src--on' : ''}`} style={{ transitionDelay: `${i * 0.12}s` }}>
            <span className="arp__n">{i + 1}</span>
            <span className="arp__title">{title}</span>
            <span className="arp__bar">
              <span style={{ width: phase >= 1 ? `${score}%` : 0 }} />
            </span>
          </div>
        ))}
      </div>
      <div className={`arp__a${phase === 2 ? ' arp__a--on' : ''}`}>
        {item.a} <span className="arp__cite">1</span>
        <span className="arp__cite">2</span>
      </div>
    </div>
  );
}
