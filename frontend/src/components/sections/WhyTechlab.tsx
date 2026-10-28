import { useSite } from '@/content/SiteContext';
import SectionHeader from '@/components/ui/SectionHeader';
import { Reveal, RevealItem, Stagger } from '@/components/ui/Reveal';

export default function WhyTechlab() {
  const W = useSite().why;
  return (
    <section id="why-techlab" className="section-padding bg-white">
      <div className="container-x">
        <SectionHeader title={W.title} description={W.description} />

        <Stagger className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {W.tiles.map((t) => (
            <RevealItem key={t.title}>
              <div className="border-l-[3px] border-brand pl-5">
                <h3 className="mb-2 text-lg font-bold text-primary-dark">{t.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{t.text}</p>
              </div>
            </RevealItem>
          ))}
        </Stagger>

        {W.awards.length > 0 && (
          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-xl bg-surface-slate p-6 sm:gap-8">
            {W.awards.map((a) => (
              <img
                key={a.src}
                src={a.src}
                alt={a.alt}
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = 'none')}
                className="h-[90px] w-auto rounded-md shadow-card"
              />
            ))}
          </Reveal>
        )}

        <div className="mt-9 text-center">
          <a href={W.cta.href} className="btn btn-primary">
            {W.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
