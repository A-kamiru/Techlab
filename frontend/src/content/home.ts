/** Step 2 copy: Hero, Proof strip, Challenge, Solutions. Verbatim from the source template. */

/**
 * Hero background: Unsplash photo by Julian Hochgesang (Unsplash License, free for commercial use).
 * Hotlinked for the prototype; download and self-host it in /public/images before launch.
 */
export const HERO = {
  image:
    'https://images.unsplash.com/photo-1589282741585-30ab896335cd?fm=jpg&q=70&w=2400&auto=format&fit=crop&ixlib=rb-4.1.0',
  eyebrow: 'SAP Consulting and Implementation Partner | India · East Africa · West Africa',
  line1: 'SAP Transformation,',
  line2: 'Built Around Your Business',
  subhead:
    'Techlab helps enterprises plan, implement, integrate and run SAP, from S/4HANA transformation and cloud adoption to analytics and ongoing support.',
  primaryCta: { label: 'Talk to an SAP Expert →', href: '#contact' },
  secondaryCta: { label: 'Explore Our Solutions ↓', href: '#solutions' },
};

export const PROOF = [
  { number: '20+ Years', label: 'Of SAP Enterprise Experience' },
  { number: '150+', label: 'Consultants Across Continents' },
  { number: '12,000+', label: 'SAP Users Supported' },
  { number: 'India, East & West Africa', label: 'On-The-Ground Regional Presence' },
];

export const CHALLENGE = {
  title: 'Your Systems Should Move as Fast as Your Business',
  description:
    'Growth exposes the gaps: disconnected applications, ageing processes and data scattered across teams. A well-planned SAP landscape brings your operations together, gives leaders a clear view of the business and creates a foundation that scales. We start with your priorities, then build the roadmap to match.',
  tiles: [
    { num: '01', title: 'Modernize your ERP', text: 'Chart a clear path from legacy systems to SAP S/4HANA.' },
    { num: '02', title: 'Connect your business', text: 'Unite applications, data and processes so teams work from one version of the truth.' },
    { num: '03', title: 'Decide with confidence', text: 'Get reliable reporting, planning and analytics when you need them.' },
    { num: '04', title: 'Keep operations running', text: 'Stay stable and keep improving with expert support and managed services.' },
  ],
  cta: { label: 'Discuss Your Priorities →', href: '#contact' },
};

export const SOLUTIONS = {
  title: 'SAP Solutions for the Way Your Enterprise Operates',
  description:
    'The right SAP solution depends on your operating model, your scale and where you want to grow. Here is where we work.',
  groups: [
    {
      name: 'Core ERP',
      items: [
        { title: 'SAP S/4HANA', text: 'A modern, integrated ERP core for finance, supply chain, manufacturing and more.' },
        { title: 'SAP S/4HANA Cloud', text: 'Cloud ERP for organizations that want faster deployment and continuous innovation.' },
        { title: 'SAP Business ByDesign', text: 'Complete cloud ERP for fast-growing mid-sized businesses and subsidiaries.' },
      ],
    },
    {
      name: 'Platform, Data and Intelligence',
      items: [
        { title: 'SAP Business Technology Platform', text: 'Integrate systems, extend SAP and build custom applications on one platform.' },
        { title: 'SAP Analytics Cloud', text: 'Reporting, planning and analytics in one place, so teams work from the same numbers.' },
        { title: 'SAP Data and AI', text: 'Put your enterprise data to work with analytics, automation and practical AI.' },
      ],
    },
    {
      name: 'Business Functions',
      items: [
        { title: 'SAP Customer Experience', text: 'Connect sales, service and commerce for consistent customer interactions.' },
        { title: 'SAP SuccessFactors', text: 'Manage the employee journey from hiring to performance and development.' },
        { title: 'SAP Ariba', text: 'Digitize procurement and collaborate with suppliers on a single network.' },
      ],
    },
  ],
  cardLink: 'Learn more →',
  cta: { label: 'View All SAP Solutions →', href: '#contact' },
};
