"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Modal } from "@/components/Modal";
import { CallyDatePicker } from "@/components/CallyDatePicker";

const TIME_SLOTS = [
  "09:00 – 10:00",
  "10:00 – 11:00",
  "13:00 – 14:00",
  "14:00 – 15:00",
  "16:00 – 17:00",
];

function GraduationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0121 17.75a12.083 12.083 0 01-9 3.75 12.083 12.083 0 01-9-3.75 12.083 12.083 0 012.84-6.172L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7M15 10.5V17" />
    </svg>
  );
}

function SchoolIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 4l9 5.5V20H3V9.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20v-6h6v6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
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

const techStack = ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Figma"];

const toolchain = [
  { label: "Next.js" },
  { label: "Tailwind CSS" },
  { label: "Git" },
  { label: "Figma" },
  { label: "Vite" },
];

const learning = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
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
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
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
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    iconBg: "bg-accent/10 text-accent",
    iconHover: "group-hover:bg-accent/20",
    titleHover: "group-hover:text-accent",
    title: "System Design",
    desc: "Learning scalable frontend architecture and design patterns for large apps.",
  },
];

const projects = [
  {
    num: "01",
    name: "Design Component Library",
    desc: "A curated collection of reusable UI components — buttons, modals, forms, tables, and more — built for consistency and rapid development across projects.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: "2026",
  },
  {
    num: "02",
    name: "HR CheckIn Dashboard",
    desc: "Admin web for monitoring employee information and exporting attendance reports. Built for HR teams to track daily check-in/check-out records.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: "2025",
  },
  {
    num: "03",
    name: "Admin Dashboard",
    desc: "Centralized admin dashboard for managing platform data, users, and analytics across multiple products.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: "2024",
  },
  {
    num: "04",
    name: "Data Management System",
    desc: "Internal web tool for managing, importing, and exporting structured data with role-based access control.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    year: "2024",
  },
  {
    num: "05",
    name: "Order Management System",
    desc: "Order Management System for tracking and managing orders end-to-end — from creation through fulfillment and delivery.",
    tags: ["React", "JavaScript", "Vite"],
    year: "2023",
  },
];

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const [bookingOpen, setBookingOpen] = useState(false);
  const [booking, setBooking] = useState({ name: "", email: "", date: "", time: "", note: "" });
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: booking.name,
        email: booking.email,
        subject: `Consultation Request: ${booking.date} ${booking.time}`,
        message: `Date: ${booking.date}\nTime: ${booking.time}\n\n${booking.note || "No additional notes."}`,
      }),
    });
    if (res.ok) {
      setBookingStatus("success");
      setBooking({ name: "", email: "", date: "", time: "", note: "" });
    } else {
      setBookingStatus("error");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-base-100">
      <SpeedInsights />

      {/* ── Hero ─────────────────────────────────────── */}
      <section id="hero" className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-dot-pattern">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-175 h-175 bg-primary/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-125 h-125 bg-secondary/8 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="relative z-10 w-full max-w-5xl px-5 py-16 mx-auto sm:px-8 sm:py-20">
          <div className="animate-fade-up delay-100 inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full border border-success/30 bg-success/5 select-none cursor-default">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-success">Available for new opportunities</span>
          </div>

          <h1
            className="font-extrabold text-base-content leading-[1.1] tracking-tight text-balance mb-5"
            style={{ fontSize: "clamp(1.875rem, 7vw, 6rem)" }}
          >
            <span className="animate-hero-name delay-200">Passon</span>
            <br className="hidden sm:block" />
            <span className="animate-hero-name" style={{ animationDelay: "280ms" }}>Rattanakongton</span>
          </h1>

          <p className="mb-6 text-xl font-semibold delay-300 animate-fade-up sm:text-3xl text-primary">
            Senior Frontend Developer
          </p>

          <p className="max-w-[65ch] mb-8 text-base leading-relaxed animate-fade-up delay-400 text-base-content/85 sm:text-lg text-pretty">
            I build clean, responsive interfaces and ship them with care. Based in Bangkok, currently at Nutrition Profess.
          </p>

          <div className="flex flex-wrap gap-2 mb-10 cursor-default select-none animate-fade-up delay-500">
            {techStack.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-base-200 text-base-content/80 border border-base-300">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10 delay-600 animate-fade-up sm:mb-14">
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-full btn btn-primary">
              Work with me →
            </a>
            <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-full btn btn-outline btn-primary">
              View Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured Work ────────────────────────────── */}
      <section id="work" className="min-h-screen flex flex-col justify-center py-16 bg-dot-pattern section-rule">
        <div className="max-w-5xl px-5 mx-auto sm:px-8 w-full">
          <Reveal className="mb-10 sm:mb-14" variant="fade">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl text-base-content text-balance">
              Featured Work
            </h2>
          </Reveal>
          <div className="flex flex-col gap-6 sm:gap-8">
            <Reveal>
              <div className="transition duration-300 border cursor-default select-none group bg-base-100 border-base-300 rounded-2xl p-7 sm:p-8 hover:border-primary/30 hover:shadow-lg">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-xs text-primary/70" aria-hidden="true">{projects[0].num}</span>
                  <span className="text-xs font-medium text-success bg-success/8 px-2 py-0.5 rounded-full border border-success/20">Most recent</span>
                </div>
                <h3 className="mb-3 text-2xl font-bold leading-snug transition-colors duration-300 text-base-content sm:text-3xl group-hover:text-primary text-balance">
                  {projects[0].name}
                </h3>
                <p className="max-w-2xl mb-6 text-base leading-relaxed text-base-content/85 text-pretty">{projects[0].desc}</p>
                <div className="flex flex-wrap gap-2">
                  {projects[0].tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-base-200 text-base-content/80 border border-base-300">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {projects.slice(1).map(({ num, name, desc, tags }, i) => (
                <Reveal key={num} delay={i * 80}>
                  <div className="flex flex-col h-full gap-3 p-5 transition duration-300 border cursor-default select-none group bg-base-100 border-base-300 rounded-2xl hover:border-primary/30 hover:shadow-md">
                    <span className="font-mono text-xs text-primary/55" aria-hidden="true">{num}</span>
                    <h3 className="text-base font-semibold leading-snug transition-colors duration-300 text-base-content group-hover:text-primary">{name}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-base-content/85 text-pretty">{desc}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium bg-base-200 text-base-content/80 border border-base-300">{tag}</span>
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
      <section id="experience" className="min-h-screen flex flex-col justify-center py-16 bg-dot-pattern section-rule">
        <div className="max-w-5xl px-5 mx-auto sm:px-8 w-full">
          <Reveal className="mb-10 sm:mb-14" variant="fade">
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl text-base-content text-balance">
              Professional Journey
            </h2>
          </Reveal>

          <Reveal>
            {/* Mobile timeline */}
            <div className="flex flex-col sm:hidden">
              {experiences.map(({ period, title, company, location, bullets, tags }, i) => (
                <div key={title + "-m"} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-content shrink-0 ring-4 ring-primary/10">
                      <CheckIcon />
                    </div>
                    {i < experiences.length - 1 && <div className="w-0.5 flex-1 bg-primary/20 my-1" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className={`border shadow-sm card ${i === 0 ? "bg-primary/5 border-primary/25" : "bg-base-100 border-base-300"}`}>
                      <div className="gap-2 px-4 py-4 card-body">
                        <span className="text-xs font-bold text-primary">{period}</span>
                        <h3 className="text-sm font-bold leading-snug text-base-content">{title}</h3>
                        <p className="text-xs text-base-content/65">{company} · {location}</p>
                        <div className="divider my-0.5 opacity-30" />
                        <ul className="flex flex-col gap-1.5">
                          {bullets.map((b) => (
                            <li key={b} className="flex gap-2 text-xs text-base-content/85">
                              <span className="text-primary shrink-0 mt-0.5">▸</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                        {tags && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {tags.map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium bg-base-200 text-base-content/80 border border-base-300">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop timeline */}
            <ul className="hidden cursor-default select-none timeline timeline-vertical sm:block">
              {experiences.map(({ period, title, company, location, bullets, tags }, i) => (
                <li key={title + "-d"}>
                  {i > 0 && <hr className="bg-primary/20" />}
                  <div className="timeline-start me-6 text-end min-w-[140px]">
                    <span className="block mb-1 text-sm font-bold text-primary">{period}</span>
                    <span className="block text-xs text-base-content/65">{company}</span>
                    <span className="text-xs text-base-content/65">{location}</span>
                  </div>
                  <div className="timeline-middle">
                    <div className="flex items-center justify-center border-4 rounded-full shadow-md w-9 h-9 bg-primary border-base-100 text-primary-content ring-2 ring-primary/20">
                      <CheckIcon />
                    </div>
                  </div>
                  <div className="mb-12 timeline-end ms-6">
                    <div className={`transition duration-300 border card hover:shadow-md ${i === 0 ? "bg-primary/5 border-primary/25 hover:border-primary/45" : "bg-base-100 border-base-300 hover:border-primary/30"}`}>
                      <div className="gap-3 px-5 py-4 card-body">
                        <h3 className="text-base font-bold leading-snug text-base-content">{title}</h3>
                        <ul className="flex flex-col gap-2">
                          {bullets.map((b) => (
                            <li key={b} className="flex gap-2 text-sm text-base-content/85">
                              <span className="text-primary shrink-0 mt-0.5">▸</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                        {tags && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {tags.map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium bg-base-200 text-base-content/80 border border-base-300">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {i < experiences.length - 1 && <hr className="bg-primary/20" />}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Education ────────────────────────────────── */}
      <section id="education" className="min-h-screen flex flex-col justify-center py-14 bg-base-200/40 bg-dot-pattern section-rule">
        <div className="max-w-5xl px-5 mx-auto sm:px-8 w-full">
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
                      <h3 className="text-sm font-bold leading-snug transition-colors duration-300 text-base-content sm:text-base group-hover:text-primary">{degree}</h3>
                      <p className="text-base-content/70 text-xs sm:text-sm mt-0.5">{school}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs text-base-content/65 bg-base-200 px-2 py-0.5 rounded-full">{year}</span>
                        {note && <span className="text-xs text-primary bg-primary/8 px-2 py-0.5 rounded-full border border-primary/20">{note}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills & Growth ──────────────────────────── */}
      <section id="skills" className="min-h-screen flex flex-col justify-center py-16 bg-dot-pattern section-rule">
        <div className="max-w-5xl px-5 mx-auto sm:px-8 w-full">
          <Reveal className="mb-10 sm:mb-14" variant="fade">
            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl text-base-content text-balance">
              Skills & Growth
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Toolchain */}
            <div>
              <Reveal variant="fade">
                <p className="mb-5 text-xs font-semibold tracking-widest uppercase text-base-content/40">Toolchain</p>
              </Reveal>
              <div className="flex flex-wrap gap-3 cursor-default select-none">
                {toolchain.map(({ label }, i) => (
                  <Reveal key={label} delay={i * 70}>
                    <span className="px-4 py-1.5 rounded-full text-sm font-medium border transition duration-200 cursor-default bg-primary/8 text-primary/80 border-primary/20 hover:bg-primary/15">
                      {label}
                    </span>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Currently Learning */}
            <div>
              <Reveal variant="fade">
                <p className="mb-5 text-xs font-semibold tracking-widest uppercase text-base-content/40">Currently Learning</p>
              </Reveal>
              <div className="flex flex-col divide-y cursor-default select-none divide-base-300">
                {learning.map(({ icon, iconBg, iconHover, titleHover, title, desc }, i) => (
                  <Reveal key={title} delay={i * 80}>
                    <div className="flex gap-4 py-5 group">
                      <div className={`w-10 h-10 rounded-2xl ${iconBg} ${iconHover} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`}>
                        {icon}
                      </div>
                      <div>
                        <h3 className={`mb-1 text-sm font-bold text-base-content transition-colors duration-300 ${titleHover}`}>{title}</h3>
                        <p className="text-sm leading-relaxed text-base-content/70 text-pretty">{desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section id="contact" className="min-h-screen flex flex-col justify-center py-16 bg-base-200/40 bg-dot-pattern section-rule">
        <div className="max-w-5xl px-5 mx-auto sm:px-8 w-full">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left — heading + CTAs */}
            <div className="flex flex-col justify-center">
              <Reveal variant="fade">
                <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-primary">Get in touch</p>
                <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl text-base-content text-balance">
                  Let&apos;s build something together.
                </h2>
                <p className="mb-8 text-base leading-relaxed text-base-content/60 text-pretty">
                  Have a project in mind? Looking for a frontend developer who cares about quality and detail? Let&apos;s talk.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:tyty.passon@gmail.com"
                    className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-sm font-medium text-base-content hover:border-primary/40 hover:shadow-sm transition-all duration-200 w-fit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    tyty.passon@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={() => { setBookingOpen(true); setBookingStatus("idle"); }}
                    className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl border border-base-300 bg-base-100 text-sm font-medium text-base-content hover:border-primary/40 hover:shadow-sm transition-all duration-200 w-fit cursor-default"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                    </svg>
                    Book a Consultation
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <Reveal delay={80}>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control gap-1">
                    <label htmlFor="contact-name" className="label-text text-sm text-base-content/60">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="input input-bordered w-full"
                      value={form.name}
                      onChange={handleChange}
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="form-control gap-1">
                    <label htmlFor="contact-email" className="label-text text-sm text-base-content/60">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="input input-bordered w-full"
                      value={form.email}
                      onChange={handleChange}
                      maxLength={254}
                      required
                    />
                  </div>
                </div>
                <div className="form-control gap-1">
                  <label htmlFor="contact-subject" className="label-text text-sm text-base-content/60">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    className="input input-bordered w-full"
                    value={form.subject}
                    onChange={handleChange}
                    maxLength={200}
                    required
                  />
                </div>
                <div className="form-control gap-1">
                  <label htmlFor="contact-message" className="label-text text-sm text-base-content/60">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell me about your project..."
                    className="textarea textarea-bordered w-full h-32 resize-none"
                    value={form.message}
                    onChange={handleChange}
                    maxLength={5000}
                    required
                  />
                </div>
                {status === "success" && <p className="text-success text-sm">Message sent! I&apos;ll get back to you soon.</p>}
                {status === "error" && <p className="text-error text-sm">Something went wrong. Please try again.</p>}
                <button type="submit" className="btn btn-primary w-full sm:w-fit" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            </Reveal>
          </div>

          {/* Mini footer */}
          <div className="mt-16 pt-8 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-base-content/40 text-sm">© {new Date().getFullYear()} Passon Rattanakongton. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/passon-rattanakongton" target="_blank" rel="noopener noreferrer" className="text-base-content/40 hover:text-base-content text-sm transition-colors duration-200">LinkedIn</a>
              <a href="mailto:tyty.passon@gmail.com" className="text-base-content/40 hover:text-base-content text-sm transition-colors duration-200">Email</a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <Modal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        title="Book a Consultation"
        actions={
          bookingStatus !== "success" ? (
            <button form="booking-form" type="submit" className="btn btn-primary" disabled={bookingStatus === "loading"}>
              {bookingStatus === "loading" ? "Sending..." : "Confirm Booking"}
            </button>
          ) : (
            <button className="btn" onClick={() => setBookingOpen(false)}>Close</button>
          )
        }
      >
        {bookingStatus === "success" ? (
          <div className="text-center py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-success mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <p className="font-semibold text-base-content">Booking request sent!</p>
            <p className="text-sm text-base-content/60 mt-1">I&apos;ll confirm your slot via email shortly.</p>
          </div>
        ) : (
          <form id="booking-form" className="flex flex-col gap-3 mt-2" onSubmit={handleBookingSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control gap-1">
                <label htmlFor="booking-name" className="label-text text-sm text-base-content/60">Name</label>
                <input id="booking-name" type="text" name="name" placeholder="Your name" className="input input-bordered input-sm w-full" value={booking.name} onChange={handleBookingChange} maxLength={100} required />
              </div>
              <div className="form-control gap-1">
                <label htmlFor="booking-email" className="label-text text-sm text-base-content/60">Email</label>
                <input id="booking-email" type="email" name="email" placeholder="your@email.com" className="input input-bordered input-sm w-full" value={booking.email} onChange={handleBookingChange} maxLength={254} required />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control gap-1">
                <label className="label-text text-sm text-base-content/60">Date</label>
                <CallyDatePicker name="date" value={booking.date} onChange={(val) => setBooking((prev) => ({ ...prev, date: val }))} min={today} required />
              </div>
              <div className="form-control gap-1">
                <label htmlFor="booking-time" className="label-text text-sm text-base-content/60">Time Slot</label>
                <select id="booking-time" name="time" className="select select-sm w-full" value={booking.time} onChange={handleBookingChange} required>
                  <option value="" disabled>Select a time</option>
                  {TIME_SLOTS.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>
            </div>
            <div className="form-control gap-1">
              <label htmlFor="booking-note" className="label-text text-sm text-base-content/60">Note (optional)</label>
              <textarea id="booking-note" name="note" placeholder="What would you like to discuss?" className="textarea textarea-bordered textarea-sm w-full h-20 resize-none" value={booking.note} onChange={handleBookingChange} maxLength={1000} />
            </div>
            {bookingStatus === "error" && <p className="text-error text-sm">Something went wrong. Please try again.</p>}
          </form>
        )}
      </Modal>
    </div>
  );
}
