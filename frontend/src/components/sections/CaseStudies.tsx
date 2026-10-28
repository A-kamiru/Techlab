import { useSite } from '@/content/SiteContext';
import { RevealItem, Stagger } from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import CaseStudyCard from '@/components/ui/CaseStudyCard';

export default function CaseStudies() {
  const CASES = useSite().cases;
  return (
    <section id="case-studies" className="section-padding bg-white">
      <div className="container-x">
        <SectionHeader title={CASES.title} description={CASES.description} />
        <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {CASES.items.map((c) => (
            <RevealItem key={c.slug} className="h-full">
              <CaseStudyCard study={c} cta={CASES.cta} />
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
