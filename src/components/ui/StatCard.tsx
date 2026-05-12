interface Props {
  title: string;
  value: string;
  desc: string;
  figure?: React.ReactNode;
  valueClassName?: string;
}

export function StatCard({ title, value, desc, figure, valueClassName = "" }: Props) {
  return (
    <div className="stat">
      {figure && <div className="stat-figure">{figure}</div>}
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${valueClassName}`}>{value}</div>
      <div className="stat-desc">{desc}</div>
    </div>
  );
}
