import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  className?: string;
}

export function Select({ label, options, className = "", ...props }: SelectProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-stone-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`w-full rounded-base border border-stone-300 bg-white px-3 py-2 text-sm text-ink-900 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-colors duration-150 ${className}`.trim()}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
