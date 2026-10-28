import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * Robust markdown renderer for detail pages.
 * Handles ## (h2), ### (h3), -/* (ul list), and paragraphs cleanly,
 * ensuring headings and answers are never lumped together or accidentally styled as bold headers.
 */
const SAFE = /^(https?:\/\/|mailto:|\/|#)/i;

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={i++} className="font-bold text-slate-900">{m[1]}</strong>);
    else if (SAFE.test(m[3])) {
      const internal = m[3].startsWith('/');
      out.push(
        internal ? (
          <Link key={i++} to={m[3]} className="font-semibold text-brand underline underline-offset-2">
            {m[2]}
          </Link>
        ) : (
          <a key={i++} href={m[3]} target={m[3].startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">
            {m[2]}
          </a>
        ),
      );
    } else out.push(m[2]);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

type BlockElement =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'cta'; text: string; buttonText: string; href: string }
  | { type: 'p'; text: string };

export default function Markdown({ source }: { source: string }) {
  const rawLines = source.replace(/\r\n/g, '\n').split('\n');
  const elements: BlockElement[] = [];
  let currentP: string[] = [];
  let currentUl: string[] = [];
  let currentOl: string[] = [];

  const flushP = () => {
    if (currentP.length > 0) {
      elements.push({ type: 'p', text: currentP.join(' ') });
      currentP = [];
    }
  };

  const flushUl = () => {
    if (currentUl.length > 0) {
      elements.push({ type: 'ul', items: currentUl });
      currentUl = [];
    }
  };

  const flushOl = () => {
    if (currentOl.length > 0) {
      elements.push({ type: 'ol', items: currentOl });
      currentOl = [];
    }
  };

  const flushAll = () => {
    flushP();
    flushUl();
    flushOl();
  };

  for (const raw of rawLines) {
    const line = raw.trim();
    if (!line) {
      flushAll();
      continue;
    }

    if (line.startsWith('### ')) {
      flushAll();
      elements.push({ type: 'h3', text: line.slice(4).trim() });
    } else if (line.startsWith('## ')) {
      flushAll();
      elements.push({ type: 'h2', text: line.slice(3).trim() });
    } else if (/^(?:Mid-page CTA:|>\s*CTA:)\s*(.+?)\s*\[([^\]]+)\]/i.test(line)) {
      flushAll();
      const m = line.match(/^(?:Mid-page CTA:|>\s*CTA:)\s*(.+?)\s*\[([^\]]+)\]/i);
      if (m) {
        elements.push({
          type: 'cta',
          text: m[1].trim(),
          buttonText: m[2].trim(),
          href: '/#contact',
        });
      }
    } else if (/^[-*•●]\s+/.test(line)) {
      flushP();
      flushOl();
      currentUl.push(line.replace(/^[-*•●]\s+/, '').trim());
    } else if (/^\d+\.\s+/.test(line)) {
      flushP();
      flushUl();
      currentOl.push(line.replace(/^\d+\.\s+/, '').trim());
    } else {
      flushUl();
      flushOl();
      currentP.push(line);
    }
  }

  flushAll();

  return (
    <div className="space-y-4 text-[16px] leading-relaxed text-slate-700">
      {elements.map((el, idx) => {
        if (el.type === 'h2') {
          return (
            <h2 key={idx} className="mb-3 mt-10 text-2xl font-extrabold tracking-tight text-primary-dark first:mt-0">
              {inline(el.text)}
            </h2>
          );
        }
        if (el.type === 'h3') {
          return (
            <h3 key={idx} className="mb-1.5 mt-6 text-[18px] font-bold text-primary-dark">
              {inline(el.text)}
            </h3>
          );
        }
        if (el.type === 'ul') {
          return (
            <ul key={idx} className="my-3 list-disc space-y-2.5 pl-5 marker:text-brand">
              {el.items.map((item, j) => (
                <li key={j} className="leading-relaxed text-slate-700">
                  {inline(item)}
                </li>
              ))}
            </ul>
          );
        }
        if (el.type === 'ol') {
          return (
            <ol key={idx} className="my-4 list-decimal space-y-2.5 pl-6 marker:font-bold marker:text-brand">
              {el.items.map((item, j) => (
                <li key={j} className="leading-relaxed text-slate-700">
                  {inline(item)}
                </li>
              ))}
            </ol>
          );
        }
        if (el.type === 'cta') {
          return (
            <div key={idx} className="my-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-brand/20 bg-accent-light/50 p-6 sm:flex-row sm:items-center">
              <p className="text-lg font-bold text-primary-dark">{inline(el.text)}</p>
              <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn-primary whitespace-nowrap">
                {el.buttonText} →
              </Link>
            </div>
          );
        }
        return (
          <p key={idx} className="my-3 leading-relaxed text-slate-700">
            {inline(el.text)}
          </p>
        );
      })}
    </div>
  );
}
