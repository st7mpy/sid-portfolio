interface SectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
  id?: string;
}

export default function Section({ title, children, delay = 0, id }: SectionProps) {
  return (
    <section id={id} className={`fade-up fade-up-delay-${delay} mb-14 scroll-mt-20`}>
      <h2 className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase mb-6">
        {title}
        <span className="flex-1 h-px bg-[var(--color-border)]" />
      </h2>
      {children}
    </section>
  );
}
