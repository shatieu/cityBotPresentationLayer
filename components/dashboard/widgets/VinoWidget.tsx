"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { WidgetCard } from "../WidgetCard";
import type { WinerySummary } from "@/lib/types";

export function VinoWidget() {
  const [wineries, setWineries] = useState<WinerySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { listWineries } = await import("@/lib/api/wineries");
      const res = await listWineries({});
      setWineries((res as unknown as { data: WinerySummary[] }).data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <WidgetCard
      title="Víno & degustace"
      icon="Wine"
      href="/vino"
      size="medium"
      accent="amber"
      loading={loading}
    >
      <div className="space-y-2">
        {wineries.slice(0, 5).map((w) => (
          <Link key={w.slug} href={`/vino/${w.slug}`} className="group flex items-center justify-between gap-2 py-1">
            <p className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors truncate">
              {w.name}
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              {w.has_tastings && (
                <span className="text-[10px] font-medium text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-sm">
                  Degustace
                </span>
              )}
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${w.open_today ? "bg-green-500" : "bg-gray-300"}`} />
            </div>
          </Link>
        ))}
        {wineries.length === 0 && !loading && (
          <p className="text-sm text-gray-500">Žádná vinařství.</p>
        )}
      </div>
    </WidgetCard>
  );
}
