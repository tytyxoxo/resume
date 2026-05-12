"use client";

import { useState } from "react";

interface Props {
  filename?: string;
}

export function UploadProgress({ filename = "file.jpg" }: Props) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const start = () => {
    setUploading(true);
    setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          setUploading(false);
          return 100;
        }
        return p + 5;
      });
    }, 80);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{filename}</span>
        <span className="text-xs text-base-content/50">{progress}%</span>
      </div>
      <progress
        className={`progress w-full ${progress === 100 ? "progress-success" : "progress-primary"}`}
        value={progress}
        max={100}
      />
      <button
        className="btn btn-sm btn-outline self-start"
        onClick={start}
        disabled={uploading}
      >
        {uploading ? (
          <><span className="loading loading-spinner loading-xs" /> Uploading…</>
        ) : progress === 100 ? (
          "Upload Again"
        ) : (
          "Start Upload"
        )}
      </button>
    </div>
  );
}
