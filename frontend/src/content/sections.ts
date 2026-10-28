/** Step 3 copy: Services, Industries, Case studies, FAQs. Verbatim from the source template. */

export const SERVICES = {
  title: 'From SAP Strategy to Ongoing Optimization',
  description: 'Whatever stage you are at, we meet you there and stay with you.',
  items: [
    { title: 'SAP Advisory and Consulting', text: 'Assess your landscape, define your requirements and leave with a practical roadmap tied to business outcomes.', cta: 'Start with a Roadmap →' },
    { title: 'SAP Implementation and Rollout', text: 'Design and deploy SAP around your processes, then roll it out across entities, locations and countries with a team that stays accountable through go-live and beyond.', cta: 'Plan Your Implementation →' },
    { title: 'SAP Migration and Upgrade', text: 'Move to S/4HANA with a structured approach to data transition, testing and cutover that protects business continuity.', cta: 'Discuss Your Migration →' },
    { title: 'SAP Integration', text: 'Connect SAP with the rest of your technology ecosystem so data flows where your business needs it.', cta: 'Connect Your Systems →' },
    { title: 'Data, Analytics and Planning', text: 'Turn business data into dependable reporting, planning and decisions.', cta: 'See Data and Analytics →' },
    { title: 'SAP Support and Managed Services', text: 'Keep your SAP environment stable, secure and continuously improving, with application management you can rely on.', cta: 'Discuss SAP Support →' },
  ],
};

export const INDUSTRIES = {
  title: 'SAP Expertise That Speaks Your Industry',
  description:
    'Every industry runs on different processes and pressures. We begin with how your business actually operates, then match the SAP capabilities that fit.',
  items: [
    { badge: 'Manufacturing', title: 'Manufacturing', text: 'Production planning, plant maintenance and supply chain visibility.' },
    { badge: 'FMCG', title: 'Consumer Products', text: 'Demand planning, inventory and distribution visibility for fast-moving product lines.' },
    { badge: 'Retail', title: 'Retail', text: 'Omnichannel operations, inventory accuracy and store-to-finance integration.' },
    { badge: 'Process', title: 'Chemicals', text: 'Batch traceability, compliance and complex supply chains.' },
    { badge: 'Services', title: 'Professional Services', text: 'Project accounting, resource planning and billing in one connected view.' },
    { badge: 'Technology', title: 'High Tech', text: 'Fast product cycles, global supply chains and order-to-cash across regions.' },
  ],
  cta: { label: 'See Industries We Serve →', href: '#contact' },
};

export interface CaseStudy {
  meta: string;
  challenge: string;
  objective: string;
  whatWeDid: string;
  result: string;
}

export const CASES = {
  title: 'Results Our Customers Can Point To',
  description: 'Real challenges, practical SAP solutions and measurable outcomes.',
  cta: 'Read the Story →',
  items: [
    {
      meta: 'Consumer Products & Cosmetics | East Africa',
      challenge: 'Lack of granular visibility into batch manufacturing costs and inventory variance across retail channels.',
      objective: 'Establish exact cost tracking, eliminate stock outs, and standardize financial reporting across borders.',
      whatWeDid: 'Implemented SAP S/4HANA with specialized Controlling (CO) and Materials Management (MM) workflows.',
      result: '100% Cost Visibility & 24% Reduction in Month-End Closing Time',
    },
    {
      meta: 'Energy & Utilities | Regional',
      challenge: 'Inefficient manual tracking of distribution network field operations and delayed maintenance response.',
      objective: 'Gain real-time operational insights, automate dispatch, and proactively eliminate process bottlenecks.',
      whatWeDid: 'Deployed SAP Plant Maintenance & Mobile Integration for field technicians and dispatch supervisors.',
      result: '35% Faster Maintenance Turnaround & Real-time Field Tracking',
    },
    {
      meta: 'Multi-Entity Manufacturing | India & East Africa',
      challenge: 'Legacy ERP unable to scale with multi-country entity expansion, leading to disconnected regional reporting.',
      objective: 'Consolidate multi-currency financials and automate cross-entity intercompany supply chains.',
      whatWeDid: 'Migrated core operations to SAP S/4HANA Cloud with centralized BTP integrations and compliance.',
      result: 'Single Version of Truth Across 4 Countries & Multi-Entity Consolidation',
    },
  ] as CaseStudy[],
};

export const FAQS = {
  title: 'Common Questions About SAP Projects',
  description: 'Answers to key questions leaders ask before starting an ERP journey.',
  items: [
    {
      q: 'How long does an S/4HANA migration take?',
      a: 'Timeline depends on scope, data volume, and customization level. A standardized cloud deployment can go live in 4 to 6 months, while complex multi-entity enterprise migrations typically take 7 to 12 months with phased rollouts.',
    },
    {
      q: 'Greenfield, brownfield or selective: which is right for us?',
      a: 'Greenfield (fresh implementation) is best if your existing processes need redesign or your legacy ERP is heavily customized. Brownfield (system conversion) preserves historical data and configurations with faster execution. Selective data transition allows choosing specific historical entities and modules to move.',
    },
    {
      q: 'Should we choose S/4HANA Cloud or on-premise?',
      a: 'S/4HANA Cloud (Public or Private Edition) offers lower infrastructure overhead, automatic innovation updates, and scalable subscriptions. On-premise or sovereign private cloud is preferred by organizations with strict local regulatory data residency constraints or heavily customized bespoke architectures.',
    },
    {
      q: 'What does SAP managed support include?',
      a: 'Our Application Management Services (AMS) cover 24/7 incident resolution, bug fixing, periodic security patching, system performance tuning, user administration, and ongoing process optimization tied to strict SLAs.',
    },
    {
      q: 'How do you manage data migration risk?',
      a: 'We use a rigorous phased data methodology: automated profiling, cleansing, pre-validation mock cutovers, and reconciliation testing before go-live, ensuring zero loss of financial or operational integrity.',
    },
    {
      q: 'Can you roll out SAP across multiple countries or entities?',
      a: 'Yes. Techlab specializes in multi-country rollouts across India and East Africa (Kenya, Uganda, Tanzania, Rwanda). We design a unified global core template and localize for local tax, currency, and regulatory statutory requirements.',
    },
  ],
};

export const CONTACT = {
  title: "Let's Talk About Your SAP Priorities",
  text: 'Planning an ERP transformation, weighing a migration, improving analytics or looking for dependable SAP support? Tell us what you want to achieve, and our experts will help you work out the right next step.',
  primaryCta: 'Talk to an SAP Expert →',
  whatsappCta: 'WhatsApp Us',
  formTitle: "Tell us where you are with SAP. We'll tell you the fastest way forward.",
  formLede: 'Four quick questions, and an SAP specialist who works in your region takes it from there.',
  nextTitle: 'What happens next',
  next: [
    { title: 'An SAP expert contacts you within 1 business day.', text: 'By email, call or WhatsApp, whichever you prefer.' },
    { title: 'A 30-minute discovery call.', text: 'We listen first. No slides, no sales pitch.' },
    { title: 'A tailored roadmap or proposal.', text: 'Scope, timeline and budget range for your situation.' },
  ],
  altTitle: 'Prefer not to fill in a form?',
  hours: 'Mon to Fri, 8:00 to 18:00 East Africa Time',
};

export const TESTIMONIAL = {
  title: 'What Our Customers Have to Say About Us',
  description: 'Proven partnership delivering long-term value beyond go-live.',
  quote:
    '"Techlab provided the exact technical depth and on-the-ground support we needed for our S/4HANA transition. With their implementation of the CO module, our leadership team finally sees the true picture of our manufacturing costs across East Africa."',
  author: 'Chief Financial Officer',
  role: 'Leading East African Consumer Products & Cosmetics Group',
  /** Paste a video link (YouTube, Vimeo, MP4) to show the "Watch Client Story" tile. Empty hides it. */
  videoUrl: '',
  videoLabel: 'Watch Client Story',
  videoLength: '18 Seconds Video',
};

export const WHY = {
  title: 'Why Enterprises Choose Techlab',
  description:
    'Techlab combines industry expertise, technical proficiency and responsive customer support to deliver SAP solutions your teams adopt and benefit from. We build long-term relationships with clients across India and East Africa, so the value continues well beyond the initial implementation.',
  tiles: [
    { title: 'Local presence, global standards', text: "Teams on the ground in India and East Africa, delivering to SAP's global best practices." },
    { title: 'Business first, technology second', text: 'We start with your processes and priorities, so every technology decision links to an operational outcome.' },
    { title: 'One partner, end to end', text: 'Consulting, implementation, migration, integration and ongoing support under one roof, backed by 20+ years of experience and 100+ SAP professionals.' },
    { title: 'Industry expertise, technical depth', text: "Consultants who understand your industry's processes and the SAP technology behind them, backed by dedicated customer support, so solutions are delivered well and adopted by your teams." },
    { title: 'Long-term relationships, continuous value', text: 'User adoption, support and continuous improvement keep your investment delivering long after go-live, as your business evolves.' },
    { title: "Investing in what's next", text: 'We keep investing in new SAP capabilities and skills, so the roadmap we build with you stays ahead of industry trends.' },
  ],
  awards: [
    { src: '/images/award-1.jpg', alt: 'SAP Partner Recognition 1' },
    { src: '/images/award-2.jpg', alt: 'SAP Partner Recognition 2' },
  ],
  cta: { label: 'Get to Know Techlab →', href: '#contact' },
};

export const INSIGHTS = {
  title: 'Perspectives from Our SAP Experts',
  description: 'Practical insights on ERP modernization, regional compliance and cloud architecture.',
  cta: 'Read Article →',
  items: [
    { meta: 'Tax & Compliance · East Africa', title: 'Integrating SAP ERP with KRA eTIMS in Kenya: Architecture and Compliance', text: 'A technical guide to real-time invoice transmission, middleware options and avoiding business disruptions.' },
    { meta: 'Cloud ERP · Strategy', title: 'RISE with SAP vs. S/4HANA Cloud: Migration Roadmap for Regional Enterprises', text: 'Key considerations for CIOs weighing cloud flexibility, total cost of ownership, and custom extension maintenance.' },
    { meta: 'Development · Clean Core', title: 'ABAP Cloud & Clean Core: Modernizing Extensions for Seamless SAP Updates', text: 'How forward-looking teams build custom enterprise applications without breaking standard upgrades.' },
  ],
};
