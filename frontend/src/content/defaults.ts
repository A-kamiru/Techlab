import { HERO, PROOF, CHALLENGE, SOLUTIONS } from './home';
import { SERVICES, INDUSTRIES, CASES, FAQS, CONTACT, TESTIMONIAL, WHY, INSIGHTS } from './sections';
import { SERVICE_PAGES } from './servicePages';

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const mk = (prefix: string, title: string) => `${prefix}-${slugify(title)}`;

/**
 * Default site content. Admin overrides (stored by the API) replace whole top-level keys.
 * Every clickable item carries a stable `slug` that maps to /p/:slug.
 */
export const DEFAULT_SITE = {
  hero: HERO,
  proof: PROOF.map((p) => ({ ...p, slug: mk('kpi', p.number) })),
  challenge: CHALLENGE,
  solutions: {
    ...SOLUTIONS,
    groups: SOLUTIONS.groups.map((g) => ({ ...g, items: g.items.map((i) => ({ ...i, slug: mk('solution', i.title) })) })),
  },
  services: { ...SERVICES, items: SERVICES.items.map((i) => ({ ...i, slug: mk('service', i.title) })) },
  industries: { ...INDUSTRIES, items: INDUSTRIES.items.map((i) => ({ ...i, slug: mk('industry', i.title) })) },
  cases: { ...CASES, items: CASES.items.map((c) => ({ ...c, slug: mk('case', c.meta) })) },
  testimonial: TESTIMONIAL,
  why: WHY,
  insights: { ...INSIGHTS, items: INSIGHTS.items.map((i) => ({ ...i, slug: mk('insight', i.title) })) },
  faqs: FAQS,
  contact: CONTACT,
};

export type Site = typeof DEFAULT_SITE;
export type SiteKey = keyof Site;
export const SITE_KEYS = Object.keys(DEFAULT_SITE) as SiteKey[];

export interface PageEntry {
  slug: string;
  alias?: string;
  kind: 'KPI' | 'Solution' | 'Service' | 'Industry' | 'Case study' | 'Insight';
  title: string;
  h1?: string;
  eyebrow?: string;
  summary: string;
  facts?: [string, string][];
  defaultBody?: string;
  seoTitle?: string;
  metaDescription?: string;
  heroCta?: string;
  closingHeadline?: string;
  closingCta?: string;
  url?: string;
}

/** Every clickable item on the home page, as a detail-page entry. */
export function pageIndex(site: Site): PageEntry[] {
  return [
    ...site.proof.map((p): PageEntry => ({ slug: p.slug, kind: 'KPI', title: p.number, summary: p.label })),
    ...site.cases.items.map(
      (c): PageEntry => ({
        slug: c.slug,
        kind: 'Case study',
        title: c.meta,
        summary: c.result,
        facts: [
          ['Challenge', c.challenge],
          ['Objective', c.objective],
          ['What we did', c.whatWeDid],
          ['Result', c.result],
        ],
      }),
    ),
    ...site.solutions.groups.flatMap((g) => g.items.map((i): PageEntry => ({ slug: i.slug, kind: 'Solution', title: i.title, summary: i.text }))),
    ...site.services.items.map((i): PageEntry => {
      const sp = SERVICE_PAGES[i.slug];
      return {
        slug: i.slug,
        alias: sp?.alias,
        kind: 'Service',
        title: sp?.title || i.title,
        h1: sp?.h1,
        eyebrow: sp?.eyebrow,
        summary: sp?.summary || i.text,
        facts: sp?.facts,
        defaultBody: sp?.body,
        seoTitle: sp?.seoTitle,
        metaDescription: sp?.metaDescription,
        heroCta: sp?.heroCta,
        closingHeadline: sp?.closingHeadline,
        closingCta: sp?.closingCta,
        url: sp?.url,
      };
    }),
    ...site.industries.items.map((i): PageEntry => ({ slug: i.slug, kind: 'Industry', title: i.title, summary: i.text })),
    ...site.insights.items.map((i): PageEntry => ({ slug: i.slug, kind: 'Insight', title: i.title, summary: i.text, facts: [['Topic', i.meta]] })),
  ];
}
