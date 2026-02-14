"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { WidgetCard } from "../WidgetCard";
import { formatRelativeDate } from "@/lib/utils/format-date";
import type { NewsSummary } from "@/lib/types";

const MAX = 4;

const sourceColors: Record<string, string> = {
  "Znojemský deník": "bg-green-100 text-green-700",
  "Znojmo City": "bg-amber-100 text-amber-700",
};

export function ZpravyWidget() {
  const [news, setNews] = useState<NewsSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { listNews } = await import("@/lib/api/news");
      const items = await listNews({ limit: MAX });
      setNews(items);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <WidgetCard
      title="Zprávy"
      icon="Newspaper"
      href="/zpravy"
      size="medium"
      accent="neutral"
      loading={loading}
    >
      <div className="space-y-3">
        {news.map((article) => (
          <Link key={article.id} href={`/zpravy/${article.id}`} className="block group">
            <p className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded-sm ${sourceColors[article.source_name] ?? "bg-gray-100 text-gray-600"}`}>
                {article.source_name}
              </span>
              <span className="text-xs text-gray-400">
                {formatRelativeDate(article.published_at)}
              </span>
            </div>
          </Link>
        ))}
        {news.length === 0 && !loading && (
          <p className="text-sm text-gray-500">Žádné zprávy.</p>
        )}
      </div>
    </WidgetCard>
  );
}
