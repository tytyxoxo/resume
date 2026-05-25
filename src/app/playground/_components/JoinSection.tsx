import { Section } from "./Section";

export function JoinSection() {
  return (
    <Section title="Join">
      <div className="flex flex-col gap-5 w-full items-center">
        {/* Button group */}
        <div className="join">
          <button className="join-item btn btn-sm">Left</button>
          <button className="join-item btn btn-sm btn-active">Middle</button>
          <button className="join-item btn btn-sm">Right</button>
        </div>

        {/* Input + button */}
        <div className="join w-full max-w-xs">
          <input
            className="input input-bordered join-item input-sm flex-1"
            placeholder="Search…"
          />
          <button className="join-item btn btn-primary btn-sm">Go</button>
        </div>

        {/* Input + select + button */}
        <div className="join w-full max-w-sm">
          <select className="select select-bordered join-item select-sm">
            <option>Name</option>
            <option>Email</option>
            <option>ID</option>
          </select>
          <input
            className="input input-bordered join-item input-sm flex-1"
            placeholder="Filter…"
          />
          <button className="join-item btn btn-sm">Filter</button>
        </div>

        {/* Vertical group */}
        <div className="join join-vertical">
          <button className="join-item btn btn-sm btn-outline">Top</button>
          <button className="join-item btn btn-sm btn-outline">Middle</button>
          <button className="join-item btn btn-sm btn-outline">Bottom</button>
        </div>
      </div>
    </Section>
  );
}
