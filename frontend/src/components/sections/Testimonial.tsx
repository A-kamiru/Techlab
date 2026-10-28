import { useSite } from '@/content/SiteContext';
import SectionHeader from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

export default function Testimonial() {
  const T = useSite().testimonial;
  return (
    <section className="section-padding bg-surface-slate">
      <div className="container-x">
        <SectionHeader title={T.title} description={T.description} />
        <Reveal
          className={`mx-auto grid max-w-[880px] items-center gap-6 rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10 md:gap-10 md:p-12 ${
            T.videoUrl ? 'md:grid-cols-[280px_1fr]' : ''
          }`}
        >
          {T.videoUrl && (
            <a
              href={T.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-[200px] flex-col items-center justify-center overflow-hidden rounded-xl bg-primary-dark text-white"
            >
              <span aria-hidden className="mb-2 grid h-14 w-14 place-items-center rounded-full bg-brand text-[22px] shadow-lg transition-transform group-hover:scale-110">▶</span>
              <span className="text-sm font-bold">{T.videoLabel}</span>
              <span className="text-xs text-slate-300">{T.videoLength}</span>
            </a>
          )}
          <figure>
            <blockquote className="mb-5 text-lg italic leading-[1.7] text-slate-700">{T.quote}</blockquote>
            <figcaption>
              <div className="text-[15px] font-bold text-primary-dark">{T.author}</div>
              <div className="text-[13px] text-ink-muted">{T.role}</div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
