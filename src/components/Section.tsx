interface SectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export default function Section({ title, children, delay = 0 }: SectionProps) {
  return (
    <section className={`fade-up fade-up-delay-${delay}`}>
      <h2 className="text-xs font-bold tracking-[0.2em] uppercase mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}
