/**
 * Single source of truth for site-wide copy. Text is carried over verbatim from
 * the source template, except the brand name, which is "Techlab" (no "Systems").
 */

export const BRAND = {
  name: 'Techlab',
  /** Set to '/logo.png' (file placed in /public) once the official logo is supplied. */
  logoSrc: '/logo.png' as string | null,
  /** Intrinsic size of public/logo.png (cropped lockup incl. SAP Partner badge) */
  logoWidth: 361,
  logoHeight: 70,
  partnerPill: 'SAP Partner',
};

export const NAV_LINKS = [
  { label: 'Overview', href: '#challenge' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Results', href: '#case-studies' },
  { label: 'Why Techlab', href: '#why-techlab' },
  { label: 'FAQs', href: '#faqs' },
] as const;

export const WHATSAPP = {
  /** Digits only (E.164 without "+"), as required by wa.me */
  number: '254781052028',
  label: 'WhatsApp Us',
  prefill: 'Hello Techlab, I would like to discuss our SAP priorities',
  get url() {
    return `https://wa.me/${this.number}?text=${encodeURIComponent(this.prefill)}`;
  },
};

export const FOOTER = {
  blurb:
    'Certified SAP Consulting and Implementation Partner empowering enterprises across India, East Africa and West Africa with modern ERP, cloud adoption, and dependable managed services.',
  email: 'info@tlabsys.com',
  columns: [
    {
      title: 'Solutions',
      links: ['SAP S/4HANA', 'RISE with SAP', 'SAP BTP', 'Analytics Cloud', 'SuccessFactors'].map(
        (label) => ({ label, href: '#solutions' }),
      ),
    },
    {
      title: 'Services',
      links: [
        { label: 'Advisory & Roadmap', href: '/services/sap-advisory-consulting/' },
        { label: 'Implementation & Rollout', href: '/services/sap-implementation-rollout/' },
        { label: 'S/4HANA Migration', href: '/services/sap-migration-upgrade' },
        { label: 'SAP Integration', href: '/services/sap-integration' },
        { label: 'Data & Analytics', href: '/services/data-analytics-planning' },
        { label: 'Managed Support (AMS)', href: '/services/sap-support-managed-services/' },
      ],
    },
  ],
  offices: [
    { place: 'Nairobi (Head Office)', address: 'Park Suites, Parklands' },
    { place: 'Uganda', address: 'Ntinda, Kampala' },
    { place: 'Tanzania', address: 'Oysterbay, Dar es Salaam' },
    { place: 'India Delivery', address: 'Hitex Road, Hyderabad' },
    { place: 'Mauritius', address: 'Harbour Front Bldg, Port Louis' },
  ],
  legal:
    '© 2026 Techlab Ltd. All Rights Reserved. SAP, SAP S/4HANA, and other SAP products and services mentioned are trademarks or registered trademarks of SAP SE.',
};
