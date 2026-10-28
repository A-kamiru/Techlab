import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSiteContext } from '@/content/SiteContext';
import { DEFAULT_SITE, SITE_KEYS, pageIndex, type SiteKey } from '@/content/defaults';
import { api, ApiError } from '@/lib/api';
import { isCompatible } from '@/lib/compat';

const inputCls = 'w-full rounded-lg border border-line bg-white px-3 py-2.5 text-[15px] outline-none focus:border-brand focus:ring-2 focus:ring-accent/40';

export default function Admin() {
  const { site, pages, siteOverrides, refresh } = useSiteContext();
  const [params, setParams] = useSearchParams();
  const [token, setToken] = useState(() => sessionStorage.getItem('tl_admin') ?? '');
  const [input, setInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [tab, setTab] = useState<'pages' | 'site'>('pages');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex,nofollow';
    document.head.appendChild(m);
    return () => void m.remove();
  }, []);

  const entries = useMemo(() => pageIndex(site), [site]);
  const slug = params.get('slug') ?? entries[0]?.slug ?? '';
  const entry = entries.find((e) => e.slug === slug);
  const o = pages[slug];
  const [form, setForm] = useState({ title: '', summary: '', body: '' });
  useEffect(() => {
    setForm({ title: o?.title ?? '', summary: o?.summary ?? '', body: o?.body ?? entry?.defaultBody ?? '' });
    setMsg(null);
  }, [slug, o, entry]);

  const [siteKey, setSiteKey] = useState<SiteKey>('hero');
  const [json, setJson] = useState('');
  useEffect(() => {
    setJson(JSON.stringify(site[siteKey], null, 2));
    setMsg(null);
  }, [siteKey, site]);

  async function login(e: FormEvent) {
    e.preventDefault();
    try {
      await api.checkToken(input);
      sessionStorage.setItem('tl_admin', input);
      setToken(input);
      setAuthError('');
    } catch (ex) {
      setAuthError(ex instanceof ApiError && ex.status === 503 ? 'Admin is disabled: set ADMIN_TOKEN on the server.' : 'Invalid token, or the API is not reachable.');
    }
  }
  const logout = () => { sessionStorage.removeItem('tl_admin'); setToken(''); };

  async function run(fn: () => Promise<void>, ok: string) {
    try {
      await fn();
      await refresh();
      setMsg({ ok: true, text: ok });
    } catch (ex) {
      if (ex instanceof ApiError && ex.status === 401) logout();
      setMsg({ ok: false, text: ex instanceof Error ? ex.message : 'Failed' });
    }
  }

  if (!token) {
    return (
      <section className="container-x section-padding max-w-md">
        <h1 className="mb-2 text-3xl font-extrabold text-primary-dark">Content editor</h1>
        <p className="mb-6 text-ink-muted">Enter the admin token to edit page content.</p>
        <form onSubmit={login}>
          <input type="password" autoComplete="current-password" className={inputCls} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Admin token" />
          {authError && <p role="alert" className="mt-2 text-sm text-red-700">{authError}</p>}
          <button className="btn btn-primary mt-4">Sign in</button>
        </form>
      </section>
    );
  }

  const kinds = [...new Set(entries.map((e) => e.kind))];
  const Msg = msg && <p role="status" className={`rounded-lg px-3 py-2 text-sm ${msg.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>{msg.text}</p>;

  return (
    <section className="container-x py-10">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <h1 className="text-3xl font-extrabold text-primary-dark">Content editor</h1>
        <div className="ml-auto flex gap-2">
          {(['pages', 'site'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`btn !px-4 !py-2 ${tab === t ? 'btn-primary' : 'btn-secondary'}`}>{t === 'pages' ? 'Pages' : 'Site copy'}</button>
          ))}
          <button onClick={logout} className="btn btn-secondary !px-4 !py-2">Sign out</button>
        </div>
      </div>

      {tab === 'pages' ? (
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <nav aria-label="Pages" className="max-h-[70vh] overflow-auto rounded-xl border border-line bg-surface-slate p-3">
            {kinds.map((k) => (
              <div key={k} className="mb-3">
                <div className="px-2 pb-1 text-xs font-bold uppercase tracking-wider text-ink-muted">{k}</div>
                {entries.filter((e) => e.kind === k).map((e) => (
                  <button key={e.slug} onClick={() => setParams({ slug: e.slug })} className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm ${e.slug === slug ? 'bg-brand text-white' : 'hover:bg-white'}`}>
                    <span className="truncate">{e.title}</span>
                    {(pages[e.slug]?.body || e.defaultBody) && <span aria-label="has content" className="text-xs">●</span>}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {entry && (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                run(() => api.putPage(slug, { title: form.title || null, summary: form.summary || null, body: form.body }, token), 'Saved.');
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><span className="text-xs font-bold uppercase text-brand">{entry.kind}</span><h2 className="text-xl font-bold text-primary-dark">{entry.title}</h2></div>
                <Link to={`/p/${slug}`} target="_blank" className="text-sm font-semibold text-brand underline">View page ↗</Link>
              </div>
              <label className="block text-sm font-medium">Title <span className="text-ink-muted">(blank = "{entry.title}")</span>
                <input className={`${inputCls} mt-1`} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
              <label className="block text-sm font-medium">Summary <span className="text-ink-muted">(blank = default)</span>
                <textarea rows={2} className={`${inputCls} mt-1`} value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} /></label>
              <label className="block text-sm font-medium">Body
                <textarea rows={16} className={`${inputCls} mt-1 font-mono text-[13px]`} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
                  placeholder={'## Heading\n\nParagraph with **bold** and a [link](/p/another-page).\n\n- Bullet one\n- Bullet two'} /></label>
              <p className="text-xs text-ink-muted">Supported: ## and ### headings, - bullet lists, **bold**, [text](url). Blank line between blocks.</p>
              {Msg}
              <div className="flex gap-3">
                <button className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => run(() => api.deletePage(slug, token), 'Reset to default.')}>Reset to default</button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <form
          className="max-w-4xl space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            let v: unknown;
            try { v = JSON.parse(json); } catch { return setMsg({ ok: false, text: 'Invalid JSON.' }); }
            if (!isCompatible(DEFAULT_SITE[siteKey], v)) return setMsg({ ok: false, text: 'Structure does not match the original: keep every field (including each item\'s "slug"), and use text for text.' });
            run(() => api.putSite(siteKey, v, token), 'Saved.');
          }}
        >
          <p className="text-sm text-ink-muted">Edit any text on the home page. Keep the JSON structure; change only the values. New cards need a unique <code>slug</code> (it becomes /p/&lt;slug&gt;).</p>
          <label className="block text-sm font-medium">Section
            <select className={`${inputCls} mt-1`} value={siteKey} onChange={(e) => setSiteKey(e.target.value as SiteKey)}>
              {SITE_KEYS.map((k) => <option key={k} value={k}>{k}{k in siteOverrides ? ' (edited)' : ''}</option>)}
            </select></label>
          <textarea rows={24} spellCheck={false} className={`${inputCls} font-mono text-[13px]`} value={json} onChange={(e) => setJson(e.target.value)} aria-label="Section JSON" />
          {Msg}
          <div className="flex gap-3">
            <button className="btn btn-primary">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => run(() => api.deleteSite(siteKey, token), 'Reset to default.')}>Reset to default</button>
          </div>
        </form>
      )}
    </section>
  );
}
