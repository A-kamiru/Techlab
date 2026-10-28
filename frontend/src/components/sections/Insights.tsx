import { Link } from 'react-router-dom';
import { useSite } from '@/content/SiteContext';
import SectionHeader from '@/components/ui/SectionHeader';
import { RevealItem, Stagger } from '@/components/ui/Reveal';

export default function Insights() {
  const I = useSite().insights;
  return (
    <section className="section-padding bg-surface-slate">
      <div className="container-x">
        <SectionHeader title={I.title} description={I.description} />
        <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {I.items.map((a) => (
            <RevealItem key={a.slug} className="h-full">
              <Link
                to={`/p/${a.slug}`}
                className="group flex h-full flex-col justify-between rounded-xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-card-hover"
              >
                <div>
                  <div className="mb-2 text-xs font-bold uppercase text-brand">{a.meta}</div>
                  <h3 className="mb-3 text-lg font-bold leading-snug text-primary-dark">{a.title}</h3>
                  <p className="mb-4 text-sm text-ink-muted">{a.text}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 font-bold text-brand transition-all group-hover:gap-2.5">{I.cta}</span>
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
