import type { Metadata } from "next";
import { HomeScene } from "@/components/scene/HomeScene";
import { STOPS } from "@/components/scene/journey";
import { Hero } from "@/components/home/Hero";
import { JourneyCard } from "@/components/home/JourneyCard";
import { WorkTabs } from "@/components/home/WorkTabs";
import { Contact } from "@/components/home/Contact";
import { allTools, education, experience, learning, type SectionId } from "@/data/resume";

// A full-screen 3D journey. Each section is one screen of scroll: its card floats beside the object the
// camera is looking at (wide screens) or docks at the bottom (phones). Every fact is real DOM, rendered
// on the server; the room illustrates it. Sections let clicks through to the canvas, cards don't.
export const metadata: Metadata = { alternates: { canonical: "/" } };

function stage(id: SectionId) {
  const card = STOPS[id].card;
  const side = card === "left" ? "side:items-start" : card === "right" ? "side:items-end" : "";
  return `pointer-events-none flex min-h-[100svh] flex-col justify-end px-3 pb-4 pt-20 sm:px-6 sm:pb-8 ${card === "bottom" ? "" : `side:justify-center side:px-[5vw] short:pt-16 short:pb-4 ${side}`}`;
}

export default function Home() {
  return (
    <>
      <HomeScene />
      {/* Lets pointer events through to the 3D room; the cards opt back in */}
      <div className="pointer-events-none relative z-10">
        <Hero className={stage("hero")} />

        <section id="work" aria-labelledby="work-heading" className={stage("work")}>
          <JourneyCard id="work" title="Featured work" hint="Pick a project to open it on the screen">
            <WorkTabs />
          </JourneyCard>
        </section>

        <section id="experience" aria-labelledby="experience-heading" className={stage("experience")}>
          <JourneyCard id="experience" title="Experience">
            <ol className="space-y-5 short:space-y-3">
              {experience.map((role) => (
                <li key={role.title}>
                  <p className={`font-mono text-xs tabular-nums ${role.current ? "text-primary" : "text-base-content/65"}`}>{role.period}</p>
                  <h3 className="mt-0.5 text-base font-semibold text-base-content">
                    {role.title} <span className="font-normal text-base-content/60">· {role.company}</span>
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-base-content/80 marker:text-base-content/30 short:mt-1 short:space-y-0.5 short:leading-snug">
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </JourneyCard>
        </section>

        <section id="education" aria-labelledby="education-heading" className={stage("education")}>
          <JourneyCard id="education" title="Education">
            <ol className="space-y-5">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="font-mono text-xs tabular-nums text-base-content/65">{e.year}</p>
                  <h3 className="mt-0.5 text-base font-semibold text-base-content">{e.school}</h3>
                  <p className="text-sm text-base-content/75">{e.degree}</p>
                  <p className="mt-0.5 text-sm text-base-content/65">{e.note}</p>
                </li>
              ))}
            </ol>
          </JourneyCard>
        </section>

        <section id="skills" aria-labelledby="skills-heading" className={stage("skills")}>
          <JourneyCard id="skills" title="Skills" hint="Type anything: the keyboard on the desk follows your keys">
            <h3 className="text-sm font-medium text-base-content/70">Toolchain</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {allTools.map((t) => (
                <li key={t}>
                  <kbd className="kbd">{t}</kbd>
                </li>
              ))}
            </ul>
            <h3 className="mt-5 text-sm font-medium text-base-content/70 short:mt-3">Currently learning</h3>
            <ul className="mt-1 divide-y divide-base-content/10">
              {learning.map((l) => (
                <li key={l.title} className="py-2.5 short:py-1.5">
                  <p className="text-sm font-semibold text-base-content">{l.title}</p>
                  <p className="text-sm leading-relaxed text-base-content/70 short:leading-snug">{l.desc}</p>
                </li>
              ))}
            </ul>
          </JourneyCard>
        </section>

        <Contact className={stage("contact")} />
      </div>
    </>
  );
}
