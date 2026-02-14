"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Theater } from "lucide-react";
import { WidgetCard } from "../WidgetCard";
import { formatCzechDate, formatTime } from "@/lib/utils/format-date";
import type { TheatreShow } from "@/lib/types";

export function DivadloDnesWidget() {
  const [shows, setShows] = useState<TheatreShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { getTheatreProgram } = await import("@/lib/api/theatre");
      const all = await getTheatreProgram();
      const now = Date.now();
      const threeDays = now + 3 * 24 * 60 * 60 * 1000;
      const upcoming = all.filter((s) => {
        const t = new Date(s.date_time).getTime();
        return t >= now && t <= threeDays;
      });
      setShows(upcoming.slice(0, 3));
      setLoading(false);
    }
    load();
  }, []);

  return (
    <WidgetCard
      title="Divadlo dnes"
      icon="Theater"
      href="/kultura/divadlo"
      size="small"
      accent="amber"
      loading={loading}
    >
      <div className="space-y-3">
        {shows.map((show) => (
          <div key={show.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-base bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Theater size={14} className="text-amber-700" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900">{show.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-data text-xs font-medium text-green-700">
                  {formatCzechDate(show.date_time)} {formatTime(show.date_time)}
                </span>
                {show.genre && (
                  <Badge variant="amber">{show.genre}</Badge>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{show.venue}</p>
            </div>
          </div>
        ))}
        {shows.length === 0 && !loading && (
          <p className="text-sm text-gray-500">Žádná představení v nejbližších dnech.</p>
        )}
      </div>
    </WidgetCard>
  );
}
