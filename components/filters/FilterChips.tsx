"use client";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterChips({ options, value, onChange }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-none">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex-shrink-0 px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${
            value === option.value
              ? "bg-gold-700 text-white"
              : "bg-white text-stone-700 border border-stone-300 hover:border-gold-500"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
