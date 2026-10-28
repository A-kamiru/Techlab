import { useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { api, ApiError, type PhonePayload } from '@/lib/api';
import { DIAL_CODES, normalizePhone } from '@/lib/phone';
import {
  COUNTRY_OPTIONS, FREE_EMAIL, INTERESTS, LANDSCAPES, LINKS, ROLES, TEAM, TIMELINES, type TeamKey,
} from '@/content/contact';
import { WHATSAPP } from '@/content/site';
import { useSite } from '@/content/SiteContext';

type Step = 1 | 2 | 3;
const label = <T extends { value: string; label: string }>(list: readonly T[], v: string) => list.find((x) => x.value === v)?.label ?? '';

const inputCls =
  'w-full min-h-[44px] rounded-lg border border-line bg-white px-3 py-2.5 text-base sm:text-[15px] text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-600';

function Field({ id, label: text, optional, error, hint, children }: { id: string; label: string; optional?: boolean; error?: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-[18px]">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {text} {optional && <span className="font-normal text-ink-muted">(optional)</span>}
      </label>
      {children}
      {error ? <p id={`${id}-msg`} role="alert" className="mt-1.5 text-[13px] text-red-700">{error}</p> : hint ? <p id={`${id}-msg`} className="mt-1.5 text-[13px] text-ink-muted">{hint}</p> : null}
    </div>
  );
}

function Chips({ name, legend, optional, options, value, onChange, error }: { name: string; legend: string; optional?: boolean; options: readonly { value: string; label: string }[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <fieldset className="mb-[18px] min-w-0 border-0 p-0">
      <legend className="mb-1.5 p-0 text-sm font-medium">
        {legend} {optional && <span className="font-normal text-ink-muted">(optional)</span>}
      </legend>
      <div className="flex flex-wrap gap-1.5 sm:gap-2" role="radiogroup">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer sr-only" />
            <span className="inline-block rounded-full border border-line bg-white px-3 py-1.5 text-xs transition-colors hover:border-brand peer-checked:border-brand peer-checked:bg-accent-light peer-checked:font-semibold peer-checked:text-brand peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 sm:px-3.5 sm:py-2 sm:text-sm">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      {error && <p role="alert" className="mt-1.5 text-[13px] text-red-700">{error}</p>}
    </fieldset>
  );
}

export default function ContactForm() {
  const { cases, contact } = useSite();
  const q = useMemo(() => new URLSearchParams(window.location.search), []);
  const locParam = (q.get('loc') ?? '').toUpperCase();
  const loc: TeamKey = (locParam in TEAM ? locParam : 'KE') as TeamKey;
  const srcParam = q.get('src') ?? '';
  const topRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<Step>(1);
  const [f, setF] = useState({
    name: '', email: '', company: '',
    interest: INTERESTS.some((i) => i.value === srcParam) ? srcParam : '',
    dial: loc === 'IN' ? 'IN' : loc, phone: '', consent: false, website: '',
  });
  const [g, setG] = useState({ role: '', landscape: '', timeline: '', country: loc as string, note: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [busy, setBusy] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [phone, setPhone] = useState<{ payload: PhonePayload; e164: string } | null>(null);

  const go = (s: Step) => {
    setStep(s);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };
  const setField = (k: keyof typeof f, v: string | boolean) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: '' }));
  };

  async function submitStep1(e: FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!f.name.trim()) err.name = 'Enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) err.email = 'Enter an email address like name@company.com.';
    if (!f.company.trim()) err.company = 'Enter your company name.';
    if (!f.interest) err.interest = 'Pick the option closest to what you need.';
    if (!f.consent) err.consent = 'Tick the box so we can contact you.';
    let p: PhonePayload | null = null;
    let e164 = '';
    if (f.phone.trim()) {
      const n = normalizePhone(f.dial, f.phone);
      if (n.ok) { p = n.value; e164 = n.e164; } else err.phone = n.error;
    }
    setErrors(err);
    setApiError('');
    if (Object.keys(err).length) {
      requestAnimationFrame(() => document.querySelector('[role="alert"]')?.scrollIntoView({ block: 'center', behavior: 'smooth' }));
      return;
    }
    setBusy(true);
    try {
      const res = await api.createLead({
        name: f.name.trim(), email: f.email.trim(), company: f.company.trim(), interest: f.interest,
        phone: p, consent: true, source: srcParam || null, region_hint: loc,
        page_url: window.location.href, website: f.website,
      });
      setLeadId(res.id);
      setPhone(p ? { payload: p, e164 } : null);
      go(2);
    } catch (ex) {
      setApiError(
        ex instanceof ApiError && ex.status === 422
          ? 'Some details were not accepted. Please check the phone number and email, then try again.'
          : "We couldn't save your request just now. Please try again, or message us on WhatsApp.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function submitStep2(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setApiError('');
    try {
      if (leadId)
        await api.updateLead(leadId, {
          role: g.role || undefined, current_setup: g.landscape || undefined,
          timeline: g.timeline || undefined, country: g.country, note: g.note.trim() || undefined,
        });
      go(3);
    } catch {
      setApiError("We couldn't save these extra details, but your request is already with us. You can skip and finish.");
    } finally {
      setBusy(false);
    }
  }

  const team = TEAM[(g.country in TEAM ? g.country : 'KE') as TeamKey];
  const first = f.name.trim().split(/\s+/)[0];
  const caseLink = cases.items.find((c) => /manufactur/i.test(c.meta))?.slug;
  const waUrl = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(`Hello, this is ${f.name.trim()} from ${f.company.trim()}. I just sent an enquiry about SAP.`)}`;

  return (
    <div ref={topRef} id="contact-form" className="scroll-mt-24 rounded-2xl border border-white/10 bg-white p-4 text-ink shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] sm:p-8" aria-live="polite">
      {step < 3 && (
        <>
          <h3 className="mb-2 text-xl font-extrabold leading-tight tracking-tight text-primary-dark sm:text-2xl">{contact.formTitle}</h3>
          <p className="mb-5 text-sm text-ink-muted sm:mb-6 sm:text-[15px]">{contact.formLede}</p>
          <div className="mb-6 flex gap-2">
            {['1. About you', '2. About your project'].map((t, i) => (
              <div key={t} className={`flex-1 border-t-[3px] pt-2 text-xs sm:text-[13px] ${step === i + 1 ? 'border-brand font-semibold text-ink' : step > i + 1 ? 'border-emerald-600 text-emerald-700' : 'border-line text-ink-muted'}`}>
                {t}
              </div>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <form onSubmit={submitStep1} noValidate>
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field id="name" label="Full name" error={errors.name}>
              <input id="name" className={inputCls} autoComplete="name" value={f.name} onChange={(e) => setField('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-msg' : undefined} />
            </Field>
            <Field
              id="email" label="Work email" error={errors.email}
              hint={FREE_EMAIL.test(f.email) ? <span className="text-amber-800">A personal address works. A work email helps us route you to the right specialist faster.</span> : undefined}
            >
              <input id="email" type="email" className={inputCls} autoComplete="email" placeholder="you@company.com" value={f.email} onChange={(e) => setField('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email || FREE_EMAIL.test(f.email) ? 'email-msg' : undefined} />
            </Field>
          </div>

          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field id="company" label="Company" error={errors.company}>
              <input id="company" className={inputCls} autoComplete="organization" value={f.company} onChange={(e) => setField('company', e.target.value)} aria-invalid={!!errors.company} aria-describedby={errors.company ? 'company-msg' : undefined} />
            </Field>

            <Field id="phone" label="Phone or WhatsApp" optional error={errors.phone} hint="Prefer a call or WhatsApp? Add your number and we'll use it.">
              <div className="grid grid-cols-[105px_1fr] sm:grid-cols-[110px_1fr] gap-2">
                <select aria-label="Country code" className={inputCls} value={f.dial} onChange={(e) => setField('dial', e.target.value)}>
                  {DIAL_CODES.map((d) => <option key={d.iso} value={d.iso}>{d.label} {d.cc}</option>)}
                </select>
                <input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" className={inputCls} value={f.phone} onChange={(e) => setField('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby="phone-msg" />
              </div>
            </Field>
          </div>

          <Chips name="interest" legend="What do you need help with?" options={INTERESTS} value={f.interest} onChange={(v) => setField('interest', v)} error={errors.interest} />

          {/* Honeypot: hidden from people, bots fill it */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => setField('website', e.target.value)} /></label>
          </div>

          <label className="mb-1 mt-1 flex items-start gap-2.5 text-[13px] text-ink-muted">
            <input type="checkbox" checked={f.consent} onChange={(e) => setField('consent', e.target.checked)} className="mt-0.5 h-[18px] w-[18px] accent-brand" aria-invalid={!!errors.consent} />
            <span>
              I agree to Techlab contacting me about my enquiry, including by WhatsApp if I've added a number. See our{' '}
              {LINKS.privacyUrl ? <a href={LINKS.privacyUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline">privacy policy</a> : 'privacy policy'}.
            </span>
          </label>
          {errors.consent && <p role="alert" className="mb-3 text-[13px] text-red-700">{errors.consent}</p>}
          {apiError && <p role="alert" className="mb-3 mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{apiError}</p>}

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button type="submit" disabled={busy} className="btn btn-primary min-h-[48px] w-full text-center sm:w-auto disabled:opacity-60">{busy ? 'Saving…' : 'Continue'}</button>
          </div>
          <p className="mt-3.5 text-xs text-ink-muted">Takes about 30 seconds. Your details are saved as soon as you continue.</p>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={submitStep2} noValidate>
          <div className="mb-5 flex gap-2.5 rounded-lg bg-accent-light px-3.5 py-3 text-sm">
            <b aria-hidden className="text-emerald-700">✓</b>
            <div><strong>Your request is saved.</strong><br />The questions below are optional. They help us prepare for your call.</div>
          </div>
          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field id="role" label="Your role" optional>
              <select id="role" className={inputCls} value={g.role} onChange={(e) => setG({ ...g, role: e.target.value })}>
                <option value="">Select</option>
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field id="ctry" label="Country">
              <select id="ctry" className={inputCls} value={g.country} onChange={(e) => setG({ ...g, country: e.target.value })}>
                {COUNTRY_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Field>
          </div>
          <Chips name="land" legend="Your current setup" optional options={LANDSCAPES} value={g.landscape} onChange={(v) => setG({ ...g, landscape: v })} />
          <Chips name="time" legend="When do you want to start?" optional options={TIMELINES} value={g.timeline} onChange={(v) => setG({ ...g, timeline: v })} />
          <Field id="note" label="Anything else we should know?" optional>
            <textarea id="note" maxLength={2000} className={`${inputCls} min-h-[88px] resize-y`} value={g.note} onChange={(e) => setG({ ...g, note: e.target.value })} />
          </Field>
          {apiError && <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{apiError}</p>}
          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" disabled={busy} className="btn btn-primary min-h-[48px] w-full text-center sm:w-auto disabled:opacity-60">{busy ? 'Sending…' : 'Send details'}</button>
            <button type="button" onClick={() => go(3)} className="btn btn-secondary min-h-[48px] w-full text-center sm:w-auto">Skip and finish</button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div>
          <h3 className="mb-3 text-[28px] font-extrabold leading-tight tracking-tight text-primary-dark">Thank you, {first}.</h3>
          <p className="text-ink-muted">
            An SAP specialist from our {team.team} will reach out within 1 business day{phone ? ` on ${phone.payload.country_code} ${phone.payload.national_number}` : ` at ${f.email.trim()}`}.
          </p>
          <ul className="my-5 border-t border-line">
            {([['Looking for', label(INTERESTS, f.interest)], ['Company', f.company.trim()], ['Your role', g.role], ['Current setup', label(LANDSCAPES, g.landscape)], ['Start', label(TIMELINES, g.timeline)]] as const)
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <li key={k} className="flex justify-between gap-4 border-b border-line py-2.5 text-sm">
                  <span className="text-ink-muted">{k}</span><strong className="text-right font-medium">{v}</strong>
                </li>
              ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            {LINKS.bookingUrl && <a href={LINKS.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a 30-minute call</a>}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Chat on WhatsApp</a>
          </div>
          {caseLink && (
            <p className="mt-3.5 text-xs text-ink-muted">
              Meanwhile: <Link to={`/p/${caseLink}`} className="text-brand underline">read how a regional manufacturer moved to S/4HANA</Link>.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
