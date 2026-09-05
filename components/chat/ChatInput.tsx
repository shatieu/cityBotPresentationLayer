"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Napište zprávu..."
        disabled={disabled}
        className="flex-1 rounded-base border border-stone-300 px-3 py-2 text-sm text-ink-900 placeholder:text-stone-500 focus:border-gold-300 focus:outline-none focus:ring-1 focus:ring-gold-300 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-gold-700 text-white hover:bg-gold-500 disabled:opacity-50 transition-colors"
        aria-label="Odeslat"
      >
        <Send size={16} />
      </button>
    </form>
  );
}
