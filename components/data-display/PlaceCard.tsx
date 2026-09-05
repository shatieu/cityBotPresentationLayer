import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { PlaceSummary } from "@/lib/types";

interface PlaceCardProps {
  place: PlaceSummary;
  linkPrefix?: string;
}

const typeLabels: Record<string, string> = {
  restaurant: "Restaurace",
  cafe: "Kavárna",
  bar: "Bar",
  cinema: "Kino",
  theatre: "Divadlo",
  winery: "Vinařství",
  attraction: "Památka",
  accommodation: "Ubytování",
  sport: "Sport",
  shopping: "Obchod",
  office: "Úřad",
  business: "Firma",
};

function getPlaceHref(place: PlaceSummary, linkPrefix?: string): string {
  if (linkPrefix) return `${linkPrefix}/${place.slug}`;

  switch (place.type) {
    case "restaurant":
    case "cafe":
    case "bar":
      return `/gastro/${place.slug}`;
    case "winery":
      return `/vino/${place.slug}`;
    case "cinema":
    case "theatre":
      return `/kultura/${place.slug}`;
    default:
      return `/places/${place.slug}`;
  }
}

export function PlaceCard({ place, linkPrefix }: PlaceCardProps) {
  return (
    <Link href={getPlaceHref(place, linkPrefix)}>
      <Card>
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-gold-100 flex items-center justify-center">
            <span className="font-heading text-lg text-gold-700">
              {place.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-ink-900 truncate">
              {place.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default">
                {typeLabels[place.type] || place.type}
              </Badge>
            </div>
            {place.address && (
              <p className="text-xs text-stone-700 mt-1 truncate">
                {place.address}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
