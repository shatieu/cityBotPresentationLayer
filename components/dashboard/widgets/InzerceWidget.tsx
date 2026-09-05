"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { WidgetCard } from "../WidgetCard";
import { formatRelativeDate } from "@/lib/utils/format-date";
import type { ClassifiedSummary } from "@/lib/types";

const adTypeLabels: Record<string, string> = {
  offer: "Nabídka",
  request: "Poptávka",
  job: "Práce",
};

const adTypeColors: Record<string, string> = {
  offer: "bg-gold-100 text-gold-700",
  request: "bg-wine-100 text-wine-700",
  job: "bg-terracotta-100 text-terracotta-700",
};

const MAX = 4;

export function InzerceWidget() {
  const [ads, setAds] = useState<ClassifiedSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { listClassifieds } = await import("@/lib/api/classifieds");
      const items = await listClassifieds({ limit: MAX });
      setAds(items);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <WidgetCard
      title="Inzerce"
      icon="Tag"
      href="/inzerce"
      size="medium"
      accent="terracotta"
      loading={loading}
    >
      <div className="space-y-2.5">
        {ads.map((ad) => (
          <Link key={ad.id} href={`/inzerce/${ad.id}`} className="block group">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium text-ink-900 group-hover:text-gold-700 transition-colors truncate">
                {ad.title}
              </p>
              <span className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded-sm flex-shrink-0 ${adTypeColors[ad.ad_type] ?? "bg-stone-100 text-gray-600"}`}>
                {adTypeLabels[ad.ad_type] ?? ad.ad_type}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {formatRelativeDate(ad.created_at)}
              {ad.price && (
                <span className="font-data font-medium text-wine-700 ml-1.5">{ad.price}</span>
              )}
            </p>
          </Link>
        ))}
        {ads.length === 0 && !loading && (
          <p className="text-sm text-stone-500">Žádné inzeráty.</p>
        )}
      </div>
    </WidgetCard>
  );
}
