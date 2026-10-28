import { useEffect, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useSiteContext } from '@/content/SiteContext';
import { pageIndex } from '@/content/defaults';
import Markdown from '@/components/ui/Markdown';

export default function DetailPage() {
  const params = useParams();
  const location = useLocation();
  const rawSlug = params.slug || params['*']?.split('/').filter(Boolean).pop() || location.pathname.split('/').filter(Boolean).pop() || '';
  const cleanSlug = rawSlug.replace(/\/+$/, '');
  const { site, pages } = useSiteContext();

  const entry = useMemo(() => {
    const list = pageIndex(site);
    return list.find(
      (e) =>
        e.slug === cleanSlug ||
        e.alias === cleanSlug ||
        e.slug === `service-${cleanSlug}` ||
        cleanSlug === e.slug.replace(/^service-/, '') ||
        (e.url && e.url.replace(/^\/+|\/+$/g, '').split('/').pop() === cleanSlug),
    );
  }, [site, cleanSlug]);

  const effectiveSlug = entry?.slug || cleanSlug;
  const o = pages[effectiveSlug] || pages[cleanSlug];

  const title = o?.title || entry?.title || 'Page not found';
  const h1 = o?.h1 || entry?.h1 || title;
  const eyebrow = o?.eyebrow || entry?.eyebrow || entry?.kind || 'Service';
  const summary = o?.summary || entry?.summary;
  const body = o?.body?.trim() ? o.body : entry?.defaultBody;
  const heroCta = o?.heroCta || entry?.heroCta || 'Talk to an SAP expert';
  const closingHeadline = o?.closingHeadline || entry?.closingHeadline || 'Not sure where to start? Start with a conversation.';
  const closingCta = o?.closingCta || entry?.closingCta || 'Talk to an SAP expert';
  const seoTitle = o?.seoTitle || entry?.seoTitle || `${title} | Techlab Systems`;
  const metaDescription = o?.metaDescription || entry?.metaDescription || summary;

  const isAdmin = !!sessionStorage.getItem('tl_admin');

  useEffect(() => {
    const prevTitle = document.title;
    document.title = seoTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDescription) {
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', metaDescription);
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc);
    };
  }, [seoTitle, metaDescription]);

  if (!entry) {
    return (
      <section className="container-x section-padding text-center">
        <h1 className="mb-4 text-3xl font-extrabold text-primary-dark">Page not found</h1>
        <Link to="/" className="btn btn-primary">Back to home →</Link>
      </section>
    );
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_0%,rgba(0,102,204,0.4),transparent_60%)]" />
        <div className="container-x py-16 sm:py-24">
          <Link
            to="/"
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:border-accent hover:bg-white/20 hover:text-accent hover:shadow-md"
          >
            <span className="text-sm transition-transform duration-200 group-hover:-translate-x-1">←</span>
            <span>Back to home</span>
          </Link>
          <span className="mb-4 block text-xs font-extrabold uppercase tracking-wider text-accent">{eyebrow}</span>
          <h1 className="mb-5 max-w-3xl text-balance text-[clamp(28px,4.5vw,52px)] font-extrabold leading-[1.15] tracking-tight">{h1}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-slate-300">{summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn-primary">
              {heroCta} →
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-x max-w-3xl">
          {entry.facts && (
            <dl className="mb-10 grid gap-4 rounded-xl border border-line bg-surface-slate p-6 shadow-card">
              {entry.facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-bold uppercase text-primary-dark">{k}</dt>
                  <dd className="text-[15px] text-ink-muted">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {body?.trim() ? (
            <Markdown source={body} />
          ) : (
            <div className="rounded-xl border border-dashed border-line bg-surface-slate p-8 text-center text-ink-muted">
              Detailed content for this page is on its way.
              {isAdmin && (
                <div className="mt-3">
                  <Link to={`/admin?slug=${effectiveSlug}`} className="font-semibold text-brand underline">Add content in the editor →</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Closing Band */}
      <section className="relative isolate overflow-hidden border-t border-b border-white/10 bg-gradient-to-b from-primary-navy/80 via-primary-dark/85 to-primary-navy/90 py-10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl sm:py-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,102,204,0.25),transparent_70%)]" />
        <div className="container-x max-w-3xl text-center">
          <h2 className="mb-5 text-balance text-xl font-extrabold tracking-tight sm:text-2xl lg:text-[26px]">
            {closingHeadline}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link to={{ pathname: '/', hash: '#contact' }} className="btn btn-primary shadow-md">
              {closingCta} →
            </Link>
            <Link to="/" className="btn border border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/20">
              Back to home
            </Link>
          </div>
          {isAdmin && (
            <div className="mt-5">
              <Link to={`/admin?slug=${effectiveSlug}`} className="text-sm font-semibold text-accent underline">
                Edit this page in admin
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
