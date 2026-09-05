import Link from "next/link";
import type { MapMarker } from "@/lib/types";

interface MapMarkerPopupProps {
  marker: MapMarker;
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

function getMarkerHref(marker: MapMarker): string {
  switch (marker.type) {
    case "restaurant":
    case "cafe":
    case "bar":
      return `/gastro/${marker.slug}`;
    case "winery":
      return `/vino/${marker.slug}`;
    case "cinema":
    case "theatre":
      return `/kultura/${marker.slug}`;
    case "office":
      return `/urady/${marker.slug}`;
    case "business":
      return `/firmy/${marker.slug}`;
    default:
      return `/places/${marker.slug}`;
  }
}

export function MapMarkerPopup({ marker }: MapMarkerPopupProps) {
  return (
    <div className="p-1 min-w-[160px]">
      <p className="font-heading font-semibold text-ink-900 text-sm">
        {marker.name}
      </p>
      <p className="text-xs text-stone-700 mt-0.5">
        {typeLabels[marker.type] || marker.type}
      </p>
      <Link
        href={getMarkerHref(marker)}
        className="inline-block mt-1.5 text-xs text-gold-700 hover:text-gold-500 font-medium"
      >
        Zobrazit detail
      </Link>
    </div>
  );
}
