import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';

interface ServiceDetail {
  num: string;
  meta: string;
  badge: string;
  title: string;
  headline: string;
  subhead: string;
  deliverables: { title: string; text: string }[];
  techTags: string[];
  url: string;
  cta: string;
}

const SHOWCASE_SERVICES: ServiceDetail[] = [
  {
    num: '01',
    meta: 'Phase 01 · Strategize',
    badge: 'Phase 01 · Strategic Advisory',
    title: 'SAP Advisory and Consulting',
    headline: 'Choose the right SAP path before you commit the budget.',
    subhead:
      'Digital transformation moves faster than most IT teams can staff for. Techlab’s SAP advisors turn ambition into a clear, sequenced roadmap across S/4HANA, cloud, data and analytics, one your board can approve and your teams can deliver.',
    deliverables: [
      { title: 'Discovery Workshops', text: 'Structured sessions with business and IT to prioritize pain points and outcomes.' },
      { title: 'S/4HANA Readiness', text: 'Evaluate technical constraints, code remediation and adoption paths.' },
      { title: 'Landscape Optimization', text: 'Smarter resource allocation and cloud deployment strategy.' },
      { title: 'Solution Manager Governance', text: 'Audit-ready documentation, change control, and hypercare transitions.' },
    ],
    techTags: ['S/4HANA Roadmap', 'Solution Manager', 'Clean Core Strategy'],
    url: '/services/sap-advisory-consulting/',
    cta: 'Start with a Roadmap →',
  },
  {
    num: '02',
    meta: 'Phase 02 · Deploy',
    badge: 'Phase 02 · Deployment & Scaling',
    title: 'SAP Implementation and Rollout',
    headline: 'SAP that fits how you run, from the first go-live to every new country.',
    subhead:
      'Techlab designs and deploys SAP S/4HANA, on-premise or in the cloud, then rolls it out across your subsidiaries and sites with consistent processes, finance redesign, and local compliance.',
    deliverables: [
      { title: 'S/4HANA Implementation', text: 'Application-ready deployment with custom testing for core processes.' },
      { title: 'Multi-Country Rollouts', text: 'Standardized enterprise templates balanced with local tax and regulatory rules.' },
      { title: 'Finance & Logistics Redesign', text: 'Streamlined transactions with transparent, granular business costing.' },
      { title: 'Fiori User Experience', text: 'Intuitive role-based apps for fast end-user adoption and minimal friction.' },
    ],
    techTags: ['SAP S/4HANA Cloud', 'SAP Fiori', 'Multi-Entity Rollouts'],
    url: '/services/sap-implementation-rollout/',
    cta: 'Plan Your Implementation →',
  },
  {
    num: '03',
    meta: 'Phase 03 · Modernize',
    badge: 'Phase 03 · Transition & Modernization',
    title: 'SAP Migration and Upgrade',
    headline: 'Move to S/4HANA, and stay current on SAP, without stopping the business.',
    subhead:
      'SAP ECC mainstream maintenance ends in December 2027. Techlab migrates and upgrades your SAP landscape step by step, at your pace, with your existing system transacting while we move.',
    deliverables: [
      { title: 'Zero-Downtime Migration', text: 'Existing systems transact normally while move transactions are queued and synced.' },
      { title: 'Fixed-Price Assessment', text: 'Clear indicative costing, timelines, and cutover plan before you commit.' },
      { title: 'Technical & Functional Upgrades', text: 'Full OS/DB, ABAP remediation, and business process modernizations.' },
      { title: 'Rollback & Testing Safeguards', text: 'Pre-tested rollback options and parallel system validations.' },
    ],
    techTags: ['ECC to S/4HANA', 'Code Remediation', 'Zero-Downtime Cutover'],
    url: '/services/sap-migration-upgrade/',
    cta: 'Discuss Your Migration →',
  },
  {
    num: '04',
    meta: 'Phase 04 · Connect',
    badge: 'Phase 04 · Ecosystem Connectivity',
    title: 'SAP Integration',
    headline: 'Make SAP and everything around it work as one.',
    subhead:
      'Techlab connects SAP with your other SAP solutions, third-party applications, databases and partners, on-premise, in the cloud or hybrid, so data is captured once and flows accurately wherever needed.',
    deliverables: [
      { title: 'SAP-to-SAP Integration', text: 'Seamless flows with Ariba, Concur, SuccessFactors, Commerce and CX.' },
      { title: 'Third-Party & Banking Connectors', text: 'Integrations with banks, tax portals, custom apps, and third-party ERPs.' },
      { title: 'SAP BTP Architecture', text: 'Cloud-ready extensions and clean core strategies to keep SAP stable.' },
      { title: 'Data Harmonization', text: 'Master data consolidation and legacy PI/PO modernization before 2027.' },
    ],
    techTags: ['SAP BTP', 'PI/PO Modernization', 'Real-Time Banking APIs'],
    url: '/services/sap-integration/',
    cta: 'Connect Your Systems →',
  },
  {
    num: '05',
    meta: 'Phase 05 · Predict',
    badge: 'Phase 05 · Intelligence & Forecasting',
    title: 'Data, Analytics and Planning',
    headline: 'Turn your SAP data into decisions you can act on today.',
    subhead:
      'Techlab designs the data foundation, analytics and planning that let your leaders see the business in real time, from one trusted source of data, in one user experience.',
    deliverables: [
      { title: 'SAP HANA Cloud Foundation', text: 'In-memory database virtualization reducing duplication with cold storage tiers.' },
      { title: 'SAP Analytics Cloud (SAC)', text: 'Unified executive dashboards, ad-hoc drilldowns and self-service analytics.' },
      { title: 'Enterprise Planning & Simulation', text: 'Budgeting, what-if scenarios, and live forecasting connected to actuals.' },
      { title: 'Predictive Analytics', text: 'Machine-learning forecasts for agile decision-making across cash flow & demand.' },
    ],
    techTags: ['SAP Analytics Cloud', 'SAP HANA Cloud', 'SAP BW/4HANA'],
    url: '/services/data-analytics-planning/',
    cta: 'See Data and Analytics →',
  },
  {
    num: '06',
    meta: 'Phase 06 · Sustain',
    badge: 'Phase 06 · Operations & AMS',
    title: 'SAP Support and Managed Services',
    headline: 'Keep SAP running at peak performance. Keep your team focused on the business.',
    subhead:
      'Techlab’s SAP support lets you offload day-to-day operations to seasoned professionals, with 24x7 cover, tailored SLAs and one accountable team, so your in-house people can work on what moves the business forward.',
    deliverables: [
      { title: '24x7 AMS & Incident Resolution', text: 'Round-the-clock technical & functional incident resolution tied to strict SLAs.' },
      { title: 'Proactive System Health Checks', text: 'Periodic performance tuning, kernel patching, and preventive maintenance.' },
      { title: 'Change Management & Enhancements', text: 'Dedicated developer capacity for workflow tweaks and report updates.' },
      { title: 'Predictable Monthly Cost', text: 'Transparent tiered pricing with no unexpected bill shock or hidden module fees.' },
    ],
    techTags: ['24x7 AMS', 'Tailored SLAs', 'Solution Manager Governance'],
    url: '/services/sap-support-managed-services/',
    cta: 'Discuss SAP Support →',
  },
];

export default function ServicesGrid() {
  const [activeTab, setActiveTab] = useState(0);
  const current = SHOWCASE_SERVICES[activeTab];

  return (
    <section id="services" className="section-padding bg-slate-50/60">
      <div className="container-x">
        <SectionHeader
          eyebrow="ENTERPRISE SAP LIFECYCLE"
          title="From SAP Strategy to Ongoing Optimization"
          description="Whatever stage you are at, we meet you there and stay with you."
        />

        {/* Concept 1: Interactive Master-Detail Showcase */}
        <Reveal className="mt-8 sm:mt-12">
          <div className="grid items-start gap-5 sm:gap-8 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr]">
            {/* Master Selector List (Horizontal scroll on mobile, Left Column on desktop) */}
            <div
              className="flex flex-row overflow-x-auto no-scrollbar gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible lg:gap-2.5 lg:pb-0"
              role="tablist"
              aria-label="SAP Services"
            >
              {SHOWCASE_SERVICES.map((s, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={s.num}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(idx)}
                    className={`group relative flex shrink-0 items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all duration-200 sm:p-3 lg:w-full lg:gap-4 lg:p-4 ${
                      isActive
                        ? 'border-brand bg-white shadow-md ring-1 ring-brand/30'
                        : 'border-slate-200/80 bg-white/70 hover:border-slate-300 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    {/* Number Indicator */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors lg:h-10 lg:w-10 lg:text-sm ${
                        isActive
                          ? 'bg-brand text-white shadow-sm'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-primary-dark'
                      }`}
                    >
                      {s.num}
                    </div>

                    {/* Meta & Title */}
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-brand sm:text-xs">
                        {s.meta}
                      </div>
                      <div className="whitespace-nowrap text-xs font-bold text-primary-dark sm:text-sm lg:truncate lg:text-[15px]">
                        {s.title}
                      </div>
                    </div>

                    {/* Arrow indicator (hidden on mobile tabs, visible on desktop) */}
                    <div
                      className={`hidden text-base font-bold transition-transform duration-200 lg:block ${
                        isActive
                          ? 'translate-x-0.5 text-brand'
                          : 'text-slate-300 group-hover:translate-x-0.5 group-hover:text-slate-500'
                      }`}
                    >
                      →
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Service Canvas (Right Column) */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg sm:p-7 lg:p-9">
              <div>
                {/* Header Badge & Title */}
                <div className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand border border-blue-100 sm:px-3.5">
                  {current.badge}
                </div>
                <h3 className="mb-3 text-xl font-extrabold leading-snug tracking-tight text-primary-dark sm:text-2xl lg:text-[28px]">
                  {current.headline}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-slate-600 sm:mb-8 sm:text-base">
                  {current.subhead}
                </p>

                {/* 4 Deliverables in a 2x2 grid */}
                <div className="mb-6 grid gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-5">
                  {current.deliverables.map((d) => (
                    <div
                      key={d.title}
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 sm:p-4 transition-colors hover:border-slate-200 hover:bg-slate-50"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-primary-dark sm:text-[14.5px]">{d.title}</h4>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-500 sm:text-[13px]">{d.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Panel Footer: Tech tags and Action CTA */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5 sm:pt-6">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {current.techTags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-slate-200 bg-slate-100/80 px-2 py-0.5 text-[11px] font-medium text-slate-700 sm:px-2.5 sm:py-1 sm:text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={current.url}
                  className="btn btn-primary inline-flex w-full items-center justify-center gap-1.5 shadow-sm sm:w-auto"
                >
                  <span>{current.cta}</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
