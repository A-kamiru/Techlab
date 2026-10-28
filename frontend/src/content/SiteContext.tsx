import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_SITE, SITE_KEYS, type Site } from './defaults';
import { api, type PageOverride } from '@/lib/api';
import { isCompatible } from '@/lib/compat';

interface Value {
  site: Site;
  pages: Record<string, PageOverride>;
  siteOverrides: Record<string, unknown>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<Value>({ site: DEFAULT_SITE, pages: {}, siteOverrides: {}, refresh: async () => {} });

/** Bundled defaults render immediately; API overrides (if the backend is reachable) are layered on top. */
export function SiteProvider({ children }: { children: ReactNode }) {
  const [siteOverrides, setSiteOverrides] = useState<Record<string, unknown>>({});
  const [pages, setPages] = useState<Record<string, PageOverride>>({});

  const refresh = useCallback(async () => {
    try {
      const c = await api.getContent();
      setSiteOverrides(c.site ?? {});
      setPages(c.pages ?? {});
    } catch {
      /* backend offline: keep defaults */
    }
  }, []);
  useEffect(() => void refresh(), [refresh]);

  const site = useMemo(() => {
    const out = { ...DEFAULT_SITE } as Record<string, unknown>;
    for (const k of SITE_KEYS) {
      if (k in siteOverrides && isCompatible(DEFAULT_SITE[k], siteOverrides[k])) out[k] = siteOverrides[k];
    }
    return out as Site;
  }, [siteOverrides]);

  return <Ctx.Provider value={{ site, pages, siteOverrides, refresh }}>{children}</Ctx.Provider>;
}

export const useSiteContext = () => useContext(Ctx);
export const useSite = () => useContext(Ctx).site;
