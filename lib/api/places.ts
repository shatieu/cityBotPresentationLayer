import { fetchApi, isLiveDataEnabled } from "./client";
import { getSupabaseClient } from "@/lib/supabase/client";
import { mapPlaceDetail, mapPlaceSummary } from "./supabase-places";
import type { PlaceListResponse, PlaceDetail, PlaceType } from "@/lib/types";

export async function listPlaces(params?: {
  type?: PlaceType;
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<PlaceListResponse> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    let query = supabase.from("places").select("*", { count: "exact" }).eq("status", "published");

    if (params?.type) query = query.eq("type", params.type);
    if (params?.q) {
      const q = params.q.replace(/[%_]/g, "");
      query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
    }

    const limit = params?.limit ?? 50;
    const offset = params?.offset ?? 0;
    query = query.order("name", { ascending: true }).range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) throw new Error(`Supabase listPlaces failed: ${error.message}`);

    return {
      data: (data ?? []).map(mapPlaceSummary),
      total: count ?? data?.length ?? 0,
      limit,
      offset,
    };
  }

  const queryParams: Record<string, string> = {};
  if (params?.type) queryParams.type = params.type;
  if (params?.q) queryParams.q = params.q;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);
  return fetchApi<PlaceListResponse>("/places", queryParams);
}

export async function getPlace(slug: string): Promise<PlaceDetail> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("places")
      .select("*")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw new Error(`Supabase getPlace failed: ${error.message}`);
    if (!data) throw new Error(`Place not found: ${slug}`);
    return mapPlaceDetail(data);
  }

  return fetchApi<PlaceDetail>(`/places/${slug}`);
}
