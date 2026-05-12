"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";

interface Props {
  trigger: React.ReactNode;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  confirmClassName?: string;
  onConfirm?: () => void;
}

export function ConfirmModal({
  trigger,
  title,
  description,
  confirmLabel = "Confirm",
  confirmClassName = "btn-primary",
  onConfirm,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    onConfirm?.();
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        actions={
          <>
            <button className="btn" onClick={() => setOpen(false)}>Cancel</button>
            <button className={`btn ${confirmClassName}`} onClick={handleConfirm}>
              {confirmLabel}
            </button>
          </>
        }
      >
        <div className="py-4 text-base-content/70">{description}</div>
      </Modal>
    </>
  );
}
