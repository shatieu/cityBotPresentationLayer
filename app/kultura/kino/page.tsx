import { PageContainer } from "@/components/layout/PageContainer";
import { ShowtimeCard } from "@/components/data-display/ShowtimeCard";
import { getShowtimes } from "@/lib/api/cinema";
import type { Showtime } from "@/lib/types";

export default async function KinoPage() {
  const res = await getShowtimes();
  const showtimes = (res as unknown as { data: Showtime[] }).data ?? [];

  const filmGroups = new Map<string, Showtime[]>();
  showtimes.forEach((st) => {
    const group = filmGroups.get(st.film_title) ?? [];
    group.push(st);
    filmGroups.set(st.film_title, group);
  });

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-green-900 mb-1">
        Kino
      </h1>
      <p className="text-sm text-gray-700 mb-6">
        Dnešní program v Kině Svět Znojmo
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from(filmGroups.entries()).map(([title, sts]) => (
          <ShowtimeCard key={title} showtimes={sts} />
        ))}
      </div>
    </PageContainer>
  );
}
