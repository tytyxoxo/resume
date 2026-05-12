export interface ToolbarItem {
  tip: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

interface Props {
  items: ToolbarItem[];
  tooltipPlacement?: "top" | "bottom" | "left" | "right";
}

export function Toolbar({ items, tooltipPlacement = "bottom" }: Props) {
  return (
    <div className="flex gap-1 bg-base-200 rounded-xl p-2 w-fit">
      {items.map(({ tip, label, className = "", onClick }) => (
        <div key={tip} className={`tooltip tooltip-${tooltipPlacement}`} data-tip={tip}>
          <button
            className={`btn btn-ghost btn-sm btn-square ${className}`}
            onClick={onClick}
          >
            {label}
          </button>
        </div>
      ))}
    </div>
  );
}
