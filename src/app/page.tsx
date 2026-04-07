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

const expertise = [
  {
    icon: "⬡",
    title: "JavaScript",
    desc: "Building interactive, performant web apps with modern ES6+ patterns and async programming.",
    tags: ["ES6+"],
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

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content mb-3 leading-tight">
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
              <div className="animate-float relative w-64 h-72 sm:w-72 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-base-300/50 bg-base-100">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
                <div className="absolute inset-0 bg-dot-pattern opacity-20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="text-6xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent select-none">
                    PR
                  </span>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-bold text-base-content/40 tracking-[0.2em] uppercase">
                      Frontend Dev
                    </p>
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary/60" />
                      <span className="w-2 h-2 rounded-full bg-primary/30" />
                      <span className="w-2 h-2 rounded-full bg-secondary/60" />
                    </div>
                  </div>
                </div>
                {/* decorative corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-secondary/50 rounded-br-lg" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/20 rounded-tr-lg" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-secondary/20 rounded-bl-lg" />
              </div>
              {/* Floating badges */}
              <div className="absolute -top-3 -right-6 bg-base-100 border border-base-300 rounded-xl px-3 py-1.5 shadow-lg text-xs font-semibold text-primary flex items-center gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Open to work
              </div>
              <div className="absolute -bottom-3 -left-6 bg-base-100 border border-base-300 rounded-xl px-3 py-1.5 shadow-lg text-xs font-medium text-base-content/60 flex items-center gap-1.5 whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>{" "}
                React · Next.js
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
                    className={`group relative card bg-base-100 border border-base-300 ${border} hover:shadow-xl transition duration-300 h-full overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-base-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div
                      className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${glow} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    />
                    <div className="card-body gap-4 p-5 relative">
                      <div
                        className={`w-11 h-11 rounded-2xl ${iconBg} ${iconHover} flex items-center justify-center text-xl ${iconText} group-hover:scale-110 transition-transform duration-300`}
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
                      <div className="card bg-base-100 border border-base-300 hover:border-primary/30 hover:shadow-md transition duration-300">
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
                <div className="group relative card bg-base-100 border border-base-300 hover:border-primary/40 hover:shadow-lg transition duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <div className="card-body flex-row gap-5 p-5 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-transform duration-300">
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
                  label: "Vite",
                  color:
                    "bg-violet-400/10 text-violet-500 border-violet-400/30 hover:bg-violet-400/20",
                },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition duration-200 cursor-default ${color}`}
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
                { value: "3+", label: "Years Experience" },
                { value: "5+", label: "Projects Shipped" },
                { value: "10+", label: "Teammates Worked With" },
                { value: "1", label: "Company" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="group card bg-base-100 border border-base-300 hover:border-primary/40 hover:shadow-lg text-center p-5 transition duration-300 hover:-translate-y-1 cursor-default"
                >
                  <p className="text-3xl sm:text-4xl font-black text-primary mb-1 group-hover:scale-110 transition-transform duration-300 origin-bottom inline-block">
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

      {/* ── Currently Learning ───────────────────────── */}
      <section className="py-16 sm:py-24 bg-dot-pattern">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-10 sm:mb-14">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Growth
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
              Currently Learning
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                iconBg: "bg-violet-400/10 text-violet-500",
                iconHover: "group-hover:bg-violet-400/20",
                title: "AI Integration",
                desc: "Exploring LLM APIs and building AI-powered features into web apps.",
                color: "border-violet-400/30 hover:border-violet-400/60",
                bg: "bg-violet-400/5",
                glow: "from-violet-400 to-violet-500",
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
                iconBg: "bg-pink-400/10 text-pink-500",
                iconHover: "group-hover:bg-pink-400/20",
                title: "Web Animations",
                desc: "Diving deeper into GSAP, Framer Motion, and CSS keyframe techniques.",
                color: "border-pink-400/30 hover:border-pink-400/60",
                bg: "bg-pink-400/5",
                glow: "from-pink-400 to-pink-500",
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
                iconBg: "bg-blue-400/10 text-blue-500",
                iconHover: "group-hover:bg-blue-400/20",
                title: "System Design",
                desc: "Learning scalable frontend architecture and design patterns for large apps.",
                color: "border-blue-400/30 hover:border-blue-400/60",
                bg: "bg-blue-400/5",
                glow: "from-blue-400 to-blue-500",
              },
            ].map(
              (
                { icon, iconBg, iconHover, title, desc, color, bg, glow },
                i,
              ) => (
                <Reveal key={title} delay={i * 100}>
                  <div
                    className={`group relative card border ${color} ${bg} p-5 sm:p-6 h-full transition duration-300 hover:shadow-lg overflow-hidden`}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${glow} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    />
                    <div
                      className={`w-10 h-10 rounded-2xl ${iconBg} ${iconHover} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {icon}
                    </div>
                    <h3 className="font-bold text-base-content mb-2">
                      {title}
                    </h3>
                    <p className="text-base-content/50 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ── My Process ───────────────────────────────── */}
      <section className="bg-base-200/50 py-16 sm:py-24 bg-dot-pattern">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-10 sm:mb-14">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              How I work
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
              My Process
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                step: "01",
                title: "Understand",
                desc: "Clarify goals, users, and constraints before writing any code.",
              },
              {
                step: "02",
                title: "Design",
                desc: "Wireframe and prototype in Figma to align on the vision early.",
              },
              {
                step: "03",
                title: "Build",
                desc: "Write clean, component-driven code with performance in mind.",
              },
              {
                step: "04",
                title: "Ship",
                desc: "Test across devices, iterate on feedback, and deliver.",
              },
            ].map(({ step, title, desc }, i) => (
              <Reveal key={step} delay={i * 100}>
                <div className="group relative p-5 sm:p-6 h-full rounded-2xl border border-transparent hover:border-primary/20 hover:bg-base-100/60 transition duration-300 cursor-default">
                  <div className="relative mb-3">
                    <div className="absolute -inset-1 bg-primary/5 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 -z-10" />
                    <p className="text-4xl sm:text-5xl font-black text-primary/15 group-hover:text-primary/30 leading-none transition-colors duration-300">
                      {step}
                    </p>
                  </div>
                  <h3 className="font-bold text-base-content group-hover:text-primary mb-2 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="text-base-content/50 text-sm leading-relaxed">
                    {desc}
                  </p>
                  {i < 3 && (
                    <span className="hidden sm:block absolute -right-1 top-5 text-base-content/15 text-sm group-hover:text-primary/30 transition-colors duration-300">
                      →
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools I Use ──────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-dot-pattern">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <Reveal className="mb-10 sm:mb-14">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
              Setup
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
              Tools I Use
            </h2>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  name: "VS Code",
                  category: "Code Editor",
                  hoverClass: "hover:border-blue-500/40",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      className="w-5 h-5"
                    >
                      <mask
                        id="vscode-mask"
                        width="100"
                        height="100"
                        x="0"
                        y="0"
                        maskUnits="userSpaceOnUse"
                      >
                        <path
                          fill="#fff"
                          fillRule="evenodd"
                          d="M70.912 99.317a6.223 6.223 0 0 0 4.96-.19l20.589-9.907A6.25 6.25 0 0 0 100 83.587V16.413a6.25 6.25 0 0 0-3.54-5.632L75.874.874a6.226 6.226 0 0 0-7.104 1.21L29.355 38.04 12.187 25.01a4.162 4.162 0 0 0-5.318.236l-5.506 5.009a4.168 4.168 0 0 0-.004 6.162L16.247 50 1.36 63.583a4.168 4.168 0 0 0 .004 6.162l5.506 5.01a4.162 4.162 0 0 0 5.318.236l17.168-13.032L68.77 97.917a6.217 6.217 0 0 0 2.143 1.4ZM75.015 27.3 45.11 50l29.906 22.701V27.3Z"
                          clipRule="evenodd"
                        />
                      </mask>
                      <g mask="url(#vscode-mask)">
                        <path
                          fill="#0065A9"
                          d="M96.461 10.796 75.857.876a6.23 6.23 0 0 0-7.107 1.207l-67.451 61.5a4.167 4.167 0 0 0 .004 6.162l5.51 5.009a4.167 4.167 0 0 0 5.32.236l81.228-61.62c2.725-2.067 6.639-.124 6.639 3.297v-.24a6.25 6.25 0 0 0-3.539-5.63Z"
                        />
                        <path
                          fill="#007ACC"
                          d="m96.461 89.204-20.604 9.92a6.229 6.229 0 0 1-7.107-1.207l-67.451-61.5a4.167 4.167 0 0 1 .004-6.162l5.51-5.009a4.167 4.167 0 0 1 5.32-.236l81.228 61.62c2.725 2.067 6.639.124 6.639-3.297v.24a6.25 6.25 0 0 1-3.539 5.63Z"
                        />
                        <path
                          fill="#1F9CF0"
                          d="M75.858 99.126a6.232 6.232 0 0 1-7.108-1.21c2.306 2.307 6.25.674 6.25-2.588V4.672c0-3.262-3.944-4.895-6.25-2.589a6.232 6.232 0 0 1 7.108-1.21l20.6 9.908A6.25 6.25 0 0 1 100 16.413v67.174a6.25 6.25 0 0 1-3.541 5.633l-20.601 9.906Z"
                        />
                      </g>
                    </svg>
                  ),
                },
                {
                  name: "Figma",
                  category: "UI Design",
                  hoverClass: "hover:border-purple-400/40",
                  icon: (
                    <svg
                      viewBox="0 0 54 80"
                      className="w-4 h-5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3333 80.0002C20.6933 80.0002 26.6667 74.0268 26.6667 66.6668V53.3335H13.3333C5.97333 53.3335 0 59.3068 0 66.6668C0 74.0268 5.97333 80.0002 13.3333 80.0002Z"
                        fill="#0ACF83"
                      />
                      <path
                        d="M0 39.9998C0 32.6398 5.97333 26.6665 13.3333 26.6665H26.6667V53.3332H13.3333C5.97333 53.3332 0 47.3598 0 39.9998Z"
                        fill="#A259FF"
                      />
                      <path
                        d="M0 13.3333C0 5.97333 5.97333 0 13.3333 0H26.6667V26.6667H13.3333C5.97333 26.6667 0 20.6933 0 13.3333Z"
                        fill="#F24E1E"
                      />
                      <path
                        d="M26.6667 0H40.0001C47.3601 0 53.3334 5.97333 53.3334 13.3333C53.3334 20.6933 47.3601 26.6667 40.0001 26.6667H26.6667V0Z"
                        fill="#FF7262"
                      />
                      <path
                        d="M53.3334 39.9998C53.3334 47.3598 47.3601 53.3332 40.0001 53.3332C32.6401 53.3332 26.6667 47.3598 26.6667 39.9998C26.6667 32.6398 32.6401 26.6665 40.0001 26.6665C47.3601 26.6665 53.3334 32.6398 53.3334 39.9998Z"
                        fill="#1ABCFE"
                      />
                    </svg>
                  ),
                },
                {
                  name: "GitHub",
                  category: "Version Control",
                  hoverClass: "hover:border-base-content/25",
                  icon: (
                    <svg
                      viewBox="0 0 1024 1024"
                      className="w-5 h-5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 417.92 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-.64-52.48-.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-.64-33.92 40.32-.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-232.96-56.96-232.96-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28s87.04 5.76 128 17.28c97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-.64 123.52-.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 929.92 1024 737.92 1024 512 1024 229.12 794.88 0 512 0"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                },
                {
                  name: "Vercel",
                  category: "Deployment",
                  hoverClass: "hover:border-base-content/25",
                  icon: (
                    <svg
                      viewBox="0 0 256 222"
                      className="w-5 h-5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="#fff" d="m128 0 128 221.705H0z" />
                    </svg>
                  ),
                },
                {
                  name: "Postman",
                  category: "API Testing",
                  hoverClass: "hover:border-orange-500/40",
                  icon: (
                    <svg
                      viewBox="0 0 256 256"
                      preserveAspectRatio="xMidYMid"
                      className="w-5 h-5"
                    >
                      <path
                        d="M254.953 144.253c8.959-70.131-40.569-134.248-110.572-143.206C74.378-7.912 10.005 41.616 1.047 111.619c-8.959 70.003 40.569 134.248 110.572 143.334 70.131 8.959 134.248-40.569 143.334-110.7Z"
                        fill="#FF6C37"
                      />
                      <path
                        d="m174.2 82.184-54.007 54.007-15.229-15.23c53.11-53.11 58.358-48.503 69.236-38.777Z"
                        fill="#FFF"
                      />
                      <path
                        d="M120.193 137.47c-.384 0-.64-.128-.895-.384l-15.358-15.229a1.237 1.237 0 0 1 0-1.792c54.007-54.006 59.638-48.887 71.028-38.649.255.256.383.512.383.896s-.128.64-.383.896l-54.007 53.878c-.128.256-.512.384-.768.384Zm-13.437-16.509 13.437 13.438 52.087-52.087c-9.47-8.446-15.87-11.006-65.524 38.65Z"
                        fill="#FF6C37"
                      />
                      <path
                        d="m135.679 151.676-14.718-14.718 54.007-54.006c14.46 14.59-7.167 38.265-39.29 68.724Z"
                        fill="#FFF"
                      />
                      <path
                        d="M135.679 152.956c-.384 0-.64-.128-.896-.384l-14.718-14.718c-.256-.256-.256-.512-.256-.896s.128-.64.384-.895L174.2 82.056a1.237 1.237 0 0 1 1.791 0 15.58 15.58 0 0 1 4.991 11.902c-.256 14.206-16.38 32.25-44.28 58.614-.383.256-.767.384-1.023.384Zm-12.926-15.998c8.19 8.319 11.646 11.646 12.926 12.926 21.5-20.476 42.36-41.464 42.488-55.926.128-3.327-1.152-6.655-3.327-9.214l-52.087 52.214Z"
                        fill="#FF6C37"
                      />
                      <path
                        d="m105.22 121.345 10.878 10.878c.256.256.256.512 0 .768-.128.128-.128.128-.256.128l-22.524 4.863c-1.152.128-2.175-.64-2.431-1.791-.128-.64.128-1.28.512-1.664l13.053-13.054c.256-.256.64-.384.768-.128Z"
                        fill="#FFF"
                      />
                      <path
                        d="M92.934 139.262c-1.92 0-3.327-1.536-3.327-3.455 0-.896.384-1.792 1.024-2.432l13.053-13.054c.768-.64 1.792-.64 2.56 0l10.878 10.878c.768.64.768 1.792 0 2.56-.256.256-.512.384-.896.512l-22.524 4.863c-.256 0-.512.128-.768.128Zm11.902-16.51-12.542 12.543c-.256.256-.383.64-.128 1.024.128.383.512.511.896.383l21.116-4.607-9.342-9.342Z"
                        fill="#FF6C37"
                      />
                      <path
                        d="M202.739 52.238c-8.191-7.935-21.373-7.679-29.307.64-7.935 8.318-7.679 21.372.64 29.306A20.678 20.678 0 0 0 199.155 85l-14.59-14.59 18.174-18.172Z"
                        fill="#FFF"
                      />
                      <path
                        d="M188.405 89.223c-12.158 0-22.012-9.854-22.012-22.012 0-12.158 9.854-22.012 22.012-22.012 5.631 0 11.134 2.176 15.23 6.143.255.256.383.512.383.896s-.128.64-.384.895L186.357 70.41l13.566 13.566c.512.512.512 1.28 0 1.792l-.256.256c-3.327 2.047-7.295 3.199-11.262 3.199Zm0-41.337c-10.75 0-19.452 8.703-19.324 19.453 0 10.75 8.702 19.452 19.452 19.324 2.944 0 5.887-.64 8.575-2.047l-13.438-13.31c-.256-.256-.384-.512-.384-.896s.128-.64.384-.895l17.149-17.15c-3.456-2.943-7.807-4.479-12.414-4.479Z"
                        fill="#FF6C37"
                      />
                      <path
                        d="m203.122 52.622-.255-.256-18.301 18.044 14.461 14.462c1.408-.896 2.816-1.92 3.967-3.072a20.51 20.51 0 0 0 .128-29.178Z"
                        fill="#FFF"
                      />
                      <path
                        d="M199.155 86.28c-.384 0-.64-.128-.896-.384l-14.589-14.59c-.256-.256-.384-.512-.384-.896s.128-.64.384-.895l18.173-18.173a1.237 1.237 0 0 1 1.791 0l.384.256c8.575 8.574 8.575 22.396.128 31.098-1.28 1.28-2.687 2.432-4.223 3.328-.384.128-.64.256-.768.256Zm-12.798-15.87 12.926 12.926c1.024-.64 2.048-1.536 2.816-2.304 7.294-7.294 7.678-19.196.64-26.875L186.357 70.41Z"
                        fill="#FF6C37"
                      />
                      <path
                        d="M176.375 84.488a7.879 7.879 0 0 0-11.134 0l-48.247 48.247 8.063 8.063 51.062-44.792c3.328-2.816 3.584-7.807.768-11.134-.256-.128-.384-.256-.512-.384Z"
                        fill="#FFF"
                      />
                      <path
                        d="M124.929 142.077c-.384 0-.64-.128-.896-.383l-8.063-8.063a1.237 1.237 0 0 1 0-1.792l48.247-48.247a9.115 9.115 0 0 1 12.926 0 9.115 9.115 0 0 1 0 12.926l-.384.384-51.063 44.792c-.128.255-.384.383-.767.383Zm-6.143-9.342 6.27 6.271 50.167-44.024c2.816-2.304 3.072-6.527.768-9.342-2.303-2.816-6.526-3.072-9.342-.768-.128.128-.256.256-.512.384l-47.351 47.48Z"
                        fill="#FF6C37"
                      />
                      <path
                        d="M80.009 187.637c-.512.256-.768.768-.64 1.28l2.175 9.214c.512 1.28-.256 2.816-1.663 3.2-1.024.384-2.176 0-2.816-.768l-14.077-13.95 45.943-45.943 15.87.256 10.75 10.75c-2.56 2.175-18.045 17.149-55.542 35.961Z"
                        fill="#FFF"
                      />
                      <path
                        d="M78.985 202.61c-1.024 0-2.048-.383-2.688-1.151l-13.95-13.95c-.255-.256-.383-.512-.383-.896 0-.383.128-.64.384-.895l45.944-45.944c.256-.256.64-.384.895-.384l15.87.256c.383 0 .64.128.895.384l10.75 10.75c.256.256.384.64.384 1.024s-.128.64-.512.896l-.895.767c-13.566 11.902-31.995 23.804-54.902 35.194l2.175 9.086c.384 1.664-.384 3.456-1.92 4.352-.767.384-1.407.512-2.047.512Zm-14.078-15.997 13.182 13.054c.384.64 1.152.896 1.792.512.64-.384.896-1.152.512-1.792l-2.176-9.214c-.256-1.152.256-2.176 1.28-2.688 22.652-11.39 40.952-23.163 54.39-34.81l-9.47-9.47-14.718-.256-44.792 44.664Z"
                        fill="#FF6C37"
                      />
                      <path
                        d="m52.11 197.62 11.006-11.007 16.38 16.381-26.107-1.791c-1.151-.128-1.92-1.152-1.791-2.304 0-.512.128-1.024.512-1.28Z"
                        fill="#FFF"
                      />
                      <path
                        d="m79.497 204.146-26.236-1.791c-1.92-.128-3.199-1.792-3.071-3.712.128-.768.384-1.535 1.024-2.047L62.22 185.59a1.237 1.237 0 0 1 1.792 0l16.38 16.38c.385.385.512.897.257 1.408-.256.512-.64.768-1.152.768Zm-16.381-15.74-10.11 10.11c-.384.255-.384.895 0 1.151.127.128.255.256.511.256l22.652 1.536-13.053-13.054ZM104.452 146.557c-.768 0-1.28-.64-1.28-1.28 0-.384.128-.64.384-.896l12.414-12.414a1.237 1.237 0 0 1 1.792 0l8.062 8.063c.384.384.512.768.384 1.28-.128.384-.512.767-1.023.895l-20.477 4.352h-.256Zm12.414-11.902-8.446 8.446 13.821-2.943-5.375-5.503Z"
                        fill="#FF6C37"
                      />
                      <path
                        d="m124.8 140.926-14.077 3.071c-1.024.256-2.048-.384-2.303-1.408-.128-.64 0-1.28.511-1.791l7.807-7.807 8.063 7.935Z"
                        fill="#FFF"
                      />
                      <path
                        d="M110.467 145.277a3.168 3.168 0 0 1-3.2-3.2c0-.895.385-1.663.897-2.303l7.806-7.807a1.237 1.237 0 0 1 1.792 0l8.062 8.063c.384.384.512.768.384 1.28-.128.384-.512.767-1.023.895l-14.078 3.072h-.64Zm6.399-10.622-6.91 6.91c-.257.257-.257.512-.129.768s.384.384.768.384l11.774-2.56-5.503-5.502ZM203.25 64.907c-.256-.767-1.151-1.151-1.92-.895-.767.255-1.151 1.151-.895 1.92 0 .127.128.255.128.383.768 1.536.512 3.455-.512 4.863-.512.64-.384 1.536.128 2.048.64.512 1.536.384 2.048-.256 1.92-2.432 2.303-5.503 1.023-8.063Z"
                        fill="#FF6C37"
                      />
                    </svg>
                  ),
                },
                {
                  name: "Chrome DevTools",
                  category: "Debugging",
                  hoverClass: "hover:border-blue-400/40",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 190.5 190.5"
                      className="w-5 h-5"
                    >
                      <path
                        fill="#fff"
                        d="M95.252 142.873c26.304 0 47.627-21.324 47.627-47.628s-21.323-47.628-47.627-47.628-47.627 21.324-47.627 47.628 21.323 47.628 47.627 47.628z"
                      />
                      <path
                        fill="#229342"
                        d="m54.005 119.07-41.24-71.43a95.227 95.227 0 0 0-.003 95.25 95.234 95.234 0 0 0 82.496 47.61l41.24-71.43v-.011a47.613 47.613 0 0 1-17.428 17.443 47.62 47.62 0 0 1-47.632.007 47.62 47.62 0 0 1-17.433-17.437z"
                      />
                      <path
                        fill="#fbc116"
                        d="m136.495 119.067-41.239 71.43a95.229 95.229 0 0 0 82.489-47.622A95.24 95.24 0 0 0 190.5 95.248a95.237 95.237 0 0 0-12.772-47.623H95.249l-.01.007a47.62 47.62 0 0 1 23.819 6.372 47.618 47.618 0 0 1 17.439 17.431 47.62 47.62 0 0 1-.001 47.633z"
                      />
                      <path
                        fill="#1a73e8"
                        d="M95.252 132.961c20.824 0 37.705-16.881 37.705-37.706S116.076 57.55 95.252 57.55 57.547 74.431 57.547 95.255s16.881 37.706 37.705 37.706z"
                      />
                      <path
                        fill="#e33b2e"
                        d="M95.252 47.628h82.479A95.237 95.237 0 0 0 142.87 12.76 95.23 95.23 0 0 0 95.245 0a95.222 95.222 0 0 0-47.623 12.767 95.23 95.23 0 0 0-34.856 34.872l41.24 71.43.011.006a47.62 47.62 0 0 1-.015-47.633 47.61 47.61 0 0 1 41.252-23.815z"
                      />
                    </svg>
                  ),
                },
                {
                  name: "Jira",
                  category: "Project Management",
                  hoverClass: "hover:border-blue-600/40",
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="#0052CC"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.004-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24.018 12.49V1.005A1.001 1.001 0 0 0 23.013 0z" />
                    </svg>
                  ),
                },
              ].map((tool) => {
                const { name, category, icon } = tool;
                const iconBg = "iconBg" in tool ? tool.iconBg : "";
                const hoverClass =
                  "hoverClass" in tool
                    ? tool.hoverClass
                    : "hover:border-primary/30";
                return (
                  <div
                    key={name}
                    className={`group card bg-base-100 border border-base-300 ${hoverClass} hover:shadow-md transition duration-200 p-4 flex flex-row items-center gap-3 hover:-translate-y-0.5`}
                  >
                    <span
                      className={`group-hover:scale-110 transition duration-200 shrink-0 ${iconBg}`}
                    >
                      {icon}
                    </span>
                    <div>
                      <p className="font-semibold text-base-content text-sm">
                        {name}
                      </p>
                      <p className="text-base-content/40 text-xs">{category}</p>
                    </div>
                  </div>
                );
              })}
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
