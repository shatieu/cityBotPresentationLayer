import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "./TrustBadge";
import { formatCzechDate, formatTime } from "@/lib/utils/format-date";
import type { TheatreShow } from "@/lib/types";

interface TheatreCardProps {
  show: TheatreShow;
}

const genreLabels: Record<string, string> = {
  komedie: "Komedie",
  drama: "Drama",
  muzikál: "Muzikál",
  balet: "Balet",
  opera: "Opera",
  koncert: "Koncert",
};

export function TheatreCard({ show }: TheatreCardProps) {
  return (
    <Card>
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-16 h-24 rounded-sm bg-wine-100 flex items-center justify-center">
          <span className="font-heading text-2xl text-wine-700">
            {show.title.charAt(0)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-semibold text-ink-900">
              {show.title}
            </h3>
            {show.provenance && <TrustBadge provenance={show.provenance} />}
          </div>
          <p className="text-sm text-stone-700 mt-1">
            <time dateTime={show.date_time}>
              {formatCzechDate(show.date_time)}
            </time>
            {" · "}
            <span className="font-data">{formatTime(show.date_time)}</span>
          </p>
          <p className="text-xs text-stone-500 mt-0.5">{show.venue}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {show.genre && (
              <Badge variant="wine">
                {genreLabels[show.genre] ?? show.genre}
              </Badge>
            )}
            {show.duration_minutes && (
              <Badge variant="stone">{show.duration_minutes} min</Badge>
            )}
          </div>
          {show.ticket_url && (
            <a
              href={show.ticket_url}
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
