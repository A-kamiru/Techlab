import { motion, useReducedMotion } from 'framer-motion';
import { useSite } from '@/content/SiteContext';
import { RevealItem, Stagger } from '@/components/ui/Reveal';

export default function Hero() {
  const HERO = useSite().hero;
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden bg-primary-dark">
      {/* Photo -> navy scrim -> brand glow keeps the H1 legible on any part of the image */}
      <motion.img
        src={HERO.image}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        initial={{ scale: reduce ? 1 : 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-primary-dark/90 via-primary-dark/75 to-primary-dark/95" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,102,204,0.38),transparent_62%)]" />

      <div className="container-x py-14 sm:py-24 lg:py-32">
        <Stagger onLoad className="mx-auto flex max-w-[1040px] flex-col items-center text-center">
          <RevealItem>
            <div className="mb-5 inline-flex max-w-full items-center justify-center rounded-lg border border-white/20 bg-white/10 px-3.5 py-1.5 text-center text-[11px] font-bold uppercase leading-snug tracking-[0.04em] text-sky-200 backdrop-blur-md sm:mb-7 sm:rounded-full sm:px-[18px] sm:py-[7px] sm:text-[13px]">
              {HERO.eyebrow}
            </div>
          </RevealItem>

          <RevealItem className="w-full">
            <h1 className="mb-5 w-full text-balance text-[clamp(28px,7.5vw,72px)] font-extrabold leading-[1.15] tracking-[-0.035em] text-white [text-shadow:0_2px_24px_rgba(10,25,47,0.45)] sm:mb-7 sm:leading-[1.1]">
              <span className="block">{HERO.line1}</span> <span className="block text-accent">{HERO.line2}</span>
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mx-auto mb-8 max-w-[760px] text-[15px] leading-[1.6] text-slate-200 sm:mb-10 sm:text-[17px] sm:leading-[1.65] lg:text-xl">{HERO.subhead}</p>
          </RevealItem>

          <RevealItem className="max-sm:w-full">
            <div className="flex flex-wrap justify-center gap-3 max-sm:flex-col sm:gap-4">
              <a href={HERO.primaryCta.href} className="btn btn-primary w-full text-center sm:w-auto">
                {HERO.primaryCta.label}
              </a>
              <a
                href={HERO.secondaryCta.href}
                className="btn w-full border-white/30 bg-white/10 text-center text-white backdrop-blur-md hover:border-white/50 hover:bg-white/20 sm:w-auto"
              >
                {HERO.secondaryCta.label}
              </a>
            </div>
          </RevealItem>
        </Stagger>
      </div>
    </section>
  );
}
