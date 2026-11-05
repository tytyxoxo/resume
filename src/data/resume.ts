// Single source of truth for every fact on the site (home, 3D scene, /resume).
// Facts come from the previous home, /portfolio and /contact pages; add new ones here only.

export type SectionId = "hero" | "work" | "experience" | "education" | "skills" | "contact";

export const sections: { id: SectionId; label: string }[] = [
  { id: "hero", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const profile = {
  name: "Passon Rattanakongton",
  shortName: "Passon",
  role: "Senior Frontend Developer",
  company: "Nutrition Profess",
  location: "Bangkok, Thailand",
  timeZone: "Asia/Bangkok",
  availability: "Available for new opportunities",
  summary:
    "I build the internal tools teams run on every day: order management, HR and admin dashboards, with React, Next.js and TypeScript. Based in Bangkok, currently at Nutrition Profess.",
  email: "tyty.passon@gmail.com",
  linkedin: "https://www.linkedin.com/in/passon-rattanakongton",
};

export type ProjectId = "component-library" | "hr-checkin" | "admin-dashboard" | "data-management" | "oms";

export type Project = {
  id: ProjectId;
  name: string;
  short: string; // tab label
  year: string;
  kind: "Personal" | "Internal";
  status: "In progress" | "Production";
  desc: string;
  stack: string[];
  demo?: string;
  source?: string;
};

export const projects: Project[] = [
  {
    id: "component-library",
    name: "Design Component Library",
    short: "Component library",
    year: "2026",
    kind: "Personal",
    status: "In progress",
    desc: "A curated collection of reusable UI components (buttons, modals, forms, tables and more), built for consistency and rapid development across projects.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    demo: "https://designcomponent.vercel.app",
    source: "https://github.com/tytyxoxo/playground",
  },
  {
    id: "hr-checkin",
    name: "HR CheckIn Dashboard",
    short: "HR CheckIn",
    year: "2025",
    kind: "Internal",
    status: "Production",
    desc: "Admin web for monitoring employee information and exporting attendance reports. Built for HR teams to track daily check-in/check-out records.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "admin-dashboard",
    name: "Admin Dashboard",
    short: "Admin dashboard",
    year: "2024",
    kind: "Internal",
    status: "Production",
    desc: "Centralized admin dashboard for managing platform data, users, and analytics across multiple products.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "data-management",
    name: "Data Management System",
    short: "Data management",
    year: "2024",
    kind: "Internal",
    status: "Production",
    desc: "Internal web tool for managing, importing, and exporting structured data with role-based access control.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "oms",
    name: "Order Management System",
    short: "OMS",
    year: "2023",
    kind: "Internal",
    status: "Production",
    desc: "Order Management System for tracking and managing orders end-to-end, from creation through fulfillment and delivery.",
    stack: ["React", "JavaScript", "Vite"],
  },
];

export const experience = [
  {
    period: "2026 – Present",
    current: true,
    title: "Senior Frontend Developer",
    company: "Nutrition Profess",
    location: "Bangkok, Thailand",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    bullets: [
      "Built HR CheckIn Dashboard for monitoring employee attendance and exporting reports.",
      "Developed Admin Dashboard for managing platform data, users, and analytics.",
      "Mentored junior developers and helped improve team workflows.",
    ],
  },
  {
    period: "2023 – 2025",
    current: false,
    title: "Frontend Developer",
    company: "Nutrition Profess",
    location: "Bangkok, Thailand",
    stack: ["React", "JavaScript", "Tailwind CSS", "Figma"],
    bullets: [
      "Built OMS (Order Management System) for tracking orders end-to-end.",
      "Developed Data Management Web for importing, exporting, and managing structured data.",
    ],
  },
];

export const education = [
  {
    degree: "Faculty of Information Technology and Multimedia",
    school: "Thai-Nichi Institute of Technology",
    year: "2015 – 2019",
    note: "Second Class Honours",
  },
  {
    degree: "High School",
    school: "Udomsuksa School",
    year: "2012 – 2015",
    note: "Arts-Mathematics Program",
  },
];

// Hero stack line and the 3D macropad legends (8 keys) come from these two lists.
export const stack = ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Figma"];
export const toolchain = ["Next.js", "Tailwind CSS", "Git", "Figma", "Vite"];
export const allTools = [...new Set([...stack, ...toolchain])];

export const learning = [
  { title: "AI integration", desc: "Exploring LLM APIs and building chat and assistant features into web apps." },
  { title: "Web animations", desc: "Diving deeper into GSAP, Framer Motion, and CSS keyframe techniques." },
  { title: "System design", desc: "Learning scalable frontend architecture and design patterns for large apps." },
];

export const bookingSlots = ["09:00 – 10:00", "10:00 – 11:00", "13:00 – 14:00", "14:00 – 15:00", "16:00 – 17:00"];
