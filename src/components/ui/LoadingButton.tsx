"use client";

import { useState } from "react";

interface Props {
  onAction: () => Promise<void>;
  label?: string;
  successLabel?: string;
  className?: string;
}

export function LoadingButton({
  onAction,
  label = "Save Changes",
  successLabel = "Saved!",
  className = "btn-primary",
}: Props) {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const handle = async () => {
    setState("loading");
    await onAction();
    setState("success");
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <button
      className={`btn min-w-36 ${state === "success" ? "btn-success" : className}`}
      onClick={handle}
      disabled={state !== "idle"}
    >
      {state === "loading" ? (
        <><span className="loading loading-spinner loading-sm" /> Saving…</>
      ) : state === "success" ? (
        successLabel
      ) : (
        label
      )}
    </button>
  );
}
