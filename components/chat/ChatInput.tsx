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
        className="flex-1 rounded-base border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-300 focus:outline-none focus:ring-1 focus:ring-green-300 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-green-700 text-white hover:bg-green-500 disabled:opacity-50 transition-colors"
        aria-label="Odeslat"
      >
        <Send size={16} />
      </button>
    </form>
  );
}
