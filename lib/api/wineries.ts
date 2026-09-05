import { fetchApi, isLiveDataEnabled } from "./client";
import { getSupabaseClient } from "@/lib/supabase/client";
import { mapProvenance } from "./provenance";
import { mapPlaceSummary, type PlaceRow } from "./supabase-places";
import type { OpeningHours, WineryListResponse, WineryDetail, WinerySummary } from "@/lib/types";
import type { Tables } from "@/lib/supabase/types";

type WineryDetailsRow = Tables<"winery_details">;
type WineryPlaceRow = PlaceRow & { winery_details: WineryDetailsRow | null };

// winery_tastings has no seeded rows yet (see DATA_ARCHITECTURE.md — real
// tasting schedules weren't part of this research pass), so open_today /
// has_tastings are always false against live data for now. That's an
// honest reflection of what's actually known, not a bug.
function mapWinerySummary(row: WineryPlaceRow): WinerySummary {
  const details = row.winery_details;
  return {
    ...mapPlaceSummary(row),
    wine_types: details?.wine_types && details.wine_types.length > 0 ? details.wine_types : undefined,
    has_tastings: false,
    open_today: false,
  };
}

function mapWineryDetail(row: WineryPlaceRow): WineryDetail {
  const details = row.winery_details;
  const regularHours = details?.regular_hours as OpeningHours | null | undefined;
  return {
    ...mapWinerySummary(row),
    description: row.description ?? undefined,
    photos: row.photos && row.photos.length > 0 ? row.photos : undefined,
    tasting_schedule: details
      ? {
          regular_hours: regularHours ?? undefined,
          seasonal_note: details.seasonal_note ?? undefined,
          provenance: mapProvenance(details),
        }
      : undefined,
  };
}

export async function listWineries(params?: {
  open_today?: boolean;
  limit?: number;
  offset?: number;
}): Promise<WineryListResponse> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("places")
      .select("*, winery_details(*)")
      .eq("status", "published")
      .eq("type", "winery")
      .order("name", { ascending: true });

    if (error) throw new Error(`Supabase listWineries failed: ${error.message}`);

    let items = (data ?? []).map((row) => mapWinerySummary(row as WineryPlaceRow));
    if (params?.open_today) items = items.filter((w) => w.open_today);

    const total = items.length;
    const limit = params?.limit ?? 50;
    const offset = params?.offset ?? 0;
    items = items.slice(offset, offset + limit);

    return { data: items, total };
  }

  const queryParams: Record<string, string> = {};
  if (params?.open_today !== undefined) queryParams.open_today = String(params.open_today);
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);
  return fetchApi<WineryListResponse>("/wineries", queryParams);
}

export async function getWinery(slug: string): Promise<WineryDetail> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("places")
      .select("*, winery_details(*)")
      .eq("status", "published")
      .eq("type", "winery")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw new Error(`Supabase getWinery failed: ${error.message}`);
    if (!data) throw new Error(`Winery not found: ${slug}`);
    return mapWineryDetail(data as WineryPlaceRow);
  }

  return fetchApi<WineryDetail>(`/wineries/${slug}`);
}
