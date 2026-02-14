import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCzechDate, formatTime } from "@/lib/utils/format-date";
import type { EventSummary } from "@/lib/types";

interface EventCardProps {
  event: EventSummary;
}

const categoryLabels: Record<string, string> = {
  festivals: "Festival",
  concerts: "Koncert",
  wine: "Víno",
  theatre: "Divadlo",
  sport: "Sport",
  other: "Ostatní",
};

const categoryVariants: Record<string, "default" | "green" | "amber" | "gray"> = {
  festivals: "amber",
  concerts: "green",
  wine: "amber",
  theatre: "default",
  sport: "green",
  other: "gray",
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/udalosti/${event.id}`}>
      <Card>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-green-900">
              {event.title}
            </h3>
            <p className="text-sm text-gray-700 mt-1">
              <time dateTime={event.date_start}>
                {formatCzechDate(event.date_start)}
              </time>
              {" · "}
              <span className="font-data">{formatTime(event.date_start)}</span>
            </p>
            {event.place && (
              <p className="text-xs text-gray-500 mt-1">
                {event.place.name}
              </p>
            )}
          </div>
          {event.category && (
            <Badge variant={categoryVariants[event.category] ?? "gray"}>
              {categoryLabels[event.category] ?? event.category}
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  );
}
