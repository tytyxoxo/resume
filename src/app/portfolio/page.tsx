import { Reveal } from "@/components/Reveal";

const projects = [
  {
    title: "HR CheckIn Dashboard",
    desc: "Admin web for monitoring employee information and exporting attendance reports. Built for HR teams to track daily check-in/check-out records.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Production",
    statusColor: "bg-success/10 text-success border-success/30",
    year: "2025",
    demo: "",
    github: "",
  },
  {
    title: "Admin Dashboard",
    desc: "Centralized admin dashboard for managing platform data, users, and analytics across multiple products.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Production",
    statusColor: "bg-success/10 text-success border-success/30",
    year: "2024",
    demo: "",
    github: "",
  },
  {
    title: "Data Management Web",
    desc: "Internal web tool for managing, importing, and exporting structured data with role-based access control.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    status: "Production",
    statusColor: "bg-success/10 text-success border-success/30",
    year: "2024",
    demo: "",
    github: "",
  },
  {
    title: "OMS",
    desc: "Order Management System for tracking and managing orders end-to-end — from creation through fulfillment and delivery.",
    tags: ["React", "JavaScript", "Vite"],
    status: "Production",
    statusColor: "bg-success/10 text-success border-success/30",
    year: "2023",
    demo: "",
    github: "",
  },
];

export default function Portfolio() {
  return (
    <div className="bg-base-100 min-h-full bg-dot-pattern">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <Reveal className="mb-10 sm:mb-14">
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
            Work
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-base-content mb-3">
            Portfolio
          </h1>
          <p className="text-base-content/50 text-sm sm:text-base max-w-lg">
            A selection of projects I&apos;ve worked on — from order management
            systems to admin dashboards and internal tools.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map(
            (
              { title, desc, tags, status, statusColor, year, demo, github },
              i,
            ) => (
              <Reveal key={title} delay={i * 100}>
                <div className="group relative card bg-base-100 border border-base-300 hover:border-primary/40 hover:shadow-xl transition duration-300 h-full overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="card-body gap-4 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-base-content text-base sm:text-lg leading-snug group-hover:text-primary transition-colors duration-300">
                        {title}
                      </h3>
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0 ${statusColor}`}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="text-base-content/55 text-sm leading-relaxed flex-1">
                      {desc}
                    </p>
                    <div className="flex items-center justify-between pt-1 gap-2">
                      <div className="flex flex-wrap gap-1.5 flex-1">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs border border-base-300 text-base-content/40 group-hover:border-primary/40 group-hover:text-primary transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-base-content/30 text-xs">
                          {year}
                        </span>
                        {github && (
                          <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base-content/40 hover:text-base-content transition-colors duration-200"
                            aria-label="GitHub"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                          </a>
                        )}
                        {demo && (
                          <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base-content/40 hover:text-primary transition-colors duration-200"
                            aria-label="Live demo"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>

        {/* CTA */}
        <Reveal className="mt-12 sm:mt-16">
          <div className="text-center">
            <p className="text-base-content/40 text-sm mb-4">
              Have a project in mind?
            </p>
            <a href="/contact" className="btn btn-primary rounded-full">
              Let&apos;s work together →
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
