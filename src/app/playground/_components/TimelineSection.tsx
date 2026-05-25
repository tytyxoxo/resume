import { Section } from "./Section";

const EVENTS = [
  { time: "Jan 2024", title: "Project kickoff",      desc: "Team aligned on scope and timeline.",    done: true  },
  { time: "Mar 2024", title: "Design system shipped", desc: "Component library published to npm.",    done: true  },
  { time: "Jun 2024", title: "Beta launch",           desc: "Invited 500 early-access users.",        done: true  },
  { time: "Sep 2024", title: "Public release",        desc: "Open to everyone — 10 k signups day 1.", done: false },
  { time: "Dec 2024", title: "v2 planning",           desc: "Roadmap finalised for next cycle.",      done: false },
] as const;

export function TimelineSection() {
  return (
    <Section title="Timeline">
      <ul className="timeline timeline-vertical timeline-compact w-full">
        {EVENTS.map(({ time, title, desc, done }, i) => (
          <li key={i}>
            {i > 0 && <hr className={done ? "bg-primary" : ""} />}
            <div className="timeline-start text-xs text-base-content/50 whitespace-nowrap">{time}</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`w-4 h-4 ${done ? "text-primary" : "text-base-content/20"}`}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end pb-6">
              <p className="text-sm font-semibold text-base-content">{title}</p>
              <p className="text-xs text-base-content/50">{desc}</p>
            </div>
            {i < EVENTS.length - 1 && <hr className={done ? "bg-primary" : ""} />}
          </li>
        ))}
      </ul>
    </Section>
  );
}
