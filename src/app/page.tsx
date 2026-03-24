import Section from "@/components/Section";
import ExperienceCard from "@/components/ExperienceCard";
import SidePanel from "@/components/SidePanel";
import ShootingStars from "@/components/PixelStoic";

const experiences = [
  {
    role: "Research Associate",
    company: "Qiro Finance",
    period: "Jul 2025 - Present",
    bullets: [
      "Owned the full research pipeline; authored technical research reports and managed outreach to bring in new deal flows, most notably Huma Finance.",
      "Scaled research content: 1,000+ Substack subscribers, 15,000+ Twitter followers for DeFi deep dives.",
      "Led qualitative/quantitative analysis for Qiro's mainnet launch; built curated investor funnels to onboard deal flows.",
      "Conducted on-chain analysis and asset onboarding research for tokenized private credit and RWA integrations.",
    ],
  },
  {
    role: "Founders' Office",
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

const publications = [
  {
    title: "Web3 Security Investment Thesis",
    platform: "Medium",
    date: "Sep 2024",
    desc: "Analysis of security challenges and opportunities in the Web3 ecosystem.",
  },
  {
    title: "zkEVM's and Why Does Ethereum Need It?",
    platform: "Medium",
    date: "Apr 2023",
    desc: "Primer on zkEVMs for scalability and security in Ethereum.",
  },
  {
    title: "A Beginner's Overview of the ERC-4437 Token",
    platform: "Medium",
    date: "Mar 2023",
    desc: "Summary of ERC-4437 and EIP process in the Web3 ecosystem.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ShootingStars />
      <SidePanel />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16 sm:py-24">
        {/* Header */}
        <header className="mb-16 fade-up">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 cursor-blink">
            Siddharth Singh
          </h1>
          <p className="text-sm text-[#666] leading-relaxed max-w-lg">
            Operator at the intersection of venture research, decentralized
            finance, and getting a startup from 0&rarr;1.
          </p>
          <p className="text-xs text-[#999] mt-2 italic">
            tldr — &quot;cool research guy&quot;
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 text-xs">
            <a
              href="mailto:siddharth77work@gmail.com"
              className="text-[#666] hover:text-[#111] transition-colors underline underline-offset-4 decoration-[#ddd] hover:decoration-[#111]"
            >
              email
            </a>
            <a
              href="https://twitter.com/s7ddharth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] hover:text-[#111] transition-colors underline underline-offset-4 decoration-[#ddd] hover:decoration-[#111]"
            >
              twitter
            </a>
            <a
              href="https://linkedin.com/in/siddharth-singh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] hover:text-[#111] transition-colors underline underline-offset-4 decoration-[#ddd] hover:decoration-[#111]"
            >
              linkedin
            </a>
            <a
              href="https://substack.com/@s7ddharth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] hover:text-[#111] transition-colors underline underline-offset-4 decoration-[#ddd] hover:decoration-[#111]"
            >
              substack
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
              <span className="text-xs text-[#999] mt-1 sm:mt-0">
                In Progress
              </span>
            </div>
            <p className="text-sm text-[#444] leading-relaxed pl-4">
              <span className="text-[#999] mr-2">-</span>
              Trained LoRA model for contract vulnerability detection, trained
              on Trail of Bits&apos; security data.
            </p>
          </div>
        </Section>

        <hr className="hr-styled" />

        {/* Writing */}
        <Section title="Writing" delay={3}>
          <div className="space-y-6">
            {publications.map((pub, i) => (
              <div key={i}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <span className="font-bold text-sm">{pub.title}</span>
                  <span className="text-xs text-[#999] mt-1 sm:mt-0 shrink-0">
                    {pub.platform} / {pub.date}
                  </span>
                </div>
                <p className="text-sm text-[#444] leading-relaxed">
                  {pub.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <hr className="hr-styled" />

        {/* Skills */}
        <Section title="Tools & Skills" delay={4}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="text-xs font-bold text-[#999] mb-2 tracking-wider">
                LANGUAGES
              </h3>
              <p className="text-[#444]">Python, Solidity</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#999] mb-2 tracking-wider">
                TOOLS
              </h3>
              <p className="text-[#444]">
                Foundry, Dune Analytics, Nansen, Figma, MySQL, MongoDB
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#999] mb-2 tracking-wider">
                DOMAINS
              </h3>
              <p className="text-[#444]">
                Smart Contract Auditing, ML for Trading, Tokenomics
              </p>
            </div>
          </div>
        </Section>

        <hr className="hr-styled" />

        {/* Education */}
        <Section title="Education" delay={5}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
            <div>
              <span className="font-bold">
                B.Tech, Computer Science
              </span>
              <span className="text-[#666]">
                {" "}
                — Blockchain Specialization
              </span>
            </div>
            <span className="text-xs text-[#999] mt-1 sm:mt-0 shrink-0">
              2022 - 2026
            </span>
          </div>
          <p className="text-sm text-[#444] mt-1">
            SRM Institute of Science and Technology, Chennai — GPA: 8.0/10
          </p>
        </Section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#e5e5e5] text-xs text-[#999] flex justify-between">
          <span>&copy; {new Date().getFullYear()} Siddharth Singh</span>
          <span>built with intention</span>
        </footer>
      </div>
    </main>
  );
}
