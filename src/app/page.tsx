import { Reveal } from "@/components/Reveal";
import { SpeedInsights } from "@vercel/speed-insights/next";

function GraduationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14l6.16-3.422A12.083 12.083 0 0121 17.75a12.083 12.083 0 01-9 3.75 12.083 12.083 0 01-9-3.75 12.083 12.083 0 012.84-6.172L12 14z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14v7M15 10.5V17"
      />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 9.5L12 4l9 5.5V20H3V9.5z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v-6h6v6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const experiences = [
  {
    period: "2026 — Present",
    title: "Senior Frontend Developer",
    company: "Nutrition Profess",
    location: "Bangkok, Thailand",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    bullets: [
      "Built HR CheckIn Dashboard for monitoring employee attendance and exporting reports.",
      "Developed Admin Dashboard for managing platform data, users, and analytics.",
      "Mentored junior developers and helped improve team workflows.",
    ],
  },
  {
    period: "2023 — 2025",
    title: "Frontend Developer",
    company: "Nutrition Profess",
    location: "Bangkok, Thailand",
    tags: ["React", "JavaScript", "Tailwind CSS", "Figma"],
    bullets: [
      "Built OMS (Order Management System) for tracking orders end-to-end.",
      "Developed Data Management Web for importing, exporting, and managing structured data.",
    ],
  },
];

const education = [
  {
    icon: <GraduationIcon />,
    degree: "Faculty of Information Technology and Multimedia",
    school: "Thai-Nichi Institute of Technology",
    year: "2015 — 2019",
    note: "Second Class Honours",
  },
  {
    icon: <SchoolIcon />,
    degree: "High School",
    school: "Udomsuksa School",
    year: "2012 — 2015",
    note: "Arts-Mathematics Program",
  },
];


const techStack = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Figma",
];

const projects = [
  {
    num: "01",
    name: "HR CheckIn Dashboard",
    desc: "Attendance monitoring system with real-time check-in tracking, absence detection, and Excel report exports for HR managers.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    num: "02",
    name: "Admin Dashboard",
    desc: "Platform control panel for managing users, platform data, and internal analytics — built for daily operations teams.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    num: "03",
    name: "OMS — Order Management System",
    desc: "End-to-end order lifecycle tracker: placement, fulfillment, status updates, and reporting across the sales pipeline.",
    tags: ["React", "JavaScript", "Tailwind CSS"],
  },
  {
    num: "04",
    name: "Data Management Platform",
    desc: "Internal tool for importing, validating, transforming, and exporting large structured datasets via a table-driven UI.",
    tags: ["React", "JavaScript", "Tailwind CSS", "Figma"],
  },
];

export default function Home() {
  return (
    <div className="min-h-full bg-base-100">
      <SpeedInsights />
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-dot-pattern">
        {/* Gradient atmosphere — explicit clip so blur doesn't bleed into adjacent sections */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-175 h-175 bg-primary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-125 h-125 bg-secondary/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="relative z-10 w-full max-w-5xl px-5 py-16 mx-auto sm:px-8 sm:py-20">
          {/* Available badge */}
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full border border-success/30 bg-success/5 select-none cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-success">
              Available for new opportunities
            </span>
          </div>

          {/* Name — display weight */}
          <h1
            className="font-extrabold text-base-content leading-[1.1] tracking-tight text-balance mb-5"
            style={{ fontSize: "clamp(1.875rem, 7vw, 6rem)" }}
          >
            <span className="animate-hero-name delay-200">Passon</span>
            <br className="hidden sm:block" />
            <span className="animate-hero-name" style={{ animationDelay: "280ms" }}>Rattanakongton</span>
          </h1>

          {/* Role */}
          <p className="mb-6 text-xl font-semibold delay-300 animate-fade-up sm:text-3xl text-primary">
            Senior Frontend Developer
          </p>

          {/* Description */}
          <p className="max-w-[65ch] mb-8 text-base leading-relaxed animate-fade-up delay-400 text-base-content/85 sm:text-lg text-pretty">
            I build clean, responsive interfaces and ship them with care. Based
            in Bangkok, currently at Nutrition Profess.
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2 mb-10 cursor-default select-none animate-fade-up delay-500">
            {techStack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-base-200 text-base-content/80 border border-base-300"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10 delay-600 animate-fade-up sm:mb-14">
            <a href="/contact" className="rounded-full btn btn-primary">
              Work with me →
            </a>
            <a
              href="/portfolio"
              className="rounded-full btn btn-outline btn-primary"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured Work ────────────────────────────── */}
      <section id="work" className="py-20 sm:py-28 bg-dot-pattern section-rule">
        <div className="max-w-5xl px-5 mx-auto sm:px-8">
          <Reveal className="mb-10 sm:mb-14" variant="fade">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl text-base-content text-balance">
              Featured Work
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Featured project — first and largest */}
            <Reveal>
              <div className="transition duration-300 border cursor-default select-none group bg-base-100 border-base-300 rounded-2xl p-7 sm:p-8 hover:border-primary/30 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xs text-primary/70" aria-hidden="true">
                    {projects[0].num}
                  </span>
                  <span className="text-xs font-medium text-success bg-success/8 px-2 py-0.5 rounded-full border border-success/20">
                    Most recent
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-bold leading-snug transition-colors duration-300 text-base-content sm:text-3xl group-hover:text-primary text-balance">
                  {projects[0].name}
                </h3>
                <p className="max-w-2xl mb-6 text-base leading-relaxed text-base-content/85 text-pretty">
                  {projects[0].desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projects[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-base-200 text-base-content/80 border border-base-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Supporting projects — 3-col grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {projects.slice(1).map(({ num, name, desc, tags }, i) => (
                <Reveal key={num} delay={i * 80}>
                  <div className="flex flex-col h-full gap-3 p-5 transition duration-300 border cursor-default select-none group bg-base-100 border-base-300 rounded-2xl hover:border-primary/30 hover:shadow-md">
                    <span className="font-mono text-xs text-primary/55" aria-hidden="true">
                      {num}
                    </span>
                    <h3 className="text-base font-semibold leading-snug transition-colors duration-300 text-base-content group-hover:text-primary">
                      {name}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-base-content/85 text-pretty">
                      {desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-xs font-medium bg-base-200 text-base-content/80 border border-base-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────── */}
      <section id="experience" className="py-16 sm:py-24 bg-dot-pattern section-rule">
        <div className="max-w-5xl px-5 mx-auto sm:px-8">
          <Reveal className="mb-10 sm:mb-14" variant="fade">
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl text-base-content text-balance">
              Professional Journey
            </h2>
          </Reveal>

          <Reveal>
            {/* Mobile timeline — left-aligned */}
            <div className="flex flex-col sm:hidden">
              {experiences.map(
                ({ period, title, company, location, bullets, tags }, i) => (
                  <div key={title + "-m"} className="flex gap-4">
                    {/* Left: line + dot */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-content shrink-0 ring-4 ring-primary/10">
                        <CheckIcon />
                      </div>
                      {i < experiences.length - 1 && (
                        <div className="w-0.5 flex-1 bg-primary/20 my-1" />
                      )}
                    </div>
                    {/* Right: card */}
                    <div className="flex-1 pb-8">
                      <div
                        className={`border shadow-sm card ${i === 0 ? "bg-primary/5 border-primary/25" : "bg-base-100 border-base-300"}`}
                      >
                        <div className="gap-2 px-4 py-4 card-body">
                          <span className="text-xs font-bold text-primary">
                            {period}
                          </span>
                          <h3 className="text-sm font-bold leading-snug text-base-content">
                            {title}
                          </h3>
                          <p className="text-xs text-base-content/65">
                            {company} · {location}
                          </p>
                          <div className="divider my-0.5 opacity-30" />
                          <ul className="flex flex-col gap-1.5">
                            {bullets.map((b) => (
                              <li
                                key={b}
                                className="flex gap-2 text-xs text-base-content/85"
                              >
                                <span className="text-primary shrink-0 mt-0.5">
                                  ▸
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                          {tags && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-full text-xs font-medium bg-base-200 text-base-content/80 border border-base-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Desktop timeline */}
            <ul className="hidden cursor-default select-none timeline timeline-vertical sm:block">
              {experiences.map(
                ({ period, title, company, location, bullets, tags }, i) => (
                  <li key={title + "-d"}>
                    {i > 0 && <hr className="bg-primary/20" />}
                    <div className="timeline-start me-6 text-end min-w-[140px]">
                      <span className="block mb-1 text-sm font-bold text-primary">
                        {period}
                      </span>
                      <span className="block text-xs text-base-content/65">
                        {company}
                      </span>
                      <span className="text-xs text-base-content/65">
                        {location}
                      </span>
                    </div>
                    <div className="timeline-middle">
                      <div className="flex items-center justify-center border-4 rounded-full shadow-md w-9 h-9 bg-primary border-base-100 text-primary-content ring-2 ring-primary/20">
                        <CheckIcon />
                      </div>
                    </div>
                    <div className="mb-12 timeline-end ms-6">
                      <div
                        className={`transition duration-300 border card hover:shadow-md ${i === 0 ? "bg-primary/5 border-primary/25 hover:border-primary/45" : "bg-base-100 border-base-300 hover:border-primary/30"}`}
                      >
                        <div className="gap-3 px-5 py-4 card-body">
                          <h3 className="text-base font-bold leading-snug text-base-content">
                            {title}
                          </h3>
                          <ul className="flex flex-col gap-2">
                            {bullets.map((b) => (
                              <li
                                key={b}
                                className="flex gap-2 text-sm text-base-content/85"
                              >
                                <span className="text-primary shrink-0 mt-0.5">
                                  ▸
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                          {tags && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-full text-xs font-medium bg-base-200 text-base-content/80 border border-base-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {i < experiences.length - 1 && (
                      <hr className="bg-primary/20" />
                    )}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Education ────────────────────────────────── */}
      <section
        id="education"
        className="py-14 sm:py-20 bg-base-200/40 bg-dot-pattern section-rule"
      >
        <div className="max-w-5xl px-5 mx-auto sm:px-8">
          <Reveal className="mb-10 sm:mb-14" variant="fade">
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl text-base-content text-balance">
              Education
            </h2>
          </Reveal>

          <div className="flex flex-col gap-4 cursor-default select-none">
            {education.map(({ icon, degree, school, year, note }, i) => (
              <Reveal key={degree} delay={i * 120}>
                <div className="relative overflow-hidden transition duration-300 border group card bg-base-100 border-base-300 hover:border-primary/40 hover:shadow-lg">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="flex-row items-center gap-5 p-5 card-body">
                    <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 rounded-2xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 group-hover:scale-110">
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold leading-snug transition-colors duration-300 text-base-content sm:text-base group-hover:text-primary">
                        {degree}
                      </h3>
                      <p className="text-base-content/70 text-xs sm:text-sm mt-0.5">
                        {school}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs text-base-content/65 bg-base-200 px-2 py-0.5 rounded-full">
                          {year}
                        </span>
                        {note && (
                          <span className="text-xs text-primary bg-primary/8 px-2 py-0.5 rounded-full border border-primary/20">
                            {note}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────── */}
      <section className="py-10 sm:py-14 bg-dot-pattern section-rule">
        <div className="max-w-5xl px-5 mx-auto sm:px-8">
          <Reveal className="mb-6" variant="fade">
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl text-base-content text-balance">
              Toolchain
            </h2>
          </Reveal>
          <div className="flex flex-wrap gap-3 cursor-default select-none">
            {[
              { label: "Next.js" },
              { label: "Tailwind CSS" },
              { label: "Git" },
              { label: "Figma" },
              { label: "Vite" },
            ].map(({ label }, i) => (
              <Reveal key={label} delay={i * 70}>
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-medium border transition duration-200 cursor-default bg-primary/8 text-primary/80 border-primary/20 hover:bg-primary/15"
                >
                  {label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Currently Learning ───────────────────────── */}
      <section className="py-16 sm:py-24 bg-base-200/40 bg-dot-pattern section-rule">
        <div className="max-w-5xl px-5 mx-auto sm:px-8">
          <Reveal className="mb-10 sm:mb-14" variant="fade">
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl text-base-content text-balance">
              Currently Learning
            </h2>
          </Reveal>
          <div className="flex flex-col divide-y cursor-default select-none divide-base-300">
            {[
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                ),
                iconBg: "bg-primary/10 text-primary",
                iconHover: "group-hover:bg-primary/20",
                titleHover: "group-hover:text-primary",
                title: "AI Integration",
                desc: "Exploring LLM APIs and building AI-powered features into web apps.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                ),
                iconBg: "bg-secondary/10 text-secondary",
                iconHover: "group-hover:bg-secondary/20",
                titleHover: "group-hover:text-secondary",
                title: "Web Animations",
                desc: "Diving deeper into GSAP, Framer Motion, and CSS keyframe techniques.",
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                    />
                  </svg>
                ),
                iconBg: "bg-accent/10 text-accent",
                iconHover: "group-hover:bg-accent/20",
                titleHover: "group-hover:text-accent",
                title: "System Design",
                desc: "Learning scalable frontend architecture and design patterns for large apps.",
              },
            ].map(({ icon, iconBg, iconHover, titleHover, title, desc }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="flex gap-5 py-6 group">
                  <div
                    className={`w-11 h-11 rounded-2xl ${iconBg} ${iconHover} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {icon}
                  </div>
                  <div>
                    <h3
                      className={`mb-1 text-base font-bold text-base-content transition-colors duration-300 ${titleHover}`}
                    >
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-base-content/85 text-pretty">
                      {desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-dot-pattern section-rule">
        <div className="max-w-5xl px-5 mx-auto sm:px-8">
          <Reveal>
            <div className="relative p-8 overflow-hidden text-center rounded-3xl bg-gradient-to-br from-primary to-secondary sm:p-14">
              <div className="absolute inset-0 pointer-events-none bg-dot-pattern opacity-10" />
              <div className="relative cursor-default select-none">
                <h2 className="mb-4 text-3xl font-extrabold leading-tight sm:text-5xl text-primary-content text-balance">
                  Let&apos;s build something
                  <br className="hidden sm:block" /> together.
                </h2>
                <p className="max-w-md mx-auto mb-8 text-sm text-primary-content/85 sm:text-base text-pretty">
                  Looking for a frontend developer who cares about quality and
                  detail? Let&apos;s talk.
                </p>
                <a
                  href="/contact"
                  className="font-bold bg-white border-0 rounded-full shadow-lg btn text-primary hover:bg-white/90 btn-sm sm:btn-md"
                >
                  Get in touch →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
