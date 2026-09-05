import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Showtime } from "@/lib/types";

interface ShowtimeCardProps {
  showtimes: Showtime[];
}

export function ShowtimeCard({ showtimes }: ShowtimeCardProps) {
  if (showtimes.length === 0) return null;

  const first = showtimes[0];

  return (
    <Card>
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-16 h-24 rounded-sm bg-gold-100 flex items-center justify-center">
          <span className="font-heading text-2xl text-gold-700">
            {first.film_title.charAt(0)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading font-semibold text-ink-900">
            {first.film_title}
          </h3>
          {first.film_title_original && first.film_title_original !== first.film_title && (
            <p className="text-xs text-stone-500 mt-0.5">
              {first.film_title_original}
            </p>
          )}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {first.genre && <Badge variant="default">{first.genre}</Badge>}
            {first.language && <Badge variant="stone">{first.language}</Badge>}
            {first.duration_minutes && (
              <Badge variant="stone">{first.duration_minutes} min</Badge>
            )}
            {first.rating && <Badge variant="wine">{first.rating}</Badge>}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {showtimes.map((st) => (
              <span
                key={st.id || st.time}
                className="font-data text-sm text-gold-700 bg-gold-50 px-2 py-1 rounded-sm"
              >
                {st.time}
              </span>
            ))}
          </div>
          {first.ticket_url && (
            <a
              href={first.ticket_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm font-medium text-wine-700 hover:text-wine-500 transition-colors"
            >
              Koupit lístek
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
