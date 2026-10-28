import { BRAND } from '@/content/site';

/**
 * Official lockup (Techlab wordmark + tagline + SAP Partner badge) when BRAND.logoSrc is set,
 * otherwise a text placeholder. The lockup has dark text, so on dark backgrounds it sits on a white plate.
 */
export default function Logo({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  if (BRAND.logoSrc) {
    const img = (
      <img
        src={BRAND.logoSrc}
        alt={BRAND.name}
        width={BRAND.logoWidth}
        height={BRAND.logoHeight}
        className="h-9 w-auto max-w-none shrink-0 sm:h-12"
      />
    );
    return variant === 'light' ? (
      <span className="inline-flex rounded-lg bg-white px-3 py-2 shadow-card">{img}</span>
    ) : (
      img
    );
  }
  return (
    <span
      aria-label={BRAND.name}
      className={`flex items-center gap-2 text-[22px] font-extrabold leading-none tracking-tight max-sm:text-[19px] ${
        variant === 'dark' ? 'text-primary-dark' : 'text-white'
      }`}
    >
      <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(0,168,232,0.7)]" />
      TECHLAB
    </span>
  );
}
