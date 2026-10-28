import { Reveal } from './Reveal';

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <Reveal className="section-header">
      {eyebrow && (
        <div className="mb-3 inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand border border-blue-100">
          {eyebrow}
        </div>
      )}
      <h2>{title}</h2>
      <p>{description}</p>
    </Reveal>
  );
}
