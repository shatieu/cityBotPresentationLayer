import { PlacePageLayout } from "@/components/layout/PlacePageLayout";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "@/components/data-display/TrustBadge";
import { getWinery } from "@/lib/api/wineries";
import type { WineryDetail } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

const dayLabels: Record<string, string> = {
  monday: "Pondělí",
  tuesday: "Úterý",
  wednesday: "Středa",
  thursday: "Čtvrtek",
  friday: "Pátek",
  saturday: "Sobota",
  sunday: "Neděle",
};

export default async function WineryPage({ params }: Props) {
  const { slug } = await params;
  const winery = await getWinery(slug) as WineryDetail;

  const place = {
    ...winery,
    type: "winery" as const,
  };

  return (
    <PlacePageLayout place={place}>
      <div className="space-y-6">
        {/* Wine types */}
        {winery.wine_types && winery.wine_types.length > 0 && (
          <div>
            <h2 className="font-heading text-lg font-semibold text-ink-900 mb-3">
              Druhy vín
            </h2>
            <div className="flex flex-wrap gap-2">
              {winery.wine_types.map((type) => (
                <Badge key={type} variant="wine">{type}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tasting schedule */}
        {winery.tasting_schedule && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-lg font-semibold text-ink-900">
                Degustace
              </h2>
              {winery.tasting_schedule.provenance && (
                <TrustBadge provenance={winery.tasting_schedule.provenance} />
              )}
            </div>
            {winery.tasting_schedule.regular_hours && (
              <dl className="space-y-1 mb-3">
                {Object.entries(winery.tasting_schedule.regular_hours).map(
                  ([day, hours]) =>
                    hours && (
                      <div key={day} className="flex justify-between text-sm">
                        <dt className="text-stone-700">
                          {dayLabels[day] ?? day}
                        </dt>
                        <dd className="font-data text-ink-900">{hours}</dd>
                      </div>
                    )
                )}
              </dl>
            )}
            {winery.tasting_schedule.seasonal_note && (
              <p className="text-sm text-stone-500 italic">
                {winery.tasting_schedule.seasonal_note}
              </p>
            )}
          </div>
        )}
      </div>
    </PlacePageLayout>
  );
}
