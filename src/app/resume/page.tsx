import type { Metadata } from "next";
import Link from "next/link";
import {
  allTools,
  education,
  experience,
  learning,
  profile,
  projects,
} from "@/data/resume";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: "Resume · Passon Rattanakongton",
  description: `Resume for ${profile.name}, ${profile.role} in ${profile.location}.`,
};

const linkClassName =
  "font-medium text-base-content hover:underline underline-offset-2";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-base-200/60 px-4 py-8 font-sans text-base-content print:min-h-0 print:bg-white print:p-0">
      <style>{`
        @page { size: A4; margin: 14mm; }

        @media print {
          body > :not(main):not(script) { display: none !important; }
          html, body { background: #fff !important; }
          html { color-scheme: light !important; }
        }
      `}</style>

      <div className="mx-auto mb-4 flex max-w-3xl items-center justify-between print:hidden">
        <Link href="/" className={linkClassName}>
          ← Back to home
        </Link>
        <PrintButton />
      </div>

      <article data-theme="light" className="mx-auto max-w-3xl space-y-6 rounded-xl border border-base-300 bg-base-100 p-8 text-sm leading-relaxed sm:p-12 print:max-w-none print:space-y-3 print:rounded-none print:border-0 print:p-0 print:text-[10.5px] print:leading-[1.35]">
        <header className="space-y-1.5 print:space-y-0.5">
          <h1 className="text-3xl font-semibold leading-tight text-base-content print:text-[22px]">
            {profile.name}
          </h1>
          <p className="text-base font-medium text-base-content print:text-[12px]">
            {profile.role}
          </p>
          <p className="text-base-content/70">
            {profile.location} ·{" "}
            <a className={linkClassName} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>{" "}
            ·{" "}
            <a
              className={linkClassName}
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
          <p className="text-base-content/65">{profile.availability}</p>
        </header>

        <section aria-labelledby="summary-heading" className="space-y-2 print:space-y-1">
          <h2
            id="summary-heading"
            className="border-b border-base-300 pb-1 text-sm font-semibold text-base-content print:text-[11px]"
          >
            Summary
          </h2>
          <p>{profile.summary}</p>
        </section>

        <section aria-labelledby="experience-heading" className="space-y-3 print:space-y-1.5">
          <h2
            id="experience-heading"
            className="border-b border-base-300 pb-1 text-sm font-semibold text-base-content print:text-[11px]"
          >
            Experience
          </h2>
          <div className="space-y-4 print:space-y-2">
            {experience.map((role) => (
              <article
                key={`${role.company}-${role.period}`}
                className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4 print:grid-cols-[6.5rem_1fr] print:gap-3"
              >
                <p className="font-mono text-xs tabular-nums text-base-content/65 print:text-[9.5px]">
                  {role.period}
                </p>
                <div className="space-y-1 print:space-y-0.5">
                  <div>
                    <h3 className="font-semibold text-base-content">{role.title}</h3>
                    <p className="text-base-content/70">
                      {role.company} · {role.location}
                    </p>
                  </div>
                  <ul className="list-disc space-y-0.5 pl-4 marker:text-base-content/65 print:space-y-0">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <p className="font-mono text-xs text-base-content/65 print:text-[9.5px]">
                    {role.stack.join(" · ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="projects-heading" className="space-y-3 print:space-y-1.5">
          <h2
            id="projects-heading"
            className="border-b border-base-300 pb-1 text-sm font-semibold text-base-content print:text-[11px]"
          >
            Selected projects
          </h2>
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 print:grid-cols-2 print:gap-x-5 print:gap-y-2">
            {projects.map((project) => (
              <article key={project.id} className="space-y-1 print:space-y-0.5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold text-base-content">{project.name}</h3>
                  <p className="shrink-0 font-mono text-xs tabular-nums text-base-content/65 print:text-[9.5px]">
                    {project.year}
                  </p>
                </div>
                <p className="text-xs text-base-content/65 print:text-[9.5px]">
                  {project.kind} · {project.status}
                </p>
                <p>{project.desc}</p>
                <p className="font-mono text-xs text-base-content/65 print:text-[9.5px]">
                  {project.stack.join(" · ")}
                </p>
                {(project.demo || project.source) && (
                  <p className="flex gap-3 text-xs print:text-[9.5px]">
                    {project.demo && (
                      <a
                        className={linkClassName}
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live demo
                      </a>
                    )}
                    {project.source && (
                      <a
                        className={linkClassName}
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Source
                      </a>
                    )}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="education-heading" className="space-y-3 print:space-y-1.5">
          <h2
            id="education-heading"
            className="border-b border-base-300 pb-1 text-sm font-semibold text-base-content print:text-[11px]"
          >
            Education
          </h2>
          <div className="space-y-3 print:space-y-1">
            {education.map((item) => (
              <article
                key={`${item.school}-${item.year}`}
                className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4 print:grid-cols-[6.5rem_1fr] print:gap-3"
              >
                <p className="font-mono text-xs tabular-nums text-base-content/65 print:text-[9.5px]">
                  {item.year}
                </p>
                <div>
                  <h3 className="font-semibold text-base-content">{item.degree}</h3>
                  <p className="text-base-content/70">
                    {item.school} · {item.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="skills-heading" className="space-y-2 print:space-y-1">
          <h2
            id="skills-heading"
            className="border-b border-base-300 pb-1 text-sm font-semibold text-base-content print:text-[11px]"
          >
            Skills
          </h2>
          <p className="font-mono text-xs text-base-content/70 print:text-[9.5px]">
            {allTools.join(" · ")}
          </p>
        </section>

        <section aria-labelledby="learning-heading" className="space-y-2 print:space-y-1">
          <h2
            id="learning-heading"
            className="border-b border-base-300 pb-1 text-sm font-semibold text-base-content print:text-[11px]"
          >
            Currently learning
          </h2>
          <div className="space-y-1 print:space-y-0.5">
            {learning.map((item) => (
              <p key={item.title}>
                <span className="font-medium text-base-content">{item.title}</span>
                {": "}
                <span className="text-base-content/70">{item.desc}</span>
              </p>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
