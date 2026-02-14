"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { WidgetCard } from "../WidgetCard";
import type { Showtime } from "@/lib/types";

const MAX_FILMS = 4;

export function KinoDnesWidget() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { getShowtimes } = await import("@/lib/api/cinema");
      const res = await getShowtimes();
      setShowtimes((res as unknown as { data: Showtime[] }).data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filmGroups = new Map<string, Showtime[]>();
  showtimes.forEach((st) => {
    const group = filmGroups.get(st.film_title) ?? [];
    group.push(st);
    filmGroups.set(st.film_title, group);
  });

  const films = Array.from(filmGroups.entries());

  return (
    <WidgetCard
      title="Kino dnes"
      icon="Film"
      href="/kultura/kino"
      size="medium"
      accent="green"
      loading={loading}
      expandable
      collapsedCount={MAX_FILMS}
      totalCount={films.length}
    >
      <div className="space-y-3">
        {films.slice(0, MAX_FILMS).map(([title, sts]) => {
          const first = sts[0];
          const initials = title.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
          return (
            <div key={title} className="flex items-start gap-3">
              <div className="w-9 h-12 rounded-sm bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="font-heading text-xs font-bold text-green-700">{initials}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {first.language && (
                    <Badge variant="gray">{first.language}</Badge>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {sts.map((st) => (
                      <span
                        key={st.id || st.time}
                        className="font-data text-xs font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded-sm"
                      >
                        {st.time}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {films.length === 0 && !loading && (
          <p className="text-sm text-gray-500">Dnes se nehraje.</p>
        )}
      </div>
    </WidgetCard>
  );
}
