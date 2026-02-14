"use client";

import { useState } from "react";
import { WidgetCardHeader } from "./WidgetCardHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import type { WidgetSize } from "@/lib/types/dashboard";

export type WidgetAccent = "green" | "amber" | "terracotta" | "neutral";

interface WidgetCardProps {
  title: string;
  icon: string;
  href: string;
  size: WidgetSize;
  accent?: WidgetAccent;
  loading?: boolean;
  expandable?: boolean;
  collapsedCount?: number;
  totalCount?: number;
  noPadding?: boolean;
  className?: string;
  children: React.ReactNode;
}

const accentBorderColors: Record<WidgetAccent, string> = {
  green: "border-l-green-500",
  amber: "border-l-amber-500",
  terracotta: "border-l-terracotta-500",
  neutral: "border-l-gray-300",
};

export function WidgetCard({
  title,
  icon,
  href,
  size,
  accent = "green",
  loading = false,
  expandable = false,
  collapsedCount,
  totalCount,
  noPadding = false,
  className = "",
  children,
}: WidgetCardProps) {
  const [expanded, setExpanded] = useState(false);

  const sizeClass = size === "large" ? "md:col-span-2" : "";

  const showExpandBtn =
    expandable && !expanded && collapsedCount != null && totalCount != null && totalCount > collapsedCount;

  return (
    <div
      className={`
        group/card relative
        bg-white/75 backdrop-blur-sm
        border border-white/60 border-l-[3px] ${accentBorderColors[accent]}
        rounded-base shadow-glass
        transition-all duration-200 ease-out
        hover:shadow-glass-hover hover:scale-[1.008] hover:bg-white/90
        ${noPadding ? "" : "p-4"}
        ${sizeClass} ${className}
      `.trim()}
    >
      {!noPadding && (
        <WidgetCardHeader title={title} icon={icon} href={href} accent={accent} />
      )}

      {loading ? (
        <div className={noPadding ? "p-4" : ""}>
          <div className="space-y-2">
            <Skeleton height="16px" />
            <Skeleton height="16px" width="80%" />
            <Skeleton height="16px" width="60%" />
          </div>
        </div>
      ) : (
        <>
          <div className={!expanded && expandable ? "overflow-hidden" : ""}>
            {children}
          </div>

          {showExpandBtn && (
            <button
              onClick={() => setExpanded(true)}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 px-2.5 py-1 rounded-base transition-colors"
            >
              Zobrazit více ({totalCount! - collapsedCount!} dalších)
            </button>
          )}
          {expanded && expandable && (
            <button
              onClick={() => setExpanded(false)}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 px-2.5 py-1 rounded-base transition-colors"
            >
              Sbalit
            </button>
          )}
        </>
      )}
    </div>
  );
}
