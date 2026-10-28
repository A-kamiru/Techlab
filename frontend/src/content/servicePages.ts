/**
 * Service page content directly aligned with the official Techlab documentation (docs/).
 * Headings, sections, bullets, and FAQs reflect the documents verbatim.
 */

export interface ServicePageData {
  title: string;
  h1?: string;
  eyebrow?: string;
  summary: string;
  body: string;
  alias?: string;
  url?: string;
  seoTitle?: string;
  metaDescription?: string;
  heroCta?: string;
  closingHeadline?: string;
  closingCta?: string;
  facts?: [string, string][];
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  'service-sap-advisory-and-consulting': {
    title: 'SAP Advisory and Consulting',
    h1: 'Choose the right SAP path before you commit the budget.',
    eyebrow: 'SAP ADVISORY AND CONSULTING',
    summary:
      'Digital transformation moves faster than most IT teams can staff for. Techlab’s SAP advisors turn ambition into a clear, sequenced roadmap across S/4HANA, cloud, data and analytics, one your board can approve and your teams can deliver.',
    alias: 'sap-advisory-consulting',
    url: '/services/sap-advisory-consulting/',
    seoTitle: 'SAP Advisory & Consulting Services | Techlab Systems',
    metaDescription:
      'Build an SAP roadmap you can fund and finish. Techlab advises enterprises in East Africa and India on SAP strategy, architecture and sequencing.',
    heroCta: 'Talk to an SAP expert',
    closingHeadline: 'Not sure where to start? Start with a conversation.',
    closingCta: 'Talk to an SAP expert',
    body: `## Every SAP decision has a long tail.

Which edition? Which move first? Convert what you have or start fresh? Innovation is accelerating and the expertise to judge it is scarce, so many organizations either stall or spend before they have defined what success looks like. The cost arrives later, in stretched landscapes, duplicated tools, and projects that deliver technology but not outcomes.

## Advice that ends in a plan, not a slide deck.

- **Discovery and innovation workshops.** Structured sessions with your business and IT leaders to find the problems worth solving and the SAP capabilities that solve them.
- **S/4HANA roadmap and readiness analysis.** We assess your current landscape, identify target scenarios and architecture, compare migration paths, and define a user-experience roadmap, so adoption is planned rather than improvised.
- **IT strategy and landscape optimization.** Better performance and smarter resource allocation across your system landscape, including where SAP HANA Cloud belongs.
- **SAP Solution Manager governance.** Operations and monitoring, change control, test management and business process management, so every change is documented, audit-ready and tested efficiently.
- **Business process review.** A clear overview of your processes, so issues are resolved quickly and the new system is designed around how you really work.

**Hypercare, not hand-off.** We start in the early phase of a project, guide you through the transition into regular operation, and stay available for optimization and expansion afterwards.

Mid-page CTA: Not sure where your SAP roadmap should start? [Talk to an SAP expert]

## How we work

1. **Listen.** Your business goals, constraints and the decisions already on the table.
2. **Assess.** A frank review of your current SAP landscape, processes and in-house capacity.
3. **Roadmap.** Options with trade-offs, costs and sequence, including phased versus big-bang.
4. **Mobilize.** A plan ready to execute, with us or with your own team.

## Why Techlab

- **Business and IT in one conversation.** Strategy that CFOs and CIOs can both sign.
- **Regional context, global depth.** Local presence in Kenya, Uganda, Tanzania and India, backed by SAP delivery experience across the globe.
- **Honest recommendations.** We recommend what fits your risk appetite and budget, not the biggest project.

## Frequently Asked Questions

**What happens in an SAP discovery workshop?** We bring your business and IT leaders together to map current pain points, test them against SAP capabilities, and agree the priorities worth pursuing. You leave with a shared view of the problem and a shortlist of next steps.

**Do we need to have decided on S/4HANA before engaging an advisor?** No. Many clients come to us precisely to decide. We compare the options, including migration scenarios and deployment models, and show what each means for cost, timing and risk.

**How is advisory different from implementation?** Advisory defines the destination and the route. Implementation builds and delivers it. You can take our roadmap to any delivery partner, though most clients prefer continuity.`,
  },

  'service-sap-implementation-and-rollout': {
    title: 'SAP Implementation and Rollout',
    h1: 'SAP that fits how you run, from the first go-live to every new country.',
    eyebrow: 'SAP IMPLEMENTATION AND ROLLOUT',
    summary:
      'Techlab is a leading SAP implementation partner for private and public sector organizations. We design and deploy SAP S/4HANA, on-premise or in the cloud, then roll it out across your subsidiaries and sites with consistent processes and local compliance.',
    alias: 'sap-implementation-rollout',
    url: '/services/sap-implementation-rollout/',
    seoTitle: 'SAP Implementation & Rollout Services | Techlab Systems',
    metaDescription:
      'Techlab implements SAP S/4HANA and rolls it out across countries and sites in East Africa and India. On-premise or cloud. Talk to an SAP expert.',
    heroCta: 'Talk to an SAP expert',
    closingHeadline: 'Ready to talk about your SAP implementation or rollout?',
    closingCta: 'Talk to an SAP expert',
    body: `## Most SAP projects don't fail on technology. They fail on fit, and on the second country.

A system that mirrors a vendor template rather than your business frustrates users and finance teams alike. Then every new entity adds its own tax rules, data quality and habits, local exceptions multiply, and the global template erodes. A good program starts with how you actually operate, then protects that design as it scales.

## One team, from blueprint to the last site.

### Implementation

- **S/4HANA implementation.** Full deployment of an application-ready environment, with support for development and testing of core business processes and transactions.
- **Deployment your way.** On-premise or cloud edition, with landscape transformation where it makes sense.
- **Finance and logistics redesign.** Simpler, faster processes for financials and logistics, and costing that shows the true picture of your business.
- **Fiori experience.** Modern, role-based user experience deployed with your users in mind.

### Rollout

- **Pre-configured best-practice landscape.** Proven SAP best practices delivered as a ready landscape, so each rollout starts from a standard foundation: speed to value, repeatability, scalability.
- **Crawl, Walk, Run.** A modular approach from proof of concept to large implementations, so you scale at a pace your organization can absorb.
- **Cloud and hybrid.** Certified consultants have implemented mission-critical SAP SuccessFactors core and talent management for customers across the globe. You can move parts of HR operations to the cloud while still leveraging on-premise investments.
- **Data and master data.** Legacy data migration, plus global master data harmonization and consolidation.

Mid-page CTA: Planning an implementation or a multi-country rollout? [Talk to an SAP expert]

## How we work

1. **Discover.** Processes, data, integrations and success measures.
2. **Design.** Fit-to-standard design, tested against how your teams really work.
3. **Build and test.** Configuration, development and rigorous testing of core processes.
4. **Deploy.** Phased or big-bang, chosen for your risk appetite. We have run both.
5. **Roll out and support.** Replicate to new sites with quality checks at regular intervals, then hypercare until your people are confident.

**The six things we manage closely in every rollout:** efficient, globally adopted processes; local regulatory and tax compliance (hard requirements versus nice-to-haves); a risk-controlled rollout strategy; knowledge transfer to local teams before and after launch; legacy data migration; and global master data harmonization.

We use tools we have built to reduce cost, raise the share of work delivered offshore from our India team, and improve productivity, so you get senior local engagement without

## Why Techlab

- **Experienced in both execution models.** Phased and big-bang, with a clear view of which suits you.
- **One global, seamless team.** Quality, consistency and cost effectiveness at home and abroad.
- **We speak both languages.** IT and business, headquarters and each local site.

## Frequently Asked Questions

**How long does an SAP implementation take?** It depends on scope, number of entities and data complexity. After a short assessment we give you a plan with timelines, rather than a guess on a first call.

**Should we choose on-premise or cloud?** Both are valid. We compare them against your regulatory, cost and control requirements and recommend one, with the reasoning.

**What is an SAP rollout?** Taking an SAP solution that already works, at headquarters or a pilot site, and deploying it to more countries, business units or locations, adapted for local requirements.

**How do you handle local tax and regulatory differences?** We separate hard local requirements from preferences, and build only what is necessary on top of the global template, so compliance is met without fragmenting your processes.`,
  },

  'service-sap-migration-and-upgrade': {
    title: 'SAP Migration and Upgrade',
    h1: 'Move to S/4HANA, and stay current on SAP, without stopping the business.',
    eyebrow: 'SAP MIGRATION AND UPGRADE',
    summary:
      'SAP ECC mainstream maintenance ends in December 2027. Techlab migrates and upgrades your SAP landscape step by step, at your pace, with your existing system transacting while we move.',
    alias: 'sap-migration-upgrade',
    url: '/services/sap-migration-upgrade',
    seoTitle: 'SAP S/4HANA Migration & Upgrade Services | Techlab Systems',
    metaDescription:
      'Migrate to SAP S/4HANA or upgrade your SAP system with minimal downtime. Fixed-price assessment. Techlab serves East Africa and India.',
    heroCta: 'Talk to an SAP expert',
    closingHeadline: 'Plan your S/4HANA move before the deadline plans it for you.',
    closingCta: 'Talk to an SAP expert',
    body: `## The deadline is fixed. The path is yours to choose.

SAP has set December 2027 as the end of mainstream maintenance for ECC 6.0, and extended maintenance beyond that costs more. Hesitating is a decision too. But migrations and upgrades are complex: the right route depends on your data, customizations and appetite for change, and the risks are downtime, a rocky transition and damage to a system that works. We help you choose with evidence, then execute with minimal disruption.

## Two tracks, one accountable team.

### Track 1: Migrate to SAP S/4HANA

- **Roadmap services.** Target scenarios and architecture, the migration scenario best suited to yours (convert, build a new landscape, or run SAP HANA alongside your existing core), an SAP HANA adoption plan, and a user-experience roadmap.
- **Pre-migration analysis.** A detailed look at your current scenario to establish what should move and what should not.
- **Migration and adoption.** Project and program management, SAP HANA migration, code remediation, Fiori deployment, and HANA Live adoption.
- **Deployment and integration.** S/4HANA on-premise or cloud edition, landscape transformation, and integration with Ariba, Concur, SuccessFactors, C4C and more.
- **Business continuity.** Your existing system keeps transacting while migration proceeds. Transactions during the move are captured, queued and synced to the new system.

### Track 2: Upgrade and keep current

- **Fixed-price assessment.** An upgrade proposal, indicative costing, project plans and timelines, so you know the shape of the project before you commit.
- **Technical upgrade.** Operating systems, databases and all ABAP, including reports, function module pools, interfaces and other custom objects.
- **Functional upgrade.** A strategic review of your business processes, adopting new ones where the new release delivers real value.
- **System and platform migration.** Moving between environments with testing to minimize business impact, with standard and high-availability options.
- **End-to-end architecture.** A full upgrade and migration service from hardware installation to the application layer.

Mid-page CTA: How ready is your landscape? [Contact Us]

## How we work

1. **Discover.** An S/4HANA discovery workshop and SAP HANA readiness analysis, or an upgrade assessment of your landscape, custom code and interfaces.
2. **Plan.** A migration or upgrade plan covering new functionality, enhancements, architecture, downtime windows and rollback options.
3. **Execute.** Build, test and deploy, studying the old and new environments side by side before the transformation plan is built.
4. **Go live and adopt.** Hypercare and user enablement so the benefits land, with ongoing support if you want it.

## What you gain

- One version of the truth, with consolidated enterprise data and real-time insight.
- Simpler finance and logistics, and fewer moving parts to maintain.
- Real-time prediction, simulation and analytics for faster decisions.
- A platform that is more efficient and lower cost to run, and no worry about support for older versions running out.

## Why Techlab

- **A strong record in integration and migration,** across multiple databases, ERPs and third-party applications.
- **A fixed-price assessment first.** Cost and timeline clarity before commitment.
- **Pace you control.** Phased or big-bang, set by your business calendar.
- **From hardware to application,** and from migration through to support.

## Frequently Asked Questions

**When does SAP ECC support actually end?** SAP’s mainstream maintenance for ECC 6.0 ends in December 2027. Extended maintenance is available to 2030 at additional cost. Planning now leaves room to choose your approach rather than rush it.

**What’s the difference between a migration and an upgrade?** A migration moves you from ECC or a legacy system to S/4HANA. An upgrade keeps an existing SAP system current across releases, databases and platforms. If you’re unsure which you need, our assessment will say so plainly.

**Will our business stop during the project?** Our approach is built to avoid that. The existing system continues to transact and analyze data during migration, and transactions during the move are queued and synchronized.

**What’s the difference between a technical and a functional upgrade?** A technical upgrade moves the system itself: operating system, database and custom code. A functional upgrade reviews your processes so you also gain value from the new version. Most projects need both.`,
  },

  'service-sap-integration': {
    title: 'SAP Integration',
    h1: 'Make SAP and everything around it work as one.',
    eyebrow: 'SAP INTEGRATION',
    summary:
      'Techlab connects SAP with your other SAP solutions, third-party applications, databases and partners, on-premise, in the cloud or hybrid, so data is captured once and flows accurately to wherever it is needed.',
    alias: 'sap-integration',
    url: '/services/sap-integration',
    seoTitle: 'SAP Integration Services | Hybrid & Cloud | Techlab Systems',
    metaDescription:
      'Connect SAP with your other systems, partners and clouds. Techlab delivers SAP integration for S/4HANA, SAP BTP and third-party applications.',
    heroCta: 'Talk to an SAP expert',
    closingHeadline: 'Ready to connect your systems into one business?',
    closingCta: 'Talk to an SAP expert',
    body: `## Disconnected systems cost more than the integration you keep postponing.

When systems don’t talk, people re-key data, reconcile spreadsheets and wait for reports that are already out of date. Every move to S/4HANA or the cloud makes it more pressing, because each existing connection has to be rethought. Older middleware adds to the pressure: SAP Process Orchestration (PI/PO) is also heading toward end of mainstream maintenance in December 2027.

## Integration designed as architecture, not as a patchwork of interfaces.

- **SAP-to-SAP integration.** S/4HANA connected with Ariba, Concur, SuccessFactors, SAP Customer Experience solutions and Commerce, so processes run end to end.
- **SAP-to-third-party integration.** Connections with other ERPs, databases and third-party applications, including partners, banks and regulatory portals.
- **Hybrid cloud integration.** Process and data integration that lets you move to the cloud in stages while still leveraging on-premise investments.
- **SAP Business Technology Platform.** Integration and extensions on SAP BTP, including cloud-ready ABAP development, so your core stays clean while the business keeps changing.
- **Data integration and migration.** Legacy data migration, and master data harmonization and consolidation, so every system works from the same facts.
- **Interface remediation.** Review, modernization and testing of existing interfaces and custom objects during migrations and upgrades.

Mid-page CTA: Not sure which of your connections need attention first? [Contact Us]

## How we work

1. **Map.** Every system, interface, data flow and owner, and what each one costs you today.
2. **Design.** Target integration architecture: what connects, how, and on which platform.
3. **Build and test.** Interfaces, APIs and data flows tested against real business scenarios.
4. **Run and monitor.** Monitoring and change control that keep integrations stable after go-live.

## Why Techlab

- **Integration and migration expertise** that comes from doing both, so connections are designed with the move in mind.
- **Business-process thinking.** We start from the process that has to work, not the interface list.
- **One team for the whole lifecycle,** from integration design to run support.

## Frequently Asked Questions

**Can you integrate SAP with systems that aren’t SAP?** Yes. We connect SAP with other ERPs, databases and third-party applications, using standard SAP technology wherever it fits and custom development only where it doesn’t.

**Do we need SAP Business Technology Platform?** Not always. We recommend it where it reduces custom code and makes change faster, and we say so plainly where simpler connections will do.

**Can integration happen before we move to S/4HANA?** Often, yes. Designing integrations to survive the move saves rework later. We assess your landscape and recommend the order.`,
  },

  'service-data-analytics-and-planning': {
    title: 'Data, Analytics and Planning',
    h1: 'Turn your SAP data into decisions you can act on today.',
    eyebrow: 'DATA, ANALYTICS AND PLANNING',
    summary:
      'Techlab designs the data foundation, analytics and planning that let your leaders see the business in real time, from one trusted source of data, in one user experience.',
    alias: 'data-analytics-planning',
    url: '/services/data-analytics-planning',
    seoTitle: 'SAP Data, Analytics & Planning Services | Techlab Systems',
    metaDescription:
      'Turn SAP data into decisions with SAP Analytics Cloud, SAP HANA Cloud and enterprise planning. Techlab serves East Africa and India.',
    heroCta: 'Talk to an SAP expert',
    closingHeadline: 'Which decision do you want to make faster?',
    closingCta: 'Talk to an SAP expert',
    body: `## Data is everywhere. Decisions still wait for a spreadsheet.

Most enterprises have more data than ever, yet struggle to turn it into outcomes. Data sits in complex landscapes, insight takes too long to reach the people who need it, and intelligent technologies stay on the wish list. Meanwhile markets move faster than the monthly reporting cycle.

## From trusted data to confident decisions.

- **Data foundation with SAP HANA Cloud.** A fully managed, in-memory cloud database that connects data across sources, reduces duplication through virtualization, and gives you one source of business data and truth. Flexible multi-tier storage, including a queryable data lake for cold data, balances cost and performance. Scale up or down quickly with no up-front costs.
- **Analytics with SAP Analytics Cloud.** All your analytics in one user experience: dashboards, reporting and self-service insight for business users.
- **Business intelligence.** Reporting and data warehousing, including SAP BW, that turn transactions into a clear, consistent picture of performance.
- **Enterprise planning.** Budgeting, forecasting and what-if simulation connected to actuals, so plans stay live instead of going stale.
- **Predictive analytics.** Real-time prediction and simulation for agile decision-making, from demand to cash flow.

Mid-page CTA: Which decision would you like to make faster? [Contact Us]

## How we work

1. **Define the decisions.** The questions leaders need answered, and by whom.
2. **Connect the data.** Identify sources, fix quality, and build the foundation.
3. **Build.** Models, dashboards and planning processes, tested with the people who use them.
4. **Adopt.** Training and support so insight becomes a habit, not a launch-day novelty.

## Why Techlab

- **We start from decisions, not dashboards.** Every model has a business question behind it.
- **SAP data expertise.** Experience across S/4HANA, BW and SAP HANA means we know where your data lives and how to trust it.
- **Continuity.** The team that migrates your data can build the analytics on top of it.

## Frequently Asked Questions

**What is SAP Analytics Cloud?** SAP’s cloud platform that brings business intelligence, planning and predictive analytics together in one place, so teams can analyze, plan and forecast from the same data.

**Do we need S/4HANA before we start?** Not always. We review your data sources and design what you can deliver now, and what will benefit from S/4HANA later.

**What does SAP HANA Cloud do?** It is a fully managed, in-memory database-as-a-service. It holds your data in one place, scales on demand, and keeps cold data on lower-cost storage.`,
  },

  'service-sap-support-and-managed-services': {
    title: 'SAP Support and Managed Services',
    h1: 'Keep SAP running at peak performance. Keep your team focused on the business.',
    eyebrow: 'SAP SUPPORT AND MANAGED SERVICES',
    summary:
      'Techlab’s SAP support lets you offload day-to-day operations to seasoned professionals, with 24x7 cover, tailored SLAs and one accountable team, so your in-house people can work on what moves the business forward.',
    alias: 'sap-support-managed-services',
    url: '/services/sap-support-managed-services/',
    seoTitle: 'SAP Support & Managed Services | 24x7 | Techlab Systems',
    metaDescription:
      '24x7 SAP support and application management with tailored SLAs. One experienced team for all your functional and technical needs. Techlab Systems.',
    heroCta: 'Talk to an SAP expert',
    closingHeadline: 'Give your SAP system the team it deserves.',
    closingCta: 'Talk to an SAP expert',
    body: `## Running SAP well takes more people than most teams have.

Skills are scarce and spread across modules, technology and processes. Meanwhile systems must stay available, upgrades carry infrastructure risk, and budgets are tight. The usual result is performance issues, firefighting and strategic work that never gets done.

## One team for every functional and technical need.

- **Application management.** Day-to-day operations, incident and problem resolution, and continuous improvement of your SAP applications.
- **24x7 support.** Around-the-clock cover, with SLAs individually tailored to your requirements.
- **Full-service team.** Operations, Applications, Product Services and Service Management in one team, so you don’t have to find a different specialist for every issue.
- **Monitoring and governance.** SAP Solution Manager-based monitoring, change control and test management for stable, audit-ready operations.
- **Process improvement and knowledge transfer.** We educate your staff and help you improve processes, so you get stronger every year rather than more dependent.
- **Project leadership.** The same core team that supports your system can lead upgrades, rollouts and enhancements.

Mid-page CTA: Is your SAP team stretched? [Contact Us]

## What changes when Techlab supports you

- **Lower operating cost.** Reduce in-house maintenance and support costs and make better use of constrained capital.
- **Better performance.** Fewer incidents and faster fixes.
- **Less risk.** Planned upgrades and changes with infrastructure risk managed.
- **More focus.** Your people concentrate on core business processes and increased functionality.

## How we work

1. **Onboard.** We learn your landscape, processes and priorities, and agree on SLAs.
2. **Transition.** Knowledge capture and a structured handover, with hypercare in the early period.
3. **Run.** Day-to-day support, monitoring and incident management.
4. **Improve.** Regular reviews, optimization and expansion of your solutions.

## Why Techlab

- **Seasoned professionals only.** We hire experienced industry professionals with SAP experience.
- **Business-aware consultants.** Support teams with business experience as well as technical skill.
- **Global processes, local presence.** Consistent standards, with people close to you in East Africa and India.
- **SLAs built around you.** Not a one-size-fits-all contract.

## Frequently Asked Questions

**What does an SAP managed service include?** It typically covers day-to-day operations, incident and problem management, monitoring, change control, and continuous improvement. We tailor the scope and SLAs to your landscape and needs.

**Can you support a system you didn’t implement?** Yes. Our onboarding process captures your landscape and documentation, and a core team takes over with a structured transition.

**Do you offer 24x7 support?** Yes. Support is available around the clock, with SLAs agreed to match your business requirements.`,
  },
};
