interface Props {
  name: string;
  role: string;
  color: string;
  skills: string[];
  onView?: () => void;
}

export function ProfileCard({ name, role, color, skills, onView }: Props) {
  return (
    <div className="card bg-base-200 shadow-md w-56 hover:shadow-lg transition-shadow cursor-pointer">
      <div className={`h-16 ${color} rounded-t-2xl`} />
      <div className="card-body pt-2 gap-1">
        <div className="avatar -mt-8 mb-1">
          <div
            className={`w-12 rounded-full ${color} flex items-center justify-center text-white font-bold text-lg ring-2 ring-base-200`}
          >
            {name[0]}
          </div>
        </div>
        <h3 className="card-title text-sm">{name}</h3>
        <p className="text-xs text-base-content/50">{role}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {skills.map((s) => (
            <span key={s} className="badge badge-ghost badge-xs">{s}</span>
          ))}
        </div>
        <div className="card-actions justify-end mt-2">
          <button className="btn btn-primary btn-xs" onClick={onView}>
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
