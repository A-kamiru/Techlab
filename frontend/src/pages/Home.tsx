import Hero from '@/components/sections/Hero';
import ProofStrip from '@/components/sections/ProofStrip';
import Challenge from '@/components/sections/Challenge';
import Solutions from '@/components/sections/Solutions';
import ServicesGrid from '@/components/sections/ServicesGrid';
import Industries from '@/components/sections/Industries';
import CaseStudies from '@/components/sections/CaseStudies';
import Testimonial from '@/components/sections/Testimonial';
import WhyTechlab from '@/components/sections/WhyTechlab';
import Insights from '@/components/sections/Insights';
import ContactSection from '@/components/sections/ContactSection';
import FAQ from '@/components/sections/FAQ';

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Challenge />
      <Solutions />
      <ServicesGrid />
      <Industries />
      <CaseStudies />
      <Testimonial />
      <WhyTechlab />
      <ContactSection />
      <Insights />
      <FAQ />
    </>
  );
}
