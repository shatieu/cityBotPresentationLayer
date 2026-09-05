import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "@/components/data-display/TrustBadge";
import { getActivity } from "@/lib/api/activities";
import type { ActivityDetail } from "@/lib/types";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

const categoryLabels: Record<string, string> = {
  dance: "Tanec",
  sports: "Sport",
  languages: "Jazyky",
  art: "Výtvarno",
  music: "Hudba",
  crafts: "Řemesla",
  other: "Ostatní",
};

export default async function ActivityDetailPage({ params }: Props) {
  const { id } = await params;
  const activity = await getActivity(id) as ActivityDetail;

  return (
    <PageContainer className="py-6">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          {activity.category && (
            <Badge variant="default">
              {categoryLabels[activity.category] ?? activity.category}
            </Badge>
          )}
          {activity.provenance && <TrustBadge provenance={activity.provenance} />}
        </div>

        <h1 className="font-heading text-2xl font-bold text-ink-900 mb-2">
          {activity.title}
        </h1>

        <dl className="space-y-3 text-sm mt-4">
          {activity.schedule && (
            <div>
              <dt className="text-stone-500">Rozvrh</dt>
              <dd className="text-ink-900 font-medium">{activity.schedule}</dd>
            </div>
          )}
          {activity.price && (
            <div>
              <dt className="text-stone-500">Cena</dt>
              <dd className="font-data text-wine-700">{activity.price}</dd>
            </div>
          )}
          {activity.contact && (
            <div>
              <dt className="text-stone-500">Kontakt</dt>
              <dd className="text-ink-900">{activity.contact}</dd>
            </div>
          )}
          {activity.place && (
            <div>
              <dt className="text-stone-500">Místo</dt>
              <dd>
                <Link
                  href={`/places/${activity.place.slug}`}
                  className="text-gold-700 hover:text-gold-500 transition-colors"
                >
                  {activity.place.name}
                </Link>
                {activity.place.address && (
                  <span className="text-stone-500"> · {activity.place.address}</span>
                )}
              </dd>
            </div>
          )}
        </dl>

        {activity.description && (
          <div className="text-sm text-ink-900 leading-relaxed mt-6 whitespace-pre-line">
            {activity.description}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
