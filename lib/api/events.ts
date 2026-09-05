import { fetchApi, isLiveDataEnabled } from "./client";
import { getSupabaseClient } from "@/lib/supabase/client";
import { mapProvenance } from "./provenance";
import { mapPlaceSummary, type PlaceRow } from "./supabase-places";
import type { EventListResponse, EventDetail, EventSummary, EventCategory } from "@/lib/types";
import type { Tables } from "@/lib/supabase/types";

type EventRow = Tables<"events"> & { place: PlaceRow | null };

function mapEventSummary(row: EventRow): EventSummary {
  return {
    id: row.id,
    title: row.title,
    date_start: row.date_start,
    date_end: row.date_end ?? undefined,
    category: (row.category as EventCategory | null) ?? undefined,
    source_type: row.source_type as EventSummary["source_type"],
    place: row.place ? mapPlaceSummary(row.place) : undefined,
    thumbnail_url: row.thumbnail_url ?? undefined,
    provenance: mapProvenance(row),
  };
}

function mapEventDetail(row: EventRow): EventDetail {
  return {
    ...mapEventSummary(row),
    description: row.description ?? undefined,
    ticket_url: row.ticket_url ?? undefined,
    photos: row.photos && row.photos.length > 0 ? row.photos : undefined,
  };
}

export async function listEvents(params?: {
  from?: string;
  to?: string;
  category?: EventCategory;
  limit?: number;
  offset?: number;
}): Promise<EventListResponse> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    let query = supabase
      .from("events")
      .select("*, place:places(*)", { count: "exact" })
      .eq("status", "published");

    if (params?.from) query = query.gte("date_start", params.from);
    if (params?.to) query = query.lte("date_start", params.to);
    if (params?.category) query = query.eq("category", params.category);

    const limit = params?.limit ?? 50;
    const offset = params?.offset ?? 0;
    query = query.order("date_start", { ascending: true }).range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) throw new Error(`Supabase listEvents failed: ${error.message}`);

    return {
      data: (data ?? []).map((row) => mapEventSummary(row as unknown as EventRow)),
      total: count ?? data?.length ?? 0,
    };
  }

  const queryParams: Record<string, string> = {};
  if (params?.from) queryParams.from = params.from;
  if (params?.to) queryParams.to = params.to;
  if (params?.category) queryParams.category = params.category;
  if (params?.limit) queryParams.limit = String(params.limit);
  if (params?.offset) queryParams.offset = String(params.offset);
  return fetchApi<EventListResponse>("/events", queryParams);
}

export async function getEvent(id: string): Promise<EventDetail> {
  if (isLiveDataEnabled()) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("events")
      .select("*, place:places(*)")
      .eq("status", "published")
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(`Supabase getEvent failed: ${error.message}`);
    if (!data) throw new Error(`Event not found: ${id}`);
    return mapEventDetail(data as unknown as EventRow);
  }

  return fetchApi<EventDetail>(`/events/${id}`);
}
