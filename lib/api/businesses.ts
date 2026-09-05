import { fetchApi, isLiveDataEnabled } from "./client";
import { getSupabaseClient } from "@/lib/supabase/client";
import { mapPlaceSummary, type PlaceRow } from "./supabase-places";
import type { BusinessListResponse, BusinessSummary, BusinessDetail, OpeningHours } from "@/lib/types";
import type { Tables } from "@/lib/supabase/types";

type BusinessRow = Tables<"businesses">;
type BusinessPlaceRow = PlaceRow & { businesses: BusinessRow | null };

function mapBusinessSummary(row: BusinessPlaceRow): BusinessSummary {
  const biz = row.businesses;
  return {
    ...mapPlaceSummary(row),
    tags: row.tags && row.tags.length > 0 ? row.tags : undefined,
    ico: biz?.ico ?? undefined,
    services: biz?.services && biz.services.length > 0 ? biz.services : undefined,
  };
}

function mapBusinessDetail(row: BusinessPlaceRow): BusinessDetail {
  return {
    ...mapBusinessSummary(row),
    description: row.description ?? undefined,
    opening_hours: (row.opening_hours as OpeningHours | null) ?? undefined,
    photos: row.photos && row.photos.length > 0 ? row.photos : undefined,
  };
}

export async function listBusinesses(params?: {
  q?: string;
  tags?: string;
  limit?: number;
  offset?: number;
}): Promise<BusinessSummary[]> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    let query = supabase
      .from("places")
      .select("*, businesses(*)")
      .eq("status", "published")
      .eq("type", "business");

    if (params?.q) {
      const q = params.q.replace(/[%_]/g, "");
      query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
    }

    const limit = params?.limit ?? 50;
    const offset = params?.offset ?? 0;
    query = query.order("name", { ascending: true }).range(offset, offset + limit - 1);

    const { data, error } = await query;
    if (error) throw new Error(`Supabase listBusinesses failed: ${error.message}`);

    let items = (data ?? []).map((row) => mapBusinessSummary(row as BusinessPlaceRow));
    if (params?.tags) {
      const wanted = params.tags.split(",").map((t) => t.trim().toLowerCase());
      items = items.filter((b) => b.tags?.some((t) => wanted.includes(t.toLowerCase())));
    }

    return items;
  }

  const queryParams: Record<string, string> = {};
  if (params?.q) queryParams.q = params.q;
  if (params?.tags) queryParams.tags = params.tags;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);

  const res = await fetchApi<BusinessListResponse>("/businesses", queryParams);
  return res.data ?? [];
}

export async function getBusiness(slug: string): Promise<BusinessDetail> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("places")
      .select("*, businesses(*)")
      .eq("status", "published")
      .eq("type", "business")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw new Error(`Supabase getBusiness failed: ${error.message}`);
    if (!data) throw new Error(`Business not found: ${slug}`);
    return mapBusinessDetail(data as BusinessPlaceRow);
  }

  return fetchApi<BusinessDetail>(`/businesses/${slug}`);
}
