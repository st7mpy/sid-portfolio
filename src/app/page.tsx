import Section from "@/components/Section";
import Collapsible from "@/components/Collapsible";
import ShootingStars from "@/components/PixelStoic";
import AsciiCards from "@/components/AsciiCards";
import Navbar from "@/components/Navbar";

const EMAIL = "siddharth77work@gmail.com";

const links = [
  ["email", `mailto:${EMAIL}`],
  ["twitter", "https://twitter.com/s7ddharth"],
  ["linkedin", "https://www.linkedin.com/in/siddharth-singh-aa9453260/"],
  ["substack", "https://substack.com/@s1ddharths1ngh"],
  ["medium", "https://medium.com/@siddharth77work"],
];

const experiences = [
  {
    role: "Research Intern · currently working",
    company: (
      <>
        <a href="https://iosg.vc" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)] transition-colors">
          IOSG Ventures
        </a>
        {" / "}
        <a href="https://iosf.vc" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)] transition-colors">
          IOSF
        </a>
      </>
    ),
    period: "Aug 2026 - Present",
    bullets: [
      "Helping deploy capital into the technologies shaping the frontier.",
      "Companies backed: TBA",
    ],
  },
  {
    role: "Research Associate",
    company: "Qiro Finance",
    period: "Jul 2025 - Mar 2026",
    bullets: [
      "Owned the research pipeline end to end: technical reports, outreach, and new deal flow.",
      "Grew research distribution to 1,000+ Substack subscribers and 15,000+ Twitter followers.",
      "Led analysis for Qiro’s mainnet launch and asset onboarding for tokenized private credit and RWAs.",
    ],
  },
  {
    role: "Founders’ Office",
    company: "0xBridge",
    period: "Oct 2024 - May 2025",
    bullets: [
      "Led GTM for a Web3 Bitcoin protocol through to Techstars Web3 2025.",
      "Ran business development; closed partnerships with Othentic and Chainsight.",
    ],
  },
  {
    role: "Finance Researcher",
    company: "Levitate Labs (VC)",
    period: "Dec 2024 - Feb 2025",
    bullets: [
      "Wrote protocol reports (KelpDAO, EigenLayer, BitsCrunch) that fed into diligence and deal flow.",
      "Restaking, DePIN and RWA analysis on Dune; contributed to investment memos.",
    ],
  },
  {
    role: "Market Research Intern",
    company: "Kosh Money (formerly CopperX)",
    period: "May 2024 - Jun 2024",
    bullets: [
      "Ran MVP adoption campaigns and wrote onboarding guides for Web3 launches.",
    ],
  },
];

type Project = { name: string; status: string; desc: string; href?: string };

const software: Project[] = [
  { name: "Menso", status: "WIP", desc: "Details soon." },
  {
    name: "AI Agent for Smart Contract Auditing",
    status: "In Progress",
    desc: "LoRA model for contract vulnerability detection, trained on Trail of Bits’ security data.",
  },
  {
    name: "DeFiGrail",
    status: "Live",
    href: "https://defigrail.xyz",
    desc: "Interactive DeFi learning platform: 50+ deep dives, structured tracks, a 70+ term glossary, and playgrounds for AMM math and impermanent loss.",
  },
  {
    name: "Bettr",
    status: "In Progress",
    desc: "AI cold-email engine: researches each lead, drafts outreach with Claude, and manages replies through a quota-aware scheduler.",
  },
];

const hardware: Project[] = [
  {
    name: "Room Climate Optimizer",
    status: "Built",
    desc: "DHT22 temperature and humidity sensor feeding an IR program that drives the AC to hold the room at a target temperature.",
  },
  {
    name: "Micro Drone",
    status: "Building",
    desc: "ESP32-based quadcopter, built from parts up.",
  },
];

const interests = [
  {
    title: "Reading",
    content:
      "Any form of literature puts you in situations you would never otherwise be in. I owe my knowledge base to my love of reading. Currently reading Against Method by Paul Feyerabend.",
  },
  { title: "Learning", content: "Poker theory and cardistry. GPU compute." },
  { title: "Football", content: "FC Barcelona, nothing else." },
  {
    title: "Aviation",
    content: "The aircraft is an engineering marvel. Have been hooked since I was 8.",
  },
  {
    title: "Betting & Markets",
    content: "I love risk, quantifying risk, and then taking the said risk.",
  },
];

const dash = <span className="text-[var(--color-muted)] mr-2">-</span>;

const projectList = (items: Project[]) => (
  <div className="pl-4 pt-2 pb-2">
    {items.map((p) => (
      <div key={p.name} className="mb-4">
        <div className="flex items-baseline gap-2 mb-1">
          {p.href ? (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-foreground)] transition-colors"
            >
              {p.name}
            </a>
          ) : (
            <span className="min-w-0">{p.name}</span>
          )}
          <span className="flex-1 min-w-4 border-b border-dotted border-[var(--color-muted)] opacity-30 -translate-y-1" />
          <span className={`text-xs shrink-0 ${p.status === "Live" ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`}>
            [{p.status}]
          </span>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {dash}
          {p.desc}
        </p>
      </div>
    ))}
  </div>
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ShootingStars />
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(300px,360px)_1fr]">
        {/* Ledger sidebar */}
        <aside className="fade-up px-6 pt-16 pb-10 lg:sticky lg:top-0 lg:h-screen lg:pt-8 lg:pb-8 lg:px-8 lg:border-r border-[var(--color-border)] flex flex-col gap-6 lg:overflow-y-auto">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-3 cursor-blink">
              Siddharth Singh
            </h1>
            <nav className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              {links.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  <span className="text-[var(--color-accent)]">&rarr; </span>
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <figure className="flex flex-col gap-4 lg:mt-4">
            <AsciiCards />
            <figcaption className="text-sm text-[var(--color-muted)] leading-relaxed">
              At the core of all progress is instinct &mdash; something we&apos;re
              all born with and most of us learn to second-guess. As a student of
              the game, I trust mine.
            </figcaption>
          </figure>
        </aside>

        {/* Ledger main */}
        <div className="min-w-0 px-6 pb-16 lg:px-12 lg:pt-16">
          <Section title="Experience" delay={1}>
            {experiences.map((e) => (
              <Collapsible key={e.period} title={e.company} sub={e.role} meta={e.period}>
                <ul className="space-y-1.5 pl-4 pt-1 pb-3">
                  {e.bullets.map((b) => (
                    <li key={b} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {dash}
                      {b}
                    </li>
                  ))}
                </ul>
              </Collapsible>
            ))}
          </Section>

          <Section title="Projects" delay={2}>
            <Collapsible title="Software" meta={`${software.length} projects`}>
              {projectList(software)}
            </Collapsible>
            <Collapsible title="Hardware" meta={`${hardware.length} projects`}>
              {projectList(hardware)}
            </Collapsible>
          </Section>

          <Section title="Beyond Work" delay={3} id="beyond-work">
            <p className="text-sm text-[var(--color-muted)] mb-4 leading-relaxed">
              There&apos;s a lot more to me than making money, have a look.
            </p>
            {interests.map((i) => (
              <Collapsible key={i.title} title={`// ${i.title}`}>
                <p className="text-sm text-[var(--color-text-secondary)] pl-4 pt-1 pb-3 leading-relaxed">
                  {i.content}
                </p>
              </Collapsible>
            ))}
            <div className="mt-8 text-xs text-[var(--color-muted)] italic leading-relaxed">
              <p>&quot;karmanye vadhikaraste ma phaleshu kadachana&quot;</p>
              <p className="mt-1">You have the right to work only, but never to its fruits.</p>
              <p className="mt-2 not-italic opacity-50">&mdash; Bhagavad Gita, Chapter 2, Verse 47</p>
            </div>
          </Section>

          <footer className="pt-8 border-t border-[var(--color-border)] text-xs text-[var(--color-muted)] flex flex-col sm:flex-row sm:justify-between gap-2">
            <span>
              contact &rarr;{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-[var(--color-foreground)] underline underline-offset-4 decoration-[var(--color-border)] hover:decoration-[var(--color-accent)] transition-colors"
              >
                {EMAIL}
              </a>
            </span>
            <span>&copy; {new Date().getFullYear()} Siddharth Singh</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
