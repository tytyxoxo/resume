import { Section } from "./Section";

export function PaginationSection() {
  return (
    <Section title="Pagination">
      <div className="flex flex-col gap-5 w-full items-center">
        {/* Basic */}
        <div className="join">
          <button className="join-item btn btn-sm">«</button>
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn btn-sm btn-active">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">4</button>
          <button className="join-item btn btn-sm">»</button>
        </div>

        {/* With ellipsis */}
        <div className="join">
          <button className="join-item btn btn-sm">«</button>
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn btn-sm btn-disabled btn-ghost">…</button>
          <button className="join-item btn btn-sm btn-active">7</button>
          <button className="join-item btn btn-sm btn-disabled btn-ghost">…</button>
          <button className="join-item btn btn-sm">20</button>
          <button className="join-item btn btn-sm">»</button>
        </div>

        {/* Outlined */}
        <div className="join">
          {[1, 2, 3, 4, 5].map((n) => (
            <input
              key={n}
              className="join-item btn btn-sm btn-square"
              type="radio"
              name="pagination"
              aria-label={String(n)}
              defaultChecked={n === 3}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
