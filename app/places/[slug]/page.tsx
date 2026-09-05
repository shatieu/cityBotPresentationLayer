import { PlacePageLayout } from "@/components/layout/PlacePageLayout";
import { EventCard } from "@/components/data-display/EventCard";
import { getPlace } from "@/lib/api/places";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const place = await getPlace(slug);
    return { title: place.name };
  } catch {
    return { title: "Místo" };
  }
}

export default async function GenericPlacePage({ params }: Props) {
  const { slug } = await params;
  let place;
  try {
    place = await getPlace(slug);
  } catch {
    notFound();
  }

  return (
    <PlacePageLayout place={place}>
      <div className="space-y-6">
        {/* Show upcoming events if available */}
        {place.upcoming_events && place.upcoming_events.length > 0 && (
          <div>
            <h3 className="font-heading font-semibold text-ink-900 mb-3">
              Nadcházející události
            </h3>
            <div className="space-y-3">
              {place.upcoming_events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {!place.upcoming_events?.length && !place.today_menu && !place.showtimes?.length && (
          <div className="bg-white rounded-base shadow-card p-6 text-center">
            <p className="text-sm text-stone-500">
              Zatím nejsou k dispozici žádné další informace.
            </p>
          </div>
        )}
      </div>
    </PlacePageLayout>
  );
}
