import { PlacePageLayout } from "@/components/layout/PlacePageLayout";
import { MenuCard } from "@/components/data-display/MenuCard";
import { TrustBadge } from "@/components/data-display/TrustBadge";
import { getPlace } from "@/lib/api/places";
import { getTodayMenu } from "@/lib/api/menus";
import type { PlaceDetail, DailyMenuWithPlace } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GastroPlacePage({ params }: Props) {
  const { slug } = await params;
  const place = await getPlace(slug) as PlaceDetail;

  let menu: DailyMenuWithPlace | null = null;
  try {
    menu = await getTodayMenu(slug) as DailyMenuWithPlace;
  } catch {
    // No menu available for this place
  }

  return (
    <PlacePageLayout place={place}>
      {menu ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-ink-900">
              Dnešní menu
            </h2>
            <TrustBadge provenance={menu.provenance} />
          </div>
          <MenuCard menu={menu} />
        </div>
      ) : (
        <div className="text-sm text-stone-500 py-8 text-center">
          Denní menu dnes není k dispozici.
        </div>
      )}
    </PlacePageLayout>
  );
}
