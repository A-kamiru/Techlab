import { useSite } from '@/content/SiteContext';
import { RevealItem, Stagger } from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Challenge() {
  const CHALLENGE = useSite().challenge;
  return (
    <section id="challenge" className="section-padding bg-white">
      <div className="container-x">
        <SectionHeader title={CHALLENGE.title} description={CHALLENGE.description} />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHALLENGE.tiles.map((t) => (
            <RevealItem key={t.num} className="h-full">
            <div
              className="relative h-full rounded-xl border border-line bg-surface-slate px-6 py-8 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-card-hover"
            >
              <span className="mb-4 inline-block rounded-full bg-accent-light px-2.5 py-[3px] text-[13px] font-extrabold text-brand">
                {t.num}
              </span>
              <h3 className="mb-3 text-lg font-bold text-primary-dark">{t.title}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">{t.text}</p>
            </div>
            </RevealItem>
          ))}
        </Stagger>

        <div className="mt-12 text-center">
          <a href={CHALLENGE.cta.href} className="btn btn-primary">
            {CHALLENGE.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
