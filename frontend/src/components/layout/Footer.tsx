import { FOOTER } from '@/content/site';
import Logo from '@/components/ui/Logo';
import AnchorLink from '@/components/ui/AnchorLink';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary-dark pb-8 pt-16 text-sm text-slate-400">
      <div className="container-x">
        <div className="mb-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
          <div>
            <div className="mb-4">
              <Logo variant="light" />
            </div>
            <p className="mb-5 leading-relaxed text-slate-400">{FOOTER.blurb}</p>
            <p className="text-[13px] text-slate-300">
              ✉{' '}
              <a href={`mailto:${FOOTER.email}`} className="hover:text-white">
                {FOOTER.email}
              </a>
            </p>
          </div>

          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h5 className="mb-[18px] text-[15px] font-bold uppercase tracking-wider text-white">{col.title}</h5>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label} className="mb-2.5">
                    <AnchorLink href={l.href} className="transition-colors hover:text-white">
                      {l.label}
                    </AnchorLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h5 className="mb-[18px] text-[15px] font-bold uppercase tracking-wider text-white">Regional Presence</h5>
            {FOOTER.offices.map((o) => (
              <p key={o.place} className="mb-2 last:mb-0">
                <strong className="font-semibold text-slate-200">{o.place}:</strong> {o.address}
              </p>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-[13px] text-slate-500">{FOOTER.legal}</div>
      </div>
    </footer>
  );
}
