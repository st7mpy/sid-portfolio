interface ExperienceCardProps {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export default function ExperienceCard({
  role,
  company,
  period,
  bullets,
}: ExperienceCardProps) {
  return (
    <div className="mb-8 group">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
        <div>
          <span className="font-bold">{role}</span>
          <span className="text-[#666]">, {company}</span>
        </div>
        <span className="text-xs text-[#999] mt-1 sm:mt-0 shrink-0">
          {period}
        </span>
      </div>
      <ul className="space-y-1.5">
        {bullets.map((bullet, i) => (
          <li key={i} className="text-sm text-[#444] leading-relaxed pl-4">
            <span className="text-[#999] mr-2">-</span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
