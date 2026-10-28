import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import { useSite } from '@/content/SiteContext';

/** Each KPI links to its own editable page at /p/:slug. */
export default function ProofStrip() {
  const PROOF = useSite().proof;
  return (
    <div className="border-t border-white/10 bg-primary-dark py-4 sm:py-5 text-white">
      <Reveal className="container-x grid grid-cols-2 items-center gap-x-2 gap-y-3 text-center sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {PROOF.map((p, idx) => {
          const isRightBorderMobile = idx % 2 === 0;
          const isBottomBorderMobile = idx < 2;
          const isRightBorderDesktop = idx < PROOF.length - 1;

          return (
            <Link
              key={p.slug}
              to={`/p/${p.slug}`}
              className={`group flex flex-col items-center justify-center px-2 py-2 transition-colors hover:bg-white/5 sm:px-3 sm:py-2.5 ${
                isRightBorderMobile ? 'border-r border-white/10 ' : ''
              }${
                isBottomBorderMobile ? 'border-b border-white/10 lg:border-b-0 ' : ''
              }${
                isRightBorderDesktop ? 'lg:border-r lg:border-white/15 ' : 'lg:border-r-0 '
              }`}
            >
              <div
                className={`font-extrabold leading-none text-accent whitespace-nowrap ${
                  p.number.length > 15
                    ? 'text-[15px] sm:text-lg lg:text-[17px] xl:text-[20px]'
                    : 'text-xl sm:text-[22px]'
                }`}
              >
                {p.number}
              </div>
              <div className="mt-1.5 whitespace-nowrap text-[10.5px] font-semibold uppercase leading-none tracking-wider text-slate-300 sm:text-xs">
                {p.label}
              </div>
            </Link>
          );
        })}
      </Reveal>
    </div>
  );
}
