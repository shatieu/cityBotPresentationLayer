import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

export function Textarea({ label, className = "", ...props }: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-stone-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`w-full rounded-base border border-stone-300 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-stone-500 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-colors duration-150 min-h-[80px] ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
