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
      accent="wine"
      loading={loading}
    >
      <div className="space-y-2">
        {wineries.slice(0, 5).map((w) => (
          <Link key={w.slug} href={`/vino/${w.slug}`} className="group flex items-center justify-between gap-2 py-1">
            <p className="text-sm font-medium text-ink-900 group-hover:text-gold-700 transition-colors truncate">
              {w.name}
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              {w.has_tastings && (
                <span className="text-[10px] font-medium text-wine-700 bg-wine-100 px-1.5 py-0.5 rounded-sm">
                  Degustace
                </span>
              )}
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${w.open_today ? "bg-gold-500" : "bg-stone-300"}`} />
            </div>
          </Link>
        ))}
        {wineries.length === 0 && !loading && (
          <p className="text-sm text-stone-500">Žádná vinařství.</p>
        )}
      </div>
    </WidgetCard>
  );
}
