"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-50 m-auto w-full max-w-lg rounded-base bg-white shadow-card-hover p-0 backdrop:bg-ink-900/30"
    >
      <div className="flex items-center justify-between p-4 border-b border-stone-100">
        <h2 className="font-heading font-semibold text-ink-900">{title}</h2>
        <button
          onClick={onClose}
          className="p-1 text-stone-500 hover:text-ink-900 transition-colors"
          aria-label="Zavřít"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </dialog>
  );
}
