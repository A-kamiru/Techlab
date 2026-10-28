import { useState } from 'react';
import { useSite } from '@/content/SiteContext';
import { RevealItem, Stagger } from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';

/** Accessible accordion: one item open at a time (as in the source), animated with grid-rows. */
export default function FAQ() {
  const FAQS = useSite().faqs;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faqs" className="section-padding bg-white">
      <div className="container-x">
        <SectionHeader title={FAQS.title} description={FAQS.description} />
        <Stagger className="mx-auto max-w-[800px]">
          {FAQS.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <RevealItem key={f.q}>
              <div
                className={`mb-4 overflow-hidden rounded-lg border bg-white transition-shadow duration-300 ${
                  isOpen ? 'border-brand/40 shadow-card-hover' : 'border-line shadow-card'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[17px] font-bold text-primary-dark transition-colors hover:bg-surface-slate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  >
                    {f.q}
                    <span
                      aria-hidden
                      className={`shrink-0 text-xl leading-none text-brand transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows,visibility] duration-300 ${
                    isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-[15px] leading-relaxed text-slate-600">{f.a}</p>
                  </div>
                </div>
              </div>
              </RevealItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
