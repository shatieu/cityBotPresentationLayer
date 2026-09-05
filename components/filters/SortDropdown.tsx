"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpDown } from "lucide-react";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ options, value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-stone-700 hover:text-gold-700 bg-white rounded-base shadow-card transition-colors"
      >
        <ArrowUpDown size={14} />
        {current?.label ?? "Řazení"}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[160px] bg-white rounded-base shadow-card-hover border border-stone-100 py-1 z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                option.value === value
                  ? "text-gold-700 bg-gold-50"
                  : "text-stone-700 hover:bg-gold-50 hover:text-gold-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
