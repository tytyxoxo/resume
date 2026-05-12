export interface Shortcut {
  keys: string[];
  label: string;
}

interface Props {
  shortcuts: Shortcut[];
}

export function ShortcutList({ shortcuts }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {shortcuts.map(({ keys, label }) => (
        <div key={label} className="flex items-center justify-between">
          <span className="text-sm text-base-content/70">{label}</span>
          <div className="flex items-center gap-1">
            {keys.map((k, i) => (
              <kbd key={i} className="kbd kbd-sm">{k}</kbd>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
