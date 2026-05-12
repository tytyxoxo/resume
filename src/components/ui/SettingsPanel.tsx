"use client";

import { useState } from "react";

interface Props {
  defaultNotifEmail?: boolean;
  defaultNotifPush?: boolean;
  defaultTheme?: "light" | "dark";
}

export function SettingsPanel({
  defaultNotifEmail = true,
  defaultNotifPush = false,
  defaultTheme = "light",
}: Props) {
  const [notifEmail, setNotifEmail] = useState(defaultNotifEmail);
  const [notifPush, setNotifPush] = useState(defaultNotifPush);
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);

  return (
    <div className="flex flex-col gap-4 w-full bg-base-200 rounded-2xl p-5">
      <h3 className="font-semibold text-base-content">Notifications</h3>
      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm text-base-content/70">Email notifications</span>
        <input
          type="checkbox"
          className="toggle toggle-primary toggle-sm"
          checked={notifEmail}
          onChange={() => setNotifEmail(!notifEmail)}
        />
      </label>
      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm text-base-content/70">Push notifications</span>
        <input
          type="checkbox"
          className="toggle toggle-primary toggle-sm"
          checked={notifPush}
          onChange={() => setNotifPush(!notifPush)}
        />
      </label>
      <div className="divider my-0" />
      <h3 className="font-semibold text-base-content">Appearance</h3>
      <div className="flex gap-6">
        {(["light", "dark"] as const).map((t) => (
          <label key={t} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              className="radio radio-primary radio-sm"
              name="settings-theme"
              checked={theme === t}
              onChange={() => setTheme(t)}
            />
            <span className="text-sm capitalize">{t}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
