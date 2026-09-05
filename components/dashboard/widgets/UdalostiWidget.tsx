"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { WidgetCard } from "../WidgetCard";
import { formatCzechDate, formatTime } from "@/lib/utils/format-date";
import type { EventSummary } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  festivals: "Festival",
  concerts: "Koncert",
  wine: "Víno",
  theatre: "Divadlo",
  sport: "Sport",
  other: "Ostatní",
};

const MAX = 5;

export function UdalostiWidget() {
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { listEvents } = await import("@/lib/api/events");
      const res = await listEvents({ limit: MAX });
      setEvents((res as unknown as { data: EventSummary[] }).data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <WidgetCard
      title="Události"
      icon="Calendar"
      href="/udalosti"
      size="medium"
      accent="wine"
      loading={loading}
    >
      <div className="space-y-0">
        {events.map((ev) => {
          const dateObj = new Date(ev.date_start);
          const day = dateObj.getDate();
          const month = dateObj.toLocaleDateString("cs-CZ", { month: "short" });

          return (
            <Link key={ev.id} href={`/udalosti/${ev.id}`} className="group flex items-start gap-3 py-2 first:pt-0 last:pb-0">
              <div className="w-10 h-10 rounded-base bg-wine-100 flex flex-col items-center justify-center flex-shrink-0">
                <span className="font-data text-sm font-bold text-wine-700 leading-none">{day}</span>
                <span className="text-[10px] uppercase text-wine-700/70 leading-none mt-0.5">{month}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink-900 group-hover:text-gold-700 transition-colors truncate">
                  {ev.title}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {formatTime(ev.date_start)}
                  {ev.place && ` · ${ev.place.name}`}
                </p>
              </div>
              {ev.category && (
                <Badge variant="stone">
                  {categoryLabels[ev.category] ?? ev.category}
                </Badge>
              )}
            </Link>
          );
        })}
        {events.length === 0 && !loading && (
          <p className="text-sm text-stone-500">Žádné nadcházející události.</p>
        )}
      </div>
    </WidgetCard>
  );
}
