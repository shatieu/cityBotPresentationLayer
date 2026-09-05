/**
 * Shared `places` row -> PlaceSummary/PlaceDetail mapping, reused by every
 * domain module whose pages are backed by the `places` table (places,
 * wineries, businesses, offices — see
 * ../../../cityBotIngestionLayer/docs/DATA_ARCHITECTURE.md: "places" is the
 * generic venue table shared across gastro/kultura/víno/úřady/business
 * listings).
 */
import { mapProvenance } from "./provenance";
import type { OpeningHours, PlaceDetail, PlaceSummary, PlaceType } from "@/lib/types";
import type { Tables } from "@/lib/supabase/types";

export type PlaceRow = Tables<"places">;

export function mapPlaceSummary(row: PlaceRow): PlaceSummary {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    type: row.type as PlaceType,
    address: row.address ?? undefined,
    lat: row.lat ?? undefined,
    lng: row.lng ?? undefined,
    phone: row.phone ?? undefined,
    website: row.website ?? undefined,
    thumbnail_url: row.thumbnail_url ?? undefined,
    provenance: mapProvenance(row),
  };
}

export function mapPlaceDetail(row: PlaceRow): PlaceDetail {
  const links = row.links as Record<string, string> | null;
  return {
    ...mapPlaceSummary(row),
    description: row.description ?? undefined,
    opening_hours: (row.opening_hours as OpeningHours | null) ?? undefined,
    photos: row.photos && row.photos.length > 0 ? row.photos : undefined,
    links: links && Object.keys(links).length > 0 ? links : undefined,
    tags: row.tags && row.tags.length > 0 ? row.tags : undefined,
  };
}
