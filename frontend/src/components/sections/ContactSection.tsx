import { useMemo } from 'react';
import { useSite } from '@/content/SiteContext';
import { TEAM, LINKS, type TeamKey } from '@/content/contact';
import { WHATSAPP } from '@/content/site';
import { Reveal } from '@/components/ui/Reveal';
import ContactForm from './ContactForm';

export default function ContactSection() {
  const c = useSite().contact;
  const loc = useMemo(() => {
    const l = (new URLSearchParams(window.location.search).get('loc') ?? '').toUpperCase();
    return TEAM[(l in TEAM ? l : 'KE') as TeamKey];
  }, []);

  return (
    <section id="contact" className="section-padding relative isolate overflow-hidden bg-primary-dark text-white">
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,102,204,0.30),transparent_70%)]" />

      <div className="container-x flex flex-col items-center">
        {/* 1. TOP: RED BOX (Heading & Intro paragraph centered) */}
        <Reveal className="mb-6 max-w-3xl text-center">
          <h2 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:mb-4 sm:text-4xl lg:text-[40px]">
            {c.title}
          </h2>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-lg">
            {c.text}
          </p>
        </Reveal>

        {/* 2. GREEN BOX REPLACEMENT: Dedicated WhatsApp Action */}
        <Reveal className="mb-7 sm:mb-8" delay={0.05}>
          <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs text-slate-300 backdrop-blur-sm transition-colors hover:border-white/20 sm:gap-3 sm:px-5 sm:text-sm">
            <span>Prefer to chat directly?</span>
            <a
              href={WHATSAPP.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1 font-semibold text-white shadow-sm transition-all duration-200 hover:scale-105 hover:bg-[#1fb857] sm:gap-2 sm:px-4 sm:py-1.5"
            >
              <span className="text-base">💬</span> {c.whatsappCta}
            </a>
          </div>
        </Reveal>

        {/* 3. MIDDLE: THE FORM (Widened & Centered) */}
        <Reveal className="w-full max-w-3xl" delay={0.1}>
          <ContactForm />
        </Reveal>

        {/* 4. BOTTOM: PINK BOX (What happens next & Direct contact) */}
        <Reveal className="mt-10 w-full max-w-3xl sm:mt-12" delay={0.15}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl backdrop-blur-sm sm:p-8">
            <h3 className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-accent sm:mb-6">
              {c.nextTitle}
            </h3>

            {/* 3 Steps in a responsive horizontal grid */}
            <div className="mb-7 grid gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-6">
              {c.next.map((n, i) => (
                <div key={n.title} className="flex flex-col rounded-xl border border-white/5 bg-white/[0.02] p-3.5 text-center transition-colors hover:border-white/15 sm:p-4 sm:text-left">
                  <span className="mb-2.5 inline-grid h-7 w-7 place-items-center self-center rounded-full bg-accent/20 text-xs font-bold text-accent sm:mb-3 sm:self-start">
                    {i + 1}
                  </span>
                  <h4 className="mb-1 text-sm font-semibold leading-snug text-white sm:mb-1.5 sm:text-[15px]">{n.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-300 sm:text-[13px]">{n.text}</p>
                </div>
              ))}
            </div>

            {/* Alternative contacts */}
            <div className="border-t border-white/10 pt-5 text-center sm:pt-6">
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {c.altTitle}
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-300">
                <a
                  href={WHATSAPP.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline"
                >
                  <span>💬</span> <span>WhatsApp us now</span>
                </a>
                <span className="hidden text-white/30 sm:inline">•</span>
                <span>
                  Call the {loc.team} ({loc.city}):{' '}
                  <a href={`tel:${loc.phone.replace(/ /g, '')}`} className="font-semibold text-white hover:text-accent">
                    {loc.phone}
                  </a>
                </span>
                {LINKS.bookingUrl && (
                  <>
                    <span className="hidden text-white/30 sm:inline">•</span>
                    <a
                      href={LINKS.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-accent hover:underline"
                    >
                      <span>📅</span> <span>Book a 30-min call</span>
                    </a>
                  </>
                )}
              </div>
              <div className="mt-2.5 text-xs text-slate-400">
                {c.hours}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
