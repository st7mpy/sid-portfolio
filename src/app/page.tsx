import Section from "@/components/Section";
import ExperienceCard from "@/components/ExperienceCard";
import SidePanel from "@/components/SidePanel";
import ShootingStars from "@/components/PixelStoic";
import ThemeToggle from "@/components/ThemeToggle";
import EducationCard from "@/components/EducationCard";

const experiences = [
  {
    role: "Research Associate",
    company: "Qiro Finance",
    period: "Jul 2024 - Mar 2025",
    bullets: [
      "Owned the full research pipeline; authored technical research reports and managed outreach to bring in new deal flows, most notably Huma Finance.",
      "Scaled research content: 1,000+ Substack subscribers, 15,000+ Twitter followers for DeFi deep dives.",
      "Led qualitative/quantitative analysis for Qiro\u2019s mainnet launch; built curated investor funnels to onboard deal flows.",
      "Conducted on-chain analysis and asset onboarding research for tokenized private credit and RWA integrations.",
    ],
  },
  {
    role: "Founders\u2019 Office",
    company: "0xBridge",
    period: "Oct 2024 - May 2025",
    bullets: [
      "Led GTM strategy for a Web3 Bitcoin protocol, getting into Techstars Class of Web3 2025.",
      "Led business development and established strategic partnerships with Othentic and Chainsight.",
      "Developed product marketing pipeline and onboarding content for institutions.",
    ],
  },
  {
    role: "Finance Researcher",
    company: "Levitate Labs (VC)",
    period: "Dec 2024 - Feb 2025",
    bullets: [
      "Authored reports on protocols (KelpDAO, EigenLayer, BitsCrunch); influenced VC diligence and deal flow.",
      "Analysed Dune dashboards and performed DePIN, RWA, and restaking protocol analysis.",
      "Contributed to investment memos and market trend forecasting.",
    ],
  },
  {
    role: "Market Research Intern",
    company: "CopperX",
    period: "May 2024 - Jun 2024",
    bullets: [
      "Deployed campaigns boosting MVP user adoption 250%; authored product onboarding guides reducing friction for Web3 launches.",
    ],
  },
];

const education = [
  {
    degree: "B.Tech, Computer Science",
    spec: "Blockchain Specialization",
    institution: "SRM Institute of Science and Technology, Chennai",
    period: "2022 - 2026",
    details: "GPA: 8.0/10",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ShootingStars />
      <ThemeToggle />
      <SidePanel />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 sm:py-24">
        {/* Header */}
        <header className="mb-16 fade-up">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 cursor-blink">
            Siddharth Singh
          </h1>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-lg">
            Operator at the intersection of venture research, decentralized
            finance, and getting a startup from 0&rarr;1.
          </p>
          <p className="text-xs text-[var(--color-muted)] mt-2 italic opacity-60">
            tldr &mdash; &quot;cool research guy&quot;
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 text-xs">
            <a
              href="mailto:siddharth77work@gmail.com"
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)]"
            >
              email
            </a>
            <a
              href="https://twitter.com/s7ddharth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)]"
            >
              twitter
            </a>
            <a
              href="https://www.linkedin.com/in/siddharth-singh-aa9453260/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)]"
            >
              linkedin
            </a>
            <a
              href="https://substack.com/@s1ddharths1ngh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)]"
            >
              substack
            </a>
            <a
              href="https://medium.com/@siddharth77work"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)]"
            >
              medium
            </a>
          </div>
        </header>

        <hr className="hr-styled" />

        {/* Experience */}
        <Section title="Experience" delay={1}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} {...exp} />
          ))}
        </Section>

        <hr className="hr-styled" />

        {/* Project */}
        <Section title="Projects" delay={2}>
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
              <span className="font-bold">
                AI Agent for Smart Contract Auditing
              </span>
              <span className="text-xs text-[var(--color-muted)] mt-1 sm:mt-0">
                In Progress
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-4">
              <span className="text-[var(--color-muted)] mr-2">-</span>
              Trained LoRA model for contract vulnerability detection, trained
              on Trail of Bits&apos; security data.
            </p>
          </div>
        </Section>

        <hr className="hr-styled" />

        {/* Skills */}
        <Section title="Tools & Skills" delay={3}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="text-xs font-bold text-[var(--color-muted)] mb-2 tracking-wider">
                LANGUAGES
              </h3>
              <p className="text-[var(--color-text-secondary)]">Python, Solidity</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[var(--color-muted)] mb-2 tracking-wider">
                TOOLS
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Foundry, Dune Analytics, Nansen, Figma, MySQL, MongoDB
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[var(--color-muted)] mb-2 tracking-wider">
                DOMAINS
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Smart Contract Auditing, ML for Trading, Tokenomics
              </p>
            </div>
          </div>
        </Section>

        <hr className="hr-styled" />

        {/* Education */}
        <Section title="Education" delay={4}>
          {education.map((edu, i) => (
            <EducationCard key={i} {...edu} />
          ))}
        </Section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[var(--color-border)] text-xs text-[var(--color-muted)]">
          <span>&copy; {new Date().getFullYear()} Siddharth Singh</span>
        </footer>
      </div>
    </main>
  );
}
