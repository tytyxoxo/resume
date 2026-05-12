export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-base-content/40 uppercase tracking-widest mb-4 border-b border-base-300 pb-2">
        {title}
      </h2>
      {children}
    </section>
  );
}
