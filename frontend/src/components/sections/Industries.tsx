import type { ReactNode } from 'react';
import { useSite } from '@/content/SiteContext';
import { Link } from 'react-router-dom';
import { RevealItem, Stagger } from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';

interface IndustryMeta {
  image: string;
  icon: ReactNode;
}

const INDUSTRY_META: Record<string, IndustryMeta> = {
  Manufacturing: {
    image: '/images/industry-manufacturing.jpg',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </svg>
    ),
  },
  'Consumer Products': {
    image: '/images/industry-consumer.jpg',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  Retail: {
    image: '/images/industry-retail.jpg',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  Chemicals: {
    image: '/images/industry-chemicals.jpg',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31L4.2 18.57A2 2 0 0 0 5.9 22h12.2a2 2 0 0 0 1.7-3.43L14 9.31V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
  'Professional Services': {
    image: '/images/industry-services.jpg',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  'High Tech': {
    image: '/images/industry-hightech.jpg',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="16" x="4" y="4" rx="2" />
        <rect width="6" height="6" x="9" y="9" rx="1" />
        <path d="M15 2v2" />
        <path d="M15 20v2" />
        <path d="M2 15h2" />
        <path d="M2 9h2" />
        <path d="M20 15h2" />
        <path d="M20 9h2" />
        <path d="M9 2v2" />
        <path d="M9 20v2" />
      </svg>
    ),
  },
};

export default function Industries() {
  const INDUSTRIES = useSite().industries;

  return (
    <section id="industries" className="section-padding bg-surface-slate">
      <div className="container-x">
        <SectionHeader title={INDUSTRIES.title} description={INDUSTRIES.description} />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.items.map((i) => {
            const meta = INDUSTRY_META[i.title];
            return (
              <RevealItem key={i.title} className="h-full">
                <Link
                  to={`/p/${i.slug}`}
                  className="group relative block h-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl sm:p-7"
                >
                  {/* Physical background image covering the whole card */}
                  {meta && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <img
                        src={meta.image}
                        alt={i.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-95"
                      />
                      {/* Physical gradient overlay: solid clean white on the left for text readability, clear photo reveal on right */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 via-35% to-transparent" />
                    </div>
                  )}

                  {/* Card content */}
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50/90 text-brand shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-brand group-hover:bg-brand group-hover:text-white group-hover:shadow-md sm:mb-5 sm:h-12 sm:w-12">
                        {meta?.icon}
                      </div>
                      <h3 className="mb-2 text-lg font-bold tracking-tight text-primary-dark transition-colors group-hover:text-brand sm:mb-2.5 sm:text-xl">
                        {i.title}
                      </h3>
                      <p className="max-w-full text-sm font-medium leading-relaxed text-slate-800 sm:max-w-[85%] sm:text-[14.5px]">
                        {i.text}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand transition-opacity duration-200 max-lg:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 sm:mt-6">
                      <span>Explore {i.title}</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </Stagger>

        <div className="mt-10 text-center sm:mt-12">
          <a href={INDUSTRIES.cta.href} className="btn btn-primary w-full sm:w-auto text-center">
            {INDUSTRIES.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
