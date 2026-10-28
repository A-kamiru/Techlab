import { Link } from 'react-router-dom';
import type { Site } from '@/content/defaults';

type CaseStudy = Site['cases']['items'][number];

export default function CaseStudyCard({ study, cta }: { study: CaseStudy; cta: string }) {
  const to = `/p/${study.slug}`;
  const points: [string, string][] = [
    ['Challenge:', study.challenge],
    ['Objective:', study.objective],
    ['What we did:', study.whatWeDid],
  ];
  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-line bg-surface-slate p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div>
        <span className="mb-4 block text-xs font-extrabold uppercase tracking-wider text-brand">{study.meta}</span>
        {points.map(([label, text]) => (
          <div key={label} className="mb-3 text-sm">
            <strong className="mb-0.5 block text-xs font-bold uppercase text-primary-dark">{label}</strong>
            <p className="leading-normal text-ink-muted">{text}</p>
          </div>
        ))}
        <Link
          to={to}
          className="mb-5 mt-4 block rounded-lg border border-green-200 bg-green-100 px-4 py-3 text-sm font-semibold text-green-700 transition-colors hover:bg-green-200"
        >
          ✓ {study.result}
        </Link>
      </div>
      <Link to={to} className="btn-text self-start">
        {cta}
      </Link>
    </article>
  );
}
