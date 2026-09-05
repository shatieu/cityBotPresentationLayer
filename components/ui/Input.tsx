import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-stone-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-base border border-stone-300 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-stone-500 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-colors duration-150 ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
