import { PlacePageLayout } from "@/components/layout/PlacePageLayout";
import { getPlace } from "@/lib/api/places";
import type { PlaceDetail } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function KulturaPlacePage({ params }: Props) {
  const { slug } = await params;
  const place = await getPlace(slug) as PlaceDetail;

  return (
    <PlacePageLayout place={place}>
      <div className="text-sm text-stone-700 leading-relaxed">
        {place.description && <p>{place.description}</p>}
      </div>
    </PlacePageLayout>
  );
}
