import { useSite } from '@/content/SiteContext';
import { Link } from 'react-router-dom';
import { RevealItem, Stagger } from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Solutions() {
  const SOLUTIONS = useSite().solutions;
  return (
    <section id="solutions" className="section-padding bg-surface-slate">
      <div className="container-x">
        <SectionHeader title={SOLUTIONS.title} description={SOLUTIONS.description} />

        {SOLUTIONS.groups.map((g) => (
          <div key={g.name} className="mb-12">
            <div className="mb-5 flex items-center gap-3 text-xl font-bold text-primary-dark after:h-px after:flex-1 after:bg-line">
              {g.name}
            </div>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((s) => (
                <RevealItem key={s.title} className="h-full">
                <Link
                  to={`/p/${s.slug}`}
                  className="group flex h-full flex-col justify-between rounded-xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-[3px] hover:border-brand hover:shadow-card-hover"
                >
                  <div>
                    <h3 className="mb-2.5 text-lg font-bold text-primary-dark">{s.title}</h3>
                    <p className="mb-5 flex-grow text-sm leading-relaxed text-ink-muted">{s.text}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-all group-hover:gap-2.5">
                    {SOLUTIONS.cardLink}
                  </span>
                </Link>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        ))}

        <div className="mt-10 text-center">
          <a href={SOLUTIONS.cta.href} className="btn btn-primary">
            {SOLUTIONS.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
