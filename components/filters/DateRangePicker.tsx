"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatCzechDate } from "@/lib/utils/format-date";

interface DateRangePickerProps {
  from: string;
  to: string;
  onPrev: () => void;
  onNext: () => void;
}

export function DateRangePicker({ from, to, onPrev, onNext }: DateRangePickerProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={onPrev}
        className="w-8 h-8 rounded-base bg-white shadow-card flex items-center justify-center text-stone-700 hover:text-gold-700 transition-colors"
        aria-label="Předchozí období"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="text-sm font-medium text-ink-900 min-w-[200px] text-center">
        {formatCzechDate(from)} – {formatCzechDate(to)}
      </span>
      <button
        onClick={onNext}
        className="w-8 h-8 rounded-base bg-white shadow-card flex items-center justify-center text-stone-700 hover:text-gold-700 transition-colors"
        aria-label="Další období"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
