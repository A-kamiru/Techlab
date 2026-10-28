import { useEffect } from 'react';
import { BRAND, NAV_LINKS, WHATSAPP } from '@/content/site';
import { useUiStore } from '@/store/uiStore';
import { useScrolled } from '@/hooks/useScrolled';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import AnchorLink from '@/components/ui/AnchorLink';

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Header() {
  const { menuOpen, setMenu, toggleMenu } = useUiStore();
  const scrolled = useScrolled(8);
  const active = useScrollSpy(SECTION_IDS);

  // Escape closes the menu; leaving the mobile breakpoint resets it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    const onResize = () => window.innerWidth > 1120 && setMenu(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [setMenu]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-[1000] border-b backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ${
          scrolled ? 'border-white/60 bg-white/75 shadow-glass' : 'border-line/70 bg-white/60'
        }`}
      >
        <div className="container-x relative flex h-[68px] items-center justify-between gap-3 sm:h-20 sm:gap-8">
          <Link
            to="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5 whitespace-nowrap sm:gap-3.5"
            aria-label={`${BRAND.name} home`}
          >
            <Logo />
            {/* The official lockup already carries the SAP Partner badge, so the pill is text-fallback only */}
            {!BRAND.logoSrc && (
            <span className="hidden h-6 items-center rounded-full bg-accent-light px-3 text-[11px] font-bold uppercase leading-none tracking-wider text-brand sm:inline-flex">
              {BRAND.partnerPill}
            </span>
            )}
          </Link>

          <nav
            id="primaryNav"
            aria-label="Primary"
            className={`${
              menuOpen ? 'flex' : 'hidden'
            } absolute left-0 right-0 top-full max-h-[calc(100dvh-68px)] flex-col overflow-y-auto items-stretch border-b border-line bg-white/90 px-6 pb-6 pt-2 text-[15px] font-semibold text-slate-700 shadow-glass backdrop-blur-xl nav:static nav:max-h-none nav:overflow-visible nav:ml-auto nav:flex nav:flex-row nav:items-center nav:justify-end nav:gap-7 nav:border-0 nav:bg-transparent nav:p-0 nav:shadow-none nav:backdrop-blur-none`}
          >
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <AnchorLink
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenu(false)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative shrink-0 whitespace-nowrap border-b border-line py-4 transition-colors hover:text-brand nav:border-0 nav:py-2 after:absolute after:bottom-0 after:left-0 after:hidden after:h-0.5 after:w-full after:origin-left after:bg-brand after:transition-transform after:duration-300 nav:after:block hover:after:scale-x-100 ${
                    isActive ? 'text-brand after:scale-x-100' : 'after:scale-x-0'
                  }`}
                >
                  {l.label}
                </AnchorLink>
              );
            })}

            {/* Quick Actions in Mobile Menu */}
            <div className="mt-4 flex flex-col gap-2.5 border-t border-line/60 pt-4 nav:hidden">
              <a
                href="#contact"
                onClick={() => setMenu(false)}
                className="btn btn-primary w-full text-center"
              >
                Talk to an SAP Expert
              </a>
              <a
                href={WHATSAPP.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex w-full items-center justify-center gap-2 text-center"
              >
                <span>💬</span> WhatsApp Us
              </a>
            </div>
          </nav>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="primaryNav"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white/70 text-[22px] leading-none text-primary-dark transition-colors hover:bg-white nav:hidden"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>
    </>
  );
}
