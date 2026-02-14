import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TrustBadge } from "@/components/data-display/TrustBadge";
import { getEvent } from "@/lib/api/events";
import { formatCzechDateFull, formatTime } from "@/lib/utils/format-date";
import type { EventDetail } from "@/lib/types";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

const categoryLabels: Record<string, string> = {
  festivals: "Festival",
  concerts: "Koncert",
  wine: "Víno",
  theatre: "Divadlo",
  sport: "Sport",
  other: "Ostatní",
};

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;
  const event = await getEvent(id) as EventDetail;

  return (
    <PageContainer className="py-6">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          {event.category && (
            <Badge variant="amber">
              {categoryLabels[event.category] ?? event.category}
            </Badge>
          )}
          {event.provenance && <TrustBadge provenance={event.provenance} />}
        </div>

        <h1 className="font-heading text-2xl font-bold text-green-900 mb-2">
          {event.title}
        </h1>

        <div className="text-sm text-gray-700 space-y-1 mb-6">
          <p>
            <time dateTime={event.date_start}>
              {formatCzechDateFull(event.date_start)}
            </time>
            {" · "}
            <span className="font-data">{formatTime(event.date_start)}</span>
            {event.date_end && (
              <>
                {" – "}
                <span className="font-data">{formatTime(event.date_end)}</span>
              </>
            )}
          </p>
          {event.place && (
            <p>
              <Link
                href={`/places/${event.place.slug}`}
                className="text-green-700 hover:text-green-500 transition-colors"
              >
                {event.place.name}
              </Link>
              {event.place.address && ` · ${event.place.address}`}
            </p>
          )}
        </div>

        {event.description && (
          <div className="text-sm text-gray-900 leading-relaxed mb-6 whitespace-pre-line">
            {event.description}
          </div>
        )}

        {event.ticket_url && (
          <a href={event.ticket_url} target="_blank" rel="noopener noreferrer">
            <Button variant="accent">Koupit vstupenky</Button>
          </a>
        )}
      </div>
    </PageContainer>
  );
}
