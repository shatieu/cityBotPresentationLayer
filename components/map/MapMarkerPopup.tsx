import Link from "next/link";
import type { MapMarker } from "@/lib/types";

interface MapMarkerPopupProps {
  marker: MapMarker;
}

const typeLabels: Record<string, string> = {
  restaurant: "Restaurace",
  cafe: "KavĂˇrna",
  bar: "Bar",
  cinema: "Kino",
  theatre: "Divadlo",
  winery: "VinaĹ™stvĂ­",
  attraction: "PamĂˇtka",
  accommodation: "UbytovĂˇnĂ­",
  sport: "Sport",
  shopping: "Obchod",
  office: "ĂšĹ™ad",
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
      <p className="font-heading font-semibold text-green-900 text-sm">
        {marker.name}
      </p>
      <p className="text-xs text-gray-700 mt-0.5">
        {typeLabels[marker.type] || marker.type}
      </p>
      <Link
        href={getMarkerHref(marker)}
        className="inline-block mt-1.5 text-xs text-green-700 hover:text-green-500 font-medium"
      >
        Zobrazit detail
      </Link>
    </div>
  );
}
