export interface TeamMember {
  name: string;
  role: string;
  color: string;
  online: boolean;
}

interface Props {
  members: TeamMember[];
  extras?: number;
}

export function TeamList({ members, extras = 0 }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {members.map(({ name, role, color, online }) => (
        <div key={name} className="flex items-center gap-3">
          <div className={`avatar ${online ? "avatar-online" : ""}`}>
            <div
              className={`w-9 rounded-full ${color} flex items-center justify-center text-white font-bold text-sm`}
            >
              {name[0]}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-base-content/50">{role}</p>
          </div>
          <span
            className={`text-xs ${online ? "text-success" : "text-base-content/30"}`}
          >
            {online ? "Online" : "Offline"}
          </span>
        </div>
      ))}
      {extras > 0 && (
        <>
          <div className="my-0 text-xs divider text-base-content/30">
            +{extras} more
          </div>
          <div className="-space-x-3 avatar-group">
            {members.map((m, i) => (
              <div key={i} className="avatar tooltip" data-tip={m.name}>
                <div
                  className={`w-8 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
