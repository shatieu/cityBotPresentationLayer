"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { TabLayout } from "@/components/layout/TabLayout";
import { ShowtimeCard } from "@/components/data-display/ShowtimeCard";
import { TheatreCard } from "@/components/data-display/TheatreCard";
import type { Showtime, TheatreShow } from "@/lib/types";

const tabs = [
  { id: "kino", label: "Kino" },
  { id: "divadlo", label: "Divadlo" },
];

export default function KulturaPage() {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [theatre, setTheatre] = useState<TheatreShow[]>([]);

  useEffect(() => {
    async function load() {
      const { getShowtimes } = await import("@/lib/api/cinema");
      const { getTheatreProgram } = await import("@/lib/api/theatre");
      const [showRes, theatreRes] = await Promise.all([
        getShowtimes(),
        getTheatreProgram(),
      ]);
      setShowtimes((showRes as unknown as { data: Showtime[] }).data ?? []);
      setTheatre(theatreRes);
    }
    load();
  }, []);

  const filmGroups = new Map<string, Showtime[]>();
  showtimes.forEach((st) => {
    const group = filmGroups.get(st.film_title) ?? [];
    group.push(st);
    filmGroups.set(st.film_title, group);
  });

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-green-900 mb-4">
        Kultura
      </h1>
      <TabLayout tabs={tabs}>
        {(activeTab) =>
          activeTab === "kino" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from(filmGroups.entries()).map(([title, sts]) => (
                <ShowtimeCard key={title} showtimes={sts} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {theatre.map((show) => (
                <TheatreCard key={show.id} show={show} />
              ))}
            </div>
          )
        }
      </TabLayout>
    </PageContainer>
  );
}
