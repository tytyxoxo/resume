import { Reveal } from "@/components/Reveal";

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
      className="h-4 w-4"
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
    bullets: [
      "Redesigned the main dashboard for both web and mobile.",
      "Built a shared component library used by 50+ developers and designers.",
      "Mentored junior developers and helped improve team workflows.",
    ],
  },
  {
    period: "2023 — 2025",
    title: "Frontend Developer",
    company: "Nutrition Profess",
    location: "Bangkok, Thailand",
    bullets: [
      "Built the UI for three consumer apps.",
      "Worked directly with clients and created prototypes for early-stage startups.",
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

const expertise = [
  {
    icon: "⬡",
    title: "JavaScript",
    desc: "Building interactive, performant web apps with modern ES6+ patterns and async programming.",
    tags: ["ES6+", "Node.js"],
    color: "yellow",
    iconBg: "bg-yellow-400/10",
    iconText: "text-yellow-500",
    iconHover: "group-hover:bg-yellow-400/20",
    border: "hover:border-yellow-400/40",
    glow: "from-yellow-400 to-yellow-500",
    tagColor: "group-hover:border-yellow-400/40 group-hover:text-yellow-600/70",
  },
  {
    icon: "◈",
    title: "TypeScript",
    desc: "Writing type-safe, maintainable code with strong typing and better developer tooling.",
    tags: ["Type Safety", "Scalability"],
    color: "blue",
    iconBg: "bg-blue-400/10",
    iconText: "text-blue-500",
    iconHover: "group-hover:bg-blue-400/20",
    border: "hover:border-blue-400/40",
    glow: "from-blue-400 to-blue-500",
    tagColor: "group-hover:border-blue-400/40 group-hover:text-blue-500/70",
  },
  {
    icon: "✦",
    title: "UI Development",
    desc: "Crafting clean, responsive interfaces with attention to detail, accessibility, and user experience.",
    tags: ["React", "Tailwind CSS"],
    color: "cyan",
    iconBg: "bg-cyan-400/10",
    iconText: "text-cyan-500",
    iconHover: "group-hover:bg-cyan-400/20",
    border: "hover:border-cyan-400/40",
    glow: "from-cyan-400 to-cyan-500",
    tagColor: "group-hover:border-cyan-400/40 group-hover:text-cyan-500/70",
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

export default function Home() {
  return (
    <div className="bg-base-100 min-h-full">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center bg-dot-pattern relative overflow-hidden">
        {/* gradient blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-up delay-100 inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-success/30 bg-success/5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-success text-xs font-semibold tracking-wide">
                Available for new opportunities
              </span>
            </div>

            <h1 className="animate-fade-up delay-200 text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content mb-3 leading-tight">
              Passon
              <br className="hidden sm:block" /> Rattanakongton
            </h1>
            <h2 className="animate-fade-up delay-300 text-xl sm:text-2xl font-semibold text-primary mb-5">
              Frontend Developer
            </h2>
            <p className="animate-fade-up delay-400 text-base-content/60 text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
              I build clean, responsive web experiences with modern tools.
              Passionate about great UI and developer experience.
            </p>

            {/* Tech stack pills */}
            <div className="animate-fade-up delay-400 flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-base-200 text-base-content/60 border border-base-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="animate-fade-up delay-500 flex flex-wrap gap-3 justify-center lg:justify-start">
              <a
                href="/contact"
                className="btn btn-primary btn-sm sm:btn-md rounded-full"
              >
                Work with me →
              </a>
              <a
                href="/portfolio"
                className="btn btn-outline btn-primary btn-sm sm:btn-md rounded-full"
              >
                View Portfolio
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="animate-fade-up delay-300 hidden sm:flex flex-col items-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl opacity-70 animate-pulse" />
              <div className="animate-float relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-base-300/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-base-200/50 to-secondary/20 flex items-center justify-center">
                  <span className="text-8xl font-black text-base-content/5 select-none">
                    P
                  </span>
                </div>
                {/* decorative corner accents */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-secondary/40 rounded-br-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Expertise ───────────────────────────── */}
      <section className="bg-base-200/50 py-16 sm:py-24 bg-dot-pattern">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-10 sm:mb-14">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              What I do
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
                Core Expertise
              </h2>
              <div className="flex gap-2 flex-wrap">
                {[
                  {
                    label: "JavaScript",
                    color:
                      "bg-yellow-400/10 text-yellow-600 border-yellow-400/30",
                  },
                  {
                    label: "TypeScript",
                    color: "bg-blue-400/10 text-blue-500 border-blue-400/30",
                  },
                  {
                    label: "React",
                    color: "bg-cyan-400/10 text-cyan-500 border-cyan-400/30",
                  },
                ].map(({ label, color }) => (
                  <span
                    key={label}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${color}`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {expertise.map(
              (
                {
                  icon,
                  title,
                  desc,
                  tags,
                  iconBg,
                  iconText,
                  iconHover,
                  border,
                  glow,
                  tagColor,
                },
                i,
              ) => (
                <Reveal key={title} delay={i * 120}>
                  <div
                    className={`group relative card bg-base-100 border border-base-300 ${border} hover:shadow-xl transition-all duration-300 h-full overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-base-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div
                      className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${glow} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    />
                    <div className="card-body gap-4 p-5 relative">
                      <div
                        className={`w-11 h-11 rounded-2xl ${iconBg} ${iconHover} flex items-center justify-center text-xl ${iconText} group-hover:scale-110 transition-all duration-300`}
                      >
                        {icon}
                      </div>
                      <div>
                        <h3
                          className={`font-bold text-base-content text-base mb-1 transition-colors duration-300 ${iconText.replace("text-", "group-hover:text-")}`}
                        >
                          {title}
                        </h3>
                        <p className="text-base-content/50 text-sm leading-relaxed">
                          {desc}
                        </p>
                      </div>
                      <div className="flex gap-1.5 flex-wrap mt-auto pt-1">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded-full text-xs border border-base-300 text-base-content/40 ${tagColor} transition-colors duration-300`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── Experience ───────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-dot-pattern">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-10 sm:mb-14">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Career
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
              Professional Journey
            </h2>
          </Reveal>

          <Reveal>
            {/* Mobile timeline — left-aligned */}
            <div className="sm:hidden flex flex-col">
              {experiences.map(
                ({ period, title, company, location, bullets }, i) => (
                  <div key={title + "-m"} className="flex gap-4">
                    {/* Left: line + dot */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content shrink-0 ring-4 ring-primary/10">
                        <CheckIcon />
                      </div>
                      {i < experiences.length - 1 && (
                        <div className="w-0.5 flex-1 bg-primary/20 my-1" />
                      )}
                    </div>
                    {/* Right: card */}
                    <div className="flex-1 pb-8">
                      <div className="card bg-base-100 border border-base-300 shadow-sm">
                        <div className="card-body gap-2 py-4 px-4">
                          <span className="text-primary text-xs font-bold">
                            {period}
                          </span>
                          <h3 className="font-bold text-base-content text-sm leading-snug">
                            {title}
                          </h3>
                          <p className="text-base-content/40 text-xs">
                            {company} · {location}
                          </p>
                          <div className="divider my-0.5 opacity-30" />
                          <ul className="flex flex-col gap-1.5">
                            {bullets.map((b, j) => (
                              <li
                                key={j}
                                className="flex gap-2 text-xs text-base-content/60"
                              >
                                <span className="text-primary shrink-0 mt-0.5">
                                  ▸
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Desktop timeline */}
            <ul className="timeline timeline-vertical hidden sm:block">
              {experiences.map(
                ({ period, title, company, location, bullets }, i) => (
                  <li key={title + "-d"}>
                    {i > 0 && <hr className="bg-primary/20" />}
                    <div className="timeline-start me-6 text-end min-w-[140px]">
                      <span className="text-primary text-sm font-bold block mb-1">
                        {period}
                      </span>
                      <span className="text-base-content/50 text-xs block">
                        {company}
                      </span>
                      <span className="text-base-content/30 text-xs">
                        {location}
                      </span>
                    </div>
                    <div className="timeline-middle">
                      <div className="w-9 h-9 rounded-full bg-primary border-4 border-base-100 shadow-md flex items-center justify-center text-primary-content ring-2 ring-primary/20">
                        <CheckIcon />
                      </div>
                    </div>
                    <div className="timeline-end ms-6 mb-12">
                      <div className="card bg-base-100 border border-base-300 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                        <div className="card-body gap-3 py-4 px-5">
                          <h3 className="font-bold text-base-content">
                            {title}
                          </h3>
                          <ul className="flex flex-col gap-2">
                            {bullets.map((b, j) => (
                              <li
                                key={j}
                                className="flex gap-2 text-sm text-base-content/60"
                              >
                                <span className="text-primary shrink-0 mt-0.5">
                                  ▸
                                </span>
                                {b}
                              </li>
                            ))}
                          </ul>
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
      <section className="bg-base-200/50 py-16 sm:py-24 bg-dot-pattern">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-10 sm:mb-14">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Background
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
              Education
            </h2>
          </Reveal>

          <div className="flex flex-col gap-4">
            {education.map(({ icon, degree, school, year, note }, i) => (
              <Reveal key={degree} delay={i * 120}>
                <div className="group relative card bg-base-100 border border-base-300 hover:border-primary/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="card-body flex-row gap-5 p-5 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base-content text-sm sm:text-base leading-snug group-hover:text-primary transition-colors duration-300">
                        {degree}
                      </h3>
                      <p className="text-base-content/55 text-xs sm:text-sm mt-0.5">
                        {school}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs text-base-content/40 bg-base-200 px-2 py-0.5 rounded-full">
                          {year}
                        </span>
                        {note && (
                          <span className="text-xs text-primary/60 bg-primary/8 px-2 py-0.5 rounded-full border border-primary/15">
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
      <section className="py-16 sm:py-24 bg-dot-pattern">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-10 sm:mb-14">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Tools & Tech
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
              Skills
            </h2>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  label: "JavaScript",
                  color:
                    "bg-yellow-400/10 text-yellow-600 border-yellow-400/30 hover:bg-yellow-400/20",
                },
                {
                  label: "TypeScript",
                  color:
                    "bg-blue-400/10 text-blue-500 border-blue-400/30 hover:bg-blue-400/20",
                },
                {
                  label: "React",
                  color:
                    "bg-cyan-400/10 text-cyan-500 border-cyan-400/30 hover:bg-cyan-400/20",
                },
                {
                  label: "Next.js",
                  color:
                    "bg-base-content/5 text-base-content/70 border-base-300 hover:bg-base-content/10",
                },
                {
                  label: "Tailwind CSS",
                  color:
                    "bg-teal-400/10 text-teal-500 border-teal-400/30 hover:bg-teal-400/20",
                },
                {
                  label: "Node.js",
                  color:
                    "bg-green-400/10 text-green-600 border-green-400/30 hover:bg-green-400/20",
                },
                {
                  label: "Git",
                  color:
                    "bg-orange-400/10 text-orange-500 border-orange-400/30 hover:bg-orange-400/20",
                },
                {
                  label: "Figma",
                  color:
                    "bg-purple-400/10 text-purple-500 border-purple-400/30 hover:bg-purple-400/20",
                },
                {
                  label: "REST API",
                  color:
                    "bg-base-content/5 text-base-content/70 border-base-300 hover:bg-base-content/10",
                },
                {
                  label: "PostgreSQL",
                  color:
                    "bg-indigo-400/10 text-indigo-500 border-indigo-400/30 hover:bg-indigo-400/20",
                },
                {
                  label: "Docker",
                  color:
                    "bg-sky-400/10 text-sky-500 border-sky-400/30 hover:bg-sky-400/20",
                },
                {
                  label: "Vite",
                  color:
                    "bg-violet-400/10 text-violet-500 border-violet-400/30 hover:bg-violet-400/20",
                },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-default ${color}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section className="bg-base-200/50 py-12 sm:py-16 bg-dot-pattern">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "3", label: "Years Experience" },
                { value: "5", label: "Projects Shipped" },
                { value: "10", label: "Teammates Worked With" },
                { value: "1", label: "Company" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="card bg-base-100 border border-base-300 text-center p-5"
                >
                  <p className="text-3xl sm:text-4xl font-black text-primary mb-1">
                    {value}
                  </p>
                  <p className="text-base-content/50 text-xs sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-dot-pattern">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-8 sm:p-14 text-center">
              <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
              <div className="relative">
                <p className="text-primary-content/70 text-xs font-bold uppercase tracking-widest mb-3">
                  Open to work
                </p>
                <h2 className="text-2xl sm:text-4xl font-black text-primary-content mb-4 leading-tight">
                  Let&apos;s build something
                  <br className="hidden sm:block" /> together.
                </h2>
                <p className="text-primary-content/70 text-sm sm:text-base mb-8 max-w-md mx-auto">
                  Looking for a frontend developer who cares about quality and
                  detail? Let&apos;s talk.
                </p>
                <a
                  href="/contact"
                  className="btn bg-white text-primary hover:bg-white/90 border-0 rounded-full btn-sm sm:btn-md font-bold shadow-lg"
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
