import { useState, useEffect } from 'react';
import './EventSyncerPreview.css';

const EVENTS = [
  { crm: 'Q1 Portfolio Review', cal: 'Q1 Portfolio Review — Meridian', status: 'matched' as const },
  { crm: 'Portfolio Walkthrough', cal: 'Summit Advisors — Portfolio', status: 'conflict' as const },
  { crm: 'Introductory Call', cal: 'Weekly Team Sync', status: 'unmatched' as const },
];

const STATUS_ICON = { matched: '✓', conflict: '⚠', unmatched: '✗' };

export default function EventSyncerPreview() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % EVENTS.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="esp">
      <div className="esp__cols">
        <div className="esp__col">
          <span className="esp__source-label">CRM</span>
          {EVENTS.map((e, i) => (
            <div key={i} className={`esp__row${i === active ? ' esp__row--active' : ''}`}>
              <span className="esp__dot esp__dot--crm" />
              <span className="esp__text">{e.crm}</span>
            </div>
          ))}
        </div>

        <div className="esp__lines" aria-hidden>
          {EVENTS.map((e, i) => (
            <div
              key={i}
              className={`esp__line esp__line--${e.status}${i === active ? ' esp__line--lit' : ''}`}
            >
              <span className={`esp__status-icon esp__status-icon--${e.status}`}>
                {STATUS_ICON[e.status]}
              </span>
            </div>
          ))}
        </div>

        <div className="esp__col esp__col--right">
          <span className="esp__source-label">Calendar</span>
          {EVENTS.map((e, i) => (
            <div key={i} className={`esp__row${i === active ? ' esp__row--active' : ''} esp__row--${e.status}`}>
              <span className="esp__text">{e.cal}</span>
              <span className="esp__dot esp__dot--cal" />
            </div>
          ))}
        </div>
      </div>

      <div className="esp__stats">
        <span className="esp__stat esp__stat--matched">✓ 8 matched</span>
        <span className="esp__stat esp__stat--conflict">⚠ 3 conflicts</span>
        <span className="esp__stat esp__stat--unmatched">✗ 2 unmatched</span>
      </div>
    </div>
  );
}
