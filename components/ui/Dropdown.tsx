"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
}

export function Dropdown({ label, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-stone-700 hover:text-gold-700 transition-colors"
      >
        {label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[160px] bg-white rounded-base shadow-card-hover border border-stone-100 py-1 z-50">
          {items.map((item) => {
            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-stone-700 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-gold-50 hover:text-gold-700 transition-colors"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
